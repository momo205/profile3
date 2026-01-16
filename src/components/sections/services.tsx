"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  Code,
  Shield,
  Database,
  Globe,
  Brain,
} from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Automation & Internal Tools",
    description:
      "Custom automation systems that eliminate repetitive tasks and streamline workflows. Build internal dashboards, admin panels, and process automation tools.",
    deliverables: [
      "Workflow automation scripts",
      "Internal admin dashboards",
      "Process optimization tools",
    ],
  },
  {
    icon: Code,
    title: "Backend APIs & Integrations",
    description:
      "RESTful and GraphQL APIs with robust error handling, rate limiting, and comprehensive documentation. Integrate third-party services seamlessly.",
    deliverables: [
      "REST/GraphQL APIs",
      "Third-party integrations",
      "API documentation",
    ],
  },
  {
    icon: Shield,
    title: "Auth, Tokens, Roles & Security",
    description:
      "Enterprise-grade authentication systems with JWT tokens, OAuth, role-based access control (RBAC), and session management. Security-first approach.",
    deliverables: [
      "JWT/OAuth implementation",
      "RBAC systems",
      "Session management",
    ],
  },
  {
    icon: Database,
    title: "Databases & Data Modeling",
    description:
      "Database design, optimization, and integration with PostgreSQL, MongoDB, Firebase, and Supabase. Efficient data modeling and query optimization.",
    deliverables: [
      "Database schema design",
      "Query optimization",
      "Data migration scripts",
    ],
  },
  {
    icon: Globe,
    title: "Full-stack Web Apps",
    description:
      "Modern web applications built with Next.js, React, and TypeScript. Responsive, performant, and SEO-optimized with excellent UX.",
    deliverables: [
      "Next.js applications",
      "Responsive dashboards",
      "SEO optimization",
    ],
  },
  {
    icon: Brain,
    title: "AI Workflows & LLM Tools",
    description:
      "RAG systems, LLM integrations, AI-powered automations, and data pipelines. Build intelligent workflows that enhance productivity.",
    deliverables: [
      "RAG implementations",
      "LLM tooling",
      "AI automation pipelines",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-24 sm:py-32 bg-gradient-to-b from-slate-800 via-slate-900 to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-primary-white">
            Services
          </h2>
          <p className="text-xl text-secondary-white max-w-2xl mx-auto">
            End-to-end development services for automation, APIs, security, and
            AI-powered systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full glass-card hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary-white">{service.title}</CardTitle>
                    <CardDescription className="text-base text-secondary-white">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-secondary-white">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

