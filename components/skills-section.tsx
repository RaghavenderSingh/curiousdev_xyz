"use client"

import { motion } from "framer-motion"

const skills = [
  { name: "React", level: 95 },
  { name: "Next.js", level: 90 },
  { name: "TypeScript", level: 88 },
  { name: "Three.js", level: 85 },
  { name: "Node.js", level: 82 },
  { name: "Rust", level: 78 }, // Changed from Python to Rust
]

export function SkillsSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111111] relative">
      {/* Retro grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #4ecdc4 1px, transparent 1px), 
                           linear-gradient(to bottom, #4ecdc4 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
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
              background: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #ffd93d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {"<Skills/>"}
          </h2>
          <p className="text-xl text-cyan-400 max-w-2xl mx-auto font-mono">Technologies I use to bring ideas to life</p>
        </motion.div>

        <div className="space-y-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-mono text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h3>
                <span className="text-cyan-400 font-mono">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, 
                      ${index % 3 === 0 ? "#ff6b6b" : index % 3 === 1 ? "#4ecdc4" : "#ffd93d"} 0%, 
                      ${index % 3 === 0 ? "#ff6b6b" : index % 3 === 1 ? "#4ecdc4" : "#ffd93d"}88 100%)`,
                    boxShadow: `0 0 10px ${index % 3 === 0 ? "#ff6b6b" : index % 3 === 1 ? "#4ecdc4" : "#ffd93d"}88`,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
