"use client";

import { motion } from "framer-motion";
import ExperienceCarousel from "./ExperienceCarousel";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full py-24 sm:py-32 bg-gradient-to-b from-slate-800 via-slate-900 to-blue-950 overflow-hidden"
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-primary-white">
            Experience
          </h2>
          <p className="text-xl text-secondary-white max-w-2xl mx-auto">
            Building production systems with focus on automation, reliability,
            and scale.
          </p>
        </motion.div>

        <ExperienceCarousel experiences={experiences} />
      </div>
    </section>
  );
}

