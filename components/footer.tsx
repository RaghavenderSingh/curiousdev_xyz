"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-black relative">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ff6b6b 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-0"
          >
            <h3
              className="text-2xl font-bold font-mono mb-2"
              style={{
                background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #ffd93d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {"<Curious.Dev/>"}
            </h3>
            <p className="text-gray-400">Building the future, one pixel at a time</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            {[
              { icon: Github, color: "#ff6b6b" },
              { icon: Twitter, color: "#4ecdc4" },
              { icon: Linkedin, color: "#ffd93d" },
            ].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
                  boxShadow: `0 0 15px ${item.color}50`,
                }}
              >
                <item.icon className="h-5 w-5 text-black" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Curious Dev. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> and React
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
