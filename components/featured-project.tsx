"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code2, Palette, Zap } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Modern shopping experience with seamless checkout and inventory management",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
    color: "from-[#ff6b6b] to-[#ee5a52]",
    icon: Code2,
  },
  {
    title: "Design System",
    description: "Comprehensive component library with documentation and theming",
    tech: ["React", "Storybook", "Figma"],
    color: "from-[#4ecdc4] to-[#44a08d]",
    icon: Palette,
  },
  {
    title: "Performance Dashboard",
    description: "Real-time analytics and monitoring with beautiful data visualization",
    tech: ["TypeScript", "D3.js", "WebSockets"],
    color: "from-[#45b7d1] to-[#96c93d]",
    icon: Zap,
  },
]

export function FeaturedProject() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#121212]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(110,168,254,0.1),transparent_70%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-[#f8f8f8] to-[#a0a0a0] bg-clip-text text-transparent">
            Featured Work
          </h2>
          <p className="text-lg text-[#b0b0b0] max-w-2xl mx-auto">
            A selection of projects showcasing modern web development and thoughtful design
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
              className="group"
            >
              <Card className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#333] hover:border-[#444] transition-all duration-300 relative overflow-hidden h-full">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <project.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-[#f8f8f8] group-hover:text-[#6ea8fe] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-[#b0b0b0] mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-[#2a2a2a] text-[#a0a0a0] rounded border border-[#404040]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-[#1a1a1a] border-[#404040] hover:border-[#6ea8fe]"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-[#4a9eff] to-[#0066cc]">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
