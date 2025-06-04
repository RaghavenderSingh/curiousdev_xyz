"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Mail, Linkedin } from "lucide-react";

export function HeroOverlay() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-6 pointer-events-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 relative z-20"
              style={{
                fontFamily: "'Courier New', monospace",
                background:
                  "linear-gradient(45deg, #ff6b6b, #4ecdc4, #ffd93d, #ff6b6b)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient 3s ease infinite",
                textShadow: "0 0 30px rgba(255, 107, 107, 0.5)",
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Curious
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(45deg, #4ecdc4, #ffd93d, #ff6b6b, #4ecdc4)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient 3s ease infinite",
                }}
              >
                Developer
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 font-mono relative z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {">"} Building retro-futuristic digital experiences
              <br />
              {">"}{" "}
              <span className="text-cyan-400">with modern technology</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 relative z-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-red-500 via-cyan-500 to-yellow-500 hover:from-red-600 hover:via-cyan-600 hover:to-yellow-600 text-black font-bold px-8 py-6 rounded-lg shadow-lg transition-all duration-300 font-mono"
                style={{
                  boxShadow: "0 0 20px rgba(255, 107, 107, 0.3)",
                }}
              >
                <span className="relative z-10">{"[EXPLORE_WORK]"}</span>
                <ArrowDown className="ml-2 h-4 w-4 relative z-10 group-hover:animate-bounce" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-black/50 hover:bg-black/70 text-cyan-400 font-bold px-8 py-6 rounded-lg border-2 border-cyan-400 hover:border-cyan-300 backdrop-blur-sm transition-all duration-300 font-mono"
                style={{
                  boxShadow: "0 0 20px rgba(76, 205, 196, 0.2)",
                }}
              >
                <Github className="mr-2 h-4 w-4" />
                {"<CODE/>"}
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto relative z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[
                "React.js",
                "Next.js",
                "Three.js",
                "TypeScript",
                "Rust",
                "Node.js",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-4 py-2 bg-black/50 text-cyan-400 rounded-lg text-sm font-mono backdrop-blur-sm border border-cyan-400/30 hover:border-cyan-400 hover:bg-black/70 transition-all duration-300 cursor-default"
                  style={{
                    boxShadow: "0 0 10px rgba(76, 205, 196, 0.2)",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Retro social links */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8 }}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-auto z-20"
      >
        <div className="flex flex-col gap-4">
          {[
            {
              icon: Github,
              color: "border-red-400 hover:border-red-300 text-red-400",
            },
            {
              icon: Linkedin,
              color: "border-cyan-400 hover:border-cyan-300 text-cyan-400",
            },
            {
              icon: Mail,
              color:
                "border-yellow-400 hover:border-yellow-300 text-yellow-400",
            },
          ].map(({ icon: Icon, color }, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 rounded-lg bg-black/50 backdrop-blur-sm border-2 transition-all duration-300 flex items-center justify-center font-mono ${color}`}
              style={{
                boxShadow: "0 0 15px rgba(255, 107, 107, 0.2)",
              }}
            >
              <Icon className="h-5 w-5" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
