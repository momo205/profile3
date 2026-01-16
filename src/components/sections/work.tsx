"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { useState } from "react";

function CaseStudyModal({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-primary-white">{project.title}</h2>
              <p className="text-lg text-secondary-white">{project.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="text-secondary-white hover:text-primary-white transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-primary-white">Problem</h3>
              <p className="text-secondary-white">{project.problem}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-primary-white">Solution</h3>
              <p className="text-secondary-white">{project.solution}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-primary-white">Impact</h3>
              <p className="text-secondary-white">{project.impact}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary-white">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {project.liveUrl && (
                <Button
                  variant="outline"
                  onClick={() => window.open(project.liveUrl, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Site
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  onClick={() => window.open(project.githubUrl, "_blank")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              )}
            </div>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredProjects = projects.filter((p) => p.featured);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section id="work" className="w-full py-24 sm:py-32 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-primary-white">
              Work
            </h2>
            <p className="text-xl text-secondary-white max-w-2xl mx-auto">
              Case studies of deployed systems that deliver measurable impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className="h-full glass-card hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl mb-2 text-primary-white">{project.title}</CardTitle>
                    <CardDescription className="text-base text-secondary-white">
                      {project.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-secondary-white mb-4 line-clamp-2">
                      {project.impact}
                    </p>
                    <Button variant="ghost" className="w-full">
                      View case study →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}

