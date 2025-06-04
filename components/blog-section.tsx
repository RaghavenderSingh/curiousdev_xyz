"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Construction, Terminal } from "lucide-react"

export function BlogSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-[#f8f8f8] to-[#a0a0a0] bg-clip-text text-transparent">
            Blog
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Under Construction Ribbon */}
          <div className="absolute -top-4 -right-4 z-20 rotate-12">
            <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a52] text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm flex items-center gap-2">
              <Construction className="h-4 w-4" />
              Under Construction
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#333] relative overflow-hidden">
            {/* Terminal-style mockup */}
            <div className="bg-[#1e1e1e] rounded-lg border border-[#333] overflow-hidden">
              {/* Terminal header */}
              <div className="bg-[#2a2a2a] px-4 py-3 border-b border-[#333] flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28ca42]"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[#b0b0b0] text-sm font-mono">curiousdev.blog</span>
                </div>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="h-4 w-4 text-[#00ff00]" />
                  <span className="text-[#00ff00]">curiousdev@blog</span>
                  <span className="text-[#b0b0b0]">:</span>
                  <span className="text-[#6ea8fe]">~</span>
                  <span className="text-[#b0b0b0]">$</span>
                </div>

                <div className="text-[#f8f8f8] mb-4">
                  <span className="text-[#b0b0b0]">{">"} </span>
                  <span>curiousdev.blog/</span>
                </div>

                <div className="text-[#b0b0b0] mb-4">Coming soon...</div>

                <div className="flex items-center gap-2">
                  <span className="text-[#00ff00]">curiousdev@blog</span>
                  <span className="text-[#b0b0b0]">:</span>
                  <span className="text-[#6ea8fe]">~</span>
                  <span className="text-[#b0b0b0]">$</span>
                  <motion.div
                    className="w-2 h-4 bg-[#f8f8f8] ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[#b0b0b0]">Thoughts on web development, Rust, and building beautiful things.</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
