"use client";

import { motion } from "framer-motion";
import { Search, Palette, Code, Rocket } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Deep dive into your requirements, constraints, and goals. I ask the right questions to understand your business needs and technical challenges.",
    timeline: "1-2 days",
  },
  {
    icon: Palette,
    title: "Design",
    description:
      "Architect the solution with clear technical specifications, database schemas, API contracts, and user flows. You'll review and approve before any code is written.",
    timeline: "2-5 days",
  },
  {
    icon: Code,
    title: "Build",
    description:
      "Agile development with regular updates, code reviews, and testing. I maintain clean, documented code and keep you informed throughout the process.",
    timeline: "2-8 weeks",
  },
  {
    icon: Rocket,
    title: "Launch & Iterate",
    description:
      "Deploy to production with monitoring, documentation, and handoff. I provide ongoing support and iterate based on feedback and metrics.",
    timeline: "Ongoing",
  },
];

export default function Process() {
  return (
    <section id="process" className="w-full py-24 sm:py-32 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-primary-white">
            Process
          </h2>
          <p className="text-xl text-secondary-white max-w-2xl mx-auto">
            A structured approach that ensures clarity, quality, and timely
            delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
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
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl text-primary-white">{step.title}</CardTitle>
                      <span className="text-xs text-secondary-white font-medium">
                        {step.timeline}
                      </span>
                    </div>
                    <CardDescription className="text-base text-secondary-white">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-secondary-white max-w-2xl mx-auto">
            Communication is key. You'll receive regular updates, and I'm
            available for questions throughout the project. Typical response
            time: within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

