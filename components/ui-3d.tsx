"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Mail, ExternalLink } from "lucide-react"

export function UI3D() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Main content */}
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Creative
              <br />
              Developer
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Building immersive digital experiences
              <br />
              with cutting-edge technology
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border-0"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-6 rounded-2xl border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300"
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {["React", "Three.js", "Next.js", "TypeScript", "WebGL", "Blender"].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-200 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Side navigation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-auto"
      >
        <div className="flex flex-col gap-4">
          <Button
            size="sm"
            variant="ghost"
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-200"
          >
            <Mail className="h-4 w-4 text-white" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-200"
          >
            <Github className="h-4 w-4 text-white" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-200"
          >
            <ExternalLink className="h-4 w-4 text-white" />
          </Button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center text-white/60"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
