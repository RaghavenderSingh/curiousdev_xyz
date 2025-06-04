"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "3D Portfolio Website",
    description:
      "Interactive portfolio built with Three.js and React, featuring immersive 3D elements and smooth animations.",
    tech: ["React", "Three.js", "Next.js", "TypeScript"],
    gradient: "from-red-500 to-red-600",
    color: "#ff6b6b",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with modern design, payment integration, and admin dashboard.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    gradient: "from-cyan-500 to-cyan-600",
    color: "#4ecdc4",
  },
  {
    title: "Real-time Chat App",
    description: "WebSocket-powered chat application with real-time messaging, file sharing, and user presence.",
    tech: ["Node.js", "Socket.io", "React", "MongoDB"],
    gradient: "from-yellow-500 to-yellow-600",
    color: "#ffd93d",
  },
]

export function ProjectsSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#111111] to-[#0a0a0a] relative">
      {/* Retro grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ffd93d 1px, transparent 1px), 
                           linear-gradient(to bottom, #ffd93d 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 font-mono"
            style={{
              background: "linear-gradient(45deg, #ffd93d, #ff6b6b, #4ecdc4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {"<Projects/>"}
          </h2>
          <p className="text-xl text-yellow-400 max-w-2xl mx-auto font-mono">
            A selection of my recent work showcasing modern web development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card
                className="p-6 bg-black/50 backdrop-blur-sm border-2 transition-all duration-300 h-full group"
                style={{
                  borderColor: `${project.color}50`,
                  boxShadow: `0 0 20px ${project.color}30`,
                }}
              >
                <div
                  className={`w-full h-48 rounded-lg mb-6 bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
                  style={{
                    boxShadow: `0 0 20px ${project.color}50`,
                  }}
                />

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors font-mono">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full border font-mono"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.3)",
                        borderColor: `${project.color}50`,
                        color: project.color,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent border-2 font-mono hover:bg-black/30"
                    style={{
                      borderColor: `${project.color}50`,
                      color: project.color,
                    }}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    {"</>"}
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 font-mono text-black"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}, ${project.color}88)`,
                      boxShadow: `0 0 15px ${project.color}50`,
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    DEMO
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
