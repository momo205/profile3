"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { experiences, type Experience } from "@/data/experience";

interface ExperienceCarouselProps {
  experiences: Experience[];
}

export default function ExperienceCarousel({ experiences }: ExperienceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  }, [experiences.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  }, [experiences.length]);

  // Auto-advance logic
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, 7000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, goToNext]);

  // Handle drag end for swipe
  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 50;
      if (info.offset.x > threshold) {
        goToPrevious();
      } else if (info.offset.x < -threshold) {
        goToNext();
      }
    },
    [goToNext, goToPrevious]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  const currentExperience = experiences[currentIndex];

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1], // easeOut
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="w-full"
          >
            {/* Experience Card */}
            <div className="glass-card p-8 sm:p-10">
              {/* Top Row: Company + Role | Date */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-primary-white">
                    {currentExperience.company}
                  </h3>
                  <p className="text-lg text-secondary-white font-medium">
                    {currentExperience.role}
                  </p>
                </div>
                <p className="text-sm sm:text-base text-secondary-white whitespace-nowrap">
                  {currentExperience.period}
                </p>
              </div>

              {/* Middle: Bullet Points */}
              <ul className="space-y-3 mb-8">
                {currentExperience.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start" style={{ lineHeight: "1.65" }}>
                    <span className="mr-3 mt-1.5 text-muted-white text-lg leading-none">•</span>
                    <span className="text-secondary-white flex-1">{achievement}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom: Skill Pills */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/8">
                {currentExperience.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    className="glass-pill text-secondary-white border-white/12 bg-white/4 hover:bg-white/6 transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-12 glass-button z-10 hidden sm:flex"
        aria-label="Previous experience"
      >
        <ChevronLeft className="h-5 w-5 text-primary-white" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-12 glass-button z-10 hidden sm:flex"
        aria-label="Next experience"
      >
        <ChevronRight className="h-5 w-5 text-primary-white" />
      </Button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {experiences.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-primary-white"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to experience ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}

