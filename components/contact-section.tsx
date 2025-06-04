"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#111111] to-[#0a0a0a] relative">
      {/* Retro grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #4ecdc4 1px, transparent 1px), 
                           linear-gradient(to bottom, #4ecdc4 1px, transparent 1px)`,
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
            {"<Contact/>"}
          </h2>
          <p className="text-xl text-cyan-400 max-w-2xl mx-auto font-mono">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-8 font-mono">
              {"// Get In Touch"}
            </h3>

            {[
              {
                icon: Mail,
                label: "Email",
                value: "me@curiousdev.xyz",
                color: "#ff6b6b",
              },

              {
                icon: MapPin,
                label: "Location",
                value: "Earth",
                color: "#ffd93d",
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl bg-black/50 backdrop-blur-sm border-2 transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: `${item.color}50`,
                  boxShadow: `0 0 20px ${item.color}30`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
                    boxShadow: `0 0 15px ${item.color}50`,
                  }}
                >
                  <item.icon className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-mono">
                    {item.label}
                  </p>
                  <p className="text-white font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card
              className="p-8 bg-black/50 backdrop-blur-sm border-2 transition-all duration-300"
              style={{
                borderColor: "rgba(78, 205, 196, 0.3)",
                boxShadow: "0 0 30px rgba(78, 205, 196, 0.2)",
              }}
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-cyan-400 mb-2 font-mono">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black/30 border-2 border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-400 mb-2 font-mono">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-black/30 border-2 border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2 font-mono">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/30 border-2 border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Project discussion"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2 font-mono">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-black/30 border-2 border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-bold py-4 rounded-lg transition-all duration-300 font-mono"
                  style={{
                    boxShadow: "0 0 20px rgba(78, 205, 196, 0.3)",
                  }}
                >
                  SEND_MESSAGE
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
