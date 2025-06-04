"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { User, Code, Coffee } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111111] relative">
      {/* Retro grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ff6b6b 1px, transparent 1px), 
                           linear-gradient(to bottom, #ff6b6b 1px, transparent 1px)`,
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
              background: "linear-gradient(45deg, #4ecdc4, #ffd93d, #ff6b6b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {"<About/>"}
          </h2>
          <p className="text-xl text-red-400 max-w-2xl mx-auto font-mono">
            Passionate developer creating innovative digital solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: User,
              title: "Who I Am",
              description: "Full-stack developer with 5+ years of experience building modern web applications",
              color: "#ff6b6b",
            },
            {
              icon: Code,
              title: "What I Do",
              description: "Specialize in React, Next.js, and 3D web experiences using Three.js and WebGL",
              color: "#4ecdc4",
            },
            {
              icon: Coffee,
              title: "How I Work",
              description: "Collaborative approach with focus on clean code, performance, and user experience",
              color: "#ffd93d",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card
                className="p-8 bg-black/50 backdrop-blur-sm border-2 transition-all duration-300 h-full"
                style={{
                  borderColor: `${item.color}50`,
                  boxShadow: `0 0 20px ${item.color}30`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
                    boxShadow: `0 0 15px ${item.color}50`,
                  }}
                >
                  <item.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white font-mono">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
