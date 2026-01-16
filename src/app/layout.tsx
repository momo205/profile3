import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Ahmed | Full Stack Software Engineer",
  description:
    "Full-stack engineer specializing in automation, secure authentication, robust APIs, database design, and AI-powered workflows. Building systems that save teams hours every week.",
  keywords: [
    "full stack developer",
    "automation",
    "backend APIs",
    "authentication",
    "JWT",
    "RBAC",
    "database design",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "Supabase",
    "Next.js",
    "AI workflows",
    "LLM",
    "RAG",
    "software engineer",
  ],
  authors: [{ name: "Muhammad Ahmed" }],
  creator: "Muhammad Ahmed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadahmed.dev",
    title: "Muhammad Ahmed | Full Stack Software Engineer",
    description:
      "Full-stack engineer specializing in automation, secure authentication, robust APIs, database design, and AI-powered workflows.",
    siteName: "Muhammad Ahmed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ahmed | Full Stack Software Engineer",
    description:
      "Full-stack engineer specializing in automation, secure authentication, robust APIs, database design, and AI-powered workflows.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} w-full overflow-x-hidden`}>
      <body className="antialiased w-full overflow-x-hidden min-h-screen">
        <Navigation />
        {children}
        <footer className="border-t border-border bg-slate-900 py-12 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-2xl font-bold mb-2">MA</p>
                <p className="text-sm text-muted-foreground">
                  © 2025 Muhammad Ahmed. All rights reserved.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-2">
                <a
                  href="mailto:muhammadb2345@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  muhammadb2345@gmail.com
                </a>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/muhammad-a-67356b205/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/momo205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

