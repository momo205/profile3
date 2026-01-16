"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

/**
 * EMAILJS SETUP INSTRUCTIONS:
 * 
 * 1. Create an account at https://www.emailjs.com/
 * 
 * 2. Create an Email Service:
 *    - Go to Email Services → Add New Service
 *    - Choose your email provider (Gmail, Outlook, etc.)
 *    - Follow the setup instructions
 *    - Copy the Service ID → use as NEXT_PUBLIC_EMAILJS_SERVICE_ID
 * 
 * 3. Create an Email Template:
 *    - Go to Email Templates → Create New Template
 *    - Use these template variables:
 *      {{name}} - Sender's name
 *      {{email}} - Sender's email
 *      {{company}} - Company name (optional)
 *      {{projectType}} - Selected project type
 *      {{budget}} - Budget range (optional)
 *      {{message}} - Message content
 *    - Set your "To Email" to your email address
 *    - Set "From Name" to {{name}}
 *    - Set "Reply To" to {{email}}
 *    - Copy the Template ID → use as NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
 * 
 * 4. Get your Public Key:
 *    - Go to Account → API Keys
 *    - Copy the Public Key → use as NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
 * 
 * 5. Add to .env.local:
 *    NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
 *    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
 *    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
 * 
 * NOTE: The public key is exposed in the client (this is expected and safe for EmailJS).
 * No sensitive tokens or secrets are used.
 */

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  website?: string; // Honeypot field
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  [key: string]: string | undefined;
}

type SubmissionState = "idle" | "sending" | "success" | "error";

const PROJECT_TYPES = [
  "Automation",
  "Website",
  "API",
  "Auth System",
  "AI Workflow",
  "Other",
];

const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
  "Not sure yet",
];

// Rate limiting: max 3 submissions per 10 minutes
const RATE_LIMIT_COUNT = 3;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes in milliseconds
const RATE_LIMIT_KEY = "contact_form_submissions";

// Spam detection: count links in message
const MAX_LINKS = 3;
const LINK_PATTERN = /https?:\/\/[^\s]+/gi;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
    website: "", // Honeypot
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  // Initialize EmailJS on mount
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      try {
        emailjs.init(publicKey);
      } catch (error) {
        console.error("Failed to initialize EmailJS:", error);
      }
    } else {
      console.warn("EmailJS public key not found in environment variables");
    }
  }, []);

  // Check rate limit
  const checkRateLimit = (): boolean => {
    if (typeof window === "undefined") return true;

    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      if (!stored) return true;

      const submissions: number[] = JSON.parse(stored);
      const now = Date.now();
      const recentSubmissions = submissions.filter(
        (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
      );

      if (recentSubmissions.length >= RATE_LIMIT_COUNT) {
        return false;
      }

      return true;
    } catch {
      return true;
    }
  };

  // Record submission timestamp
  const recordSubmission = () => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      const submissions: number[] = stored ? JSON.parse(stored) : [];
      const now = Date.now();

      // Remove old submissions outside the window
      const recentSubmissions = submissions.filter(
        (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
      );

      // Add current submission
      recentSubmissions.push(now);
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentSubmissions));
    } catch {
      // Ignore localStorage errors
    }
  };

  // Check for spam patterns
  const detectSpam = (message: string): boolean => {
    const links = message.match(LINK_PATTERN);
    if (links && links.length > MAX_LINKS) {
      return true;
    }
    return false;
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = "Name is required";
    }

    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      newErrors.message = "Message is required";
    } else if (trimmedMessage.length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field change
  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Clear submission message when user starts typing
    if (submissionState !== "idle") {
      setSubmissionState("idle");
      setSubmitMessage("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (formData.website) {
      // Silent fail for bots
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Check rate limit
    if (!checkRateLimit()) {
      setSubmissionState("error");
      setSubmitMessage("Please try again later. Too many submissions in a short time.");
      return;
    }

    // Check for spam
    if (detectSpam(formData.message)) {
      setSubmissionState("error");
      setSubmitMessage("Your message could not be sent. Please try again.");
      return;
    }

    // Check EmailJS config
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmissionState("error");
      const missing = [];
      if (!serviceId) missing.push("Service ID");
      if (!templateId) missing.push("Template ID");
      if (!publicKey) missing.push("Public Key");
      setSubmitMessage(
        `Email service is not configured. Missing: ${missing.join(", ")}. Please check your environment variables.`
      );
      console.error("Missing EmailJS config:", { serviceId: !!serviceId, templateId: !!templateId, publicKey: !!publicKey });
      return;
    }

    // Re-initialize EmailJS to ensure it's ready
    try {
      emailjs.init(publicKey);
    } catch (initError) {
      console.error("Failed to initialize EmailJS:", initError);
      setSubmissionState("error");
      setSubmitMessage("Email service initialization failed. Please refresh the page and try again.");
      return;
    }

    setSubmissionState("sending");
    setSubmitMessage("");

    try {
      // Prepare template parameters
      const templateParams = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || "Not provided",
        projectType: formData.projectType || "Not specified",
        budget: formData.budget || "Not specified",
        message: formData.message.trim(),
      };

      // Debug logging (only in development, never log full message content)
      if (process.env.NODE_ENV === "development") {
        console.log("Sending email with EmailJS:", {
          serviceId,
          templateId,
          hasPublicKey: !!publicKey,
          // Intentionally NOT logging message content or full templateParams
        });
      }

      // Send email via EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams);

      // Check if response indicates success
      if (response.status === 200 || response.text === "OK") {
        // Record submission for rate limiting
        recordSubmission();

        // Success
        setSubmissionState("success");
        setSubmitMessage("Thank you! I'll get back to you within 24 hours.");

        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          budget: "",
          message: "",
          website: "",
        });

        // Reset state after 5 seconds
        setTimeout(() => {
          setSubmissionState("idle");
          setSubmitMessage("");
        }, 5000);
      } else {
        throw new Error(`EmailJS returned status: ${response.status}`);
      }
    } catch (error: any) {
      // Log error details only in development (never log user message content)
      if (process.env.NODE_ENV === "development") {
        console.error("EmailJS error:", {
          status: error?.status,
          text: error?.text,
          message: error?.message,
          // Intentionally NOT logging templateParams or formData.message
        });
      }
      
      // Generic error message (never expose system details to users)
      setSubmissionState("error");
      setSubmitMessage(
        "Failed to send message. Please try again or contact me directly via email."
      );
    }
  };

  const isSubmitting = submissionState === "sending";
  const showSuccess = submissionState === "success";
  const showError = submissionState === "error";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2 text-secondary-white"
        >
          Name <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => {
            if (!formData.name.trim()) {
              setErrors((prev) => ({ ...prev, name: "Name is required" }));
            }
          }}
          className={`w-full px-4 py-2 rounded-md glass-input ${
            errors.name ? "error" : ""
          }`}
          placeholder="Your name"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2 text-secondary-white"
        >
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => {
            const trimmed = formData.email.trim();
            if (!trimmed) {
              setErrors((prev) => ({ ...prev, email: "Email is required" }));
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
              setErrors((prev) => ({
                ...prev,
                email: "Please enter a valid email address",
              }));
            }
          }}
          className={`w-full px-4 py-2 rounded-md glass-input ${
            errors.email ? "error" : ""
          }`}
          placeholder="your@email.com"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Company (Optional) */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium mb-2 text-secondary-white"
        >
          Company <span className="text-muted-white text-xs">(optional)</span>
        </label>
        <input
          id="company"
          type="text"
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
          className="w-full px-4 py-2 rounded-md glass-input"
          placeholder="Your company name"
          disabled={isSubmitting}
        />
      </div>

      {/* Project Type */}
      <div>
        <label
          htmlFor="projectType"
          className="block text-sm font-medium mb-2 text-secondary-white"
        >
          Project Type <span className="text-red-400">*</span>
        </label>
        <select
          id="projectType"
          required
          value={formData.projectType}
          onChange={(e) => handleChange("projectType", e.target.value)}
          className="w-full px-4 py-2 rounded-md glass-input"
          disabled={isSubmitting}
        >
          <option value="">Select a project type</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Budget Range (Optional) */}
      <div>
        <label
          htmlFor="budget"
          className="block text-sm font-medium mb-2 text-secondary-white"
        >
          Budget Range <span className="text-muted-white text-xs">(optional)</span>
        </label>
        <select
          id="budget"
          value={formData.budget}
          onChange={(e) => handleChange("budget", e.target.value)}
          className="w-full px-4 py-2 rounded-md glass-input"
          disabled={isSubmitting}
        >
          <option value="">Select budget range</option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2 text-secondary-white"
        >
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          required
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => {
            const trimmed = formData.message.trim();
            if (!trimmed) {
              setErrors((prev) => ({
                ...prev,
                message: "Message is required",
              }));
            } else if (trimmed.length < 20) {
              setErrors((prev) => ({
                ...prev,
                message: "Message must be at least 20 characters",
              }));
            }
          }}
          rows={5}
          className={`w-full px-4 py-2 rounded-md glass-input resize-none ${
            errors.message ? "error" : ""
          }`}
          placeholder="Tell me about your project..."
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message}</p>
        )}
        <p className="mt-1 text-xs text-muted-white">
          Minimum 20 characters ({formData.message.trim().length}/20)
        </p>
      </div>

      {/* Honeypot field (hidden from users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          value={formData.website}
          onChange={(e) => handleChange("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submission Message */}
      {(showSuccess || showError) && submitMessage && (
        <div
          className={`flex items-start gap-3 p-4 rounded-md ${
            showSuccess
              ? "bg-green-500/10 border border-green-500/20"
              : "bg-red-500/10 border border-red-500/20"
          }`}
        >
          {showSuccess ? (
            <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          )}
          <p
            className={`text-sm ${
              showSuccess ? "text-green-400" : "text-red-400"
            }`}
          >
            {submitMessage}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}

