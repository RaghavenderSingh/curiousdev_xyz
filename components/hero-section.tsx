"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const moveX = clientX - window.innerWidth / 2
      const moveY = clientY - window.innerHeight / 2
      const offsetFactor = 15
      setMousePosition({
        x: moveX / offsetFactor,
        y: moveY / offsetFactor,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Dramatic background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#101010] to-[#1a1a1a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,168,254,0.15),transparent_70%)]" />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), 
                           linear-gradient(to bottom, #333 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-b from-[#f8f8f8] to-[#a0a0a0] bg-clip-text text-transparent"
            style={{
              fontFamily: 'system-ui, -apple-system, "SF Pro Display", sans-serif',
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Developer
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-[#b0b0b0] mb-6 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Full-Stack Engineer & Designer
          </motion.p>

          <motion.p
            className="text-lg text-[#808080] mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Crafting exceptional digital experiences with modern technologies. Passionate about clean code, beautiful
            interfaces, and innovative solutions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-b from-[#4a9eff] to-[#0066cc] hover:from-[#5aa8ff] hover:to-[#0077dd] text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-[#0066cc]/20"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] hover:from-[#3a3a3a] hover:to-[#2a2a2a] text-[#f8f8f8] font-semibold px-8 py-6 rounded-xl border-[#404040] shadow-lg hover:shadow-xl transition-all duration-200"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </motion.div>

          {/* Tech stack showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto"
          >
            {["React", "Next.js", "TypeScript", "Rust", "Node.js", "Tailwind"].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] text-[#f8f8f8] rounded-lg border border-[#404040] hover:border-[#6ea8fe] transition-all duration-200 cursor-default"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                <span className="text-sm font-medium">{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#333] to-transparent" />
    </section>
  )
}
