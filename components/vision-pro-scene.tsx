"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Html, Float, Text, Sphere } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"
import { FloatingPanel } from "@/components/floating-panel"
import { ProjectCard3D } from "@/components/project-card-3d"
import { SkillOrb } from "@/components/skill-orb"

export function VisionProScene() {
  const { camera } = useThree()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle parallax effect based on mouse movement
      groupRef.current.rotation.y = mousePosition.x * 0.1
      groupRef.current.rotation.x = mousePosition.y * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6ea8fe" />

      {/* Background environment spheres */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
        <Sphere args={[50, 32, 32]} position={[0, 0, -30]}>
          <meshBasicMaterial color="#0a0a0a" side={THREE.BackSide} />
        </Sphere>
      </Float>

      {/* Floating particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Float key={i} speed={2 + Math.random() * 2} rotationIntensity={0.1} floatIntensity={0.2}>
          <Sphere
            args={[0.02 + Math.random() * 0.03]}
            position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10]}
          >
            <meshBasicMaterial color="#6ea8fe" transparent opacity={0.6} />
          </Sphere>
        </Float>
      ))}

      {/* Main Hero Panel */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Html
          transform
          occlude
          position={[0, 1, 0]}
          style={{
            width: "600px",
            height: "400px",
            pointerEvents: "auto",
          }}
        >
          <FloatingPanel>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center p-8"
            >
              <motion.h1
                className="text-5xl font-bold mb-4 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Curious Dev
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Spatial Computing Pioneer
              </motion.p>
              <motion.p
                className="text-gray-400 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Building the future of immersive web experiences
              </motion.p>
              <motion.div
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  Enter Experience
                </button>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm border border-white/20">
                  View Projects
                </button>
              </motion.div>
            </motion.div>
          </FloatingPanel>
        </Html>
      </Float>

      {/* Project Cards in 3D Space */}
      <ProjectCard3D position={[-4, 0, -2]} title="Coinwala" description="Crypto wallet interface" color="#ff6b6b" />
      <ProjectCard3D position={[4, 0, -2]} title="Rust MPC" description="Multi-party computation" color="#4ecdc4" />
      <ProjectCard3D position={[0, -2, -3]} title="Web3 Tools" description="Blockchain utilities" color="#45b7d1" />

      {/* Skill Orbs */}
      <SkillOrb position={[-6, 2, -1]} skill="React" color="#61dafb" />
      <SkillOrb position={[6, 2, -1]} skill="Three.js" color="#000000" />
      <SkillOrb position={[-3, 3, 1]} skill="Rust" color="#ce422b" />
      <SkillOrb position={[3, 3, 1]} skill="TypeScript" color="#3178c6" />
      <SkillOrb position={[0, 4, 0]} skill="Next.js" color="#000000" />

      {/* About Panel */}
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
        <Html
          transform
          occlude
          position={[-3, -1, 2]}
          style={{
            width: "400px",
            height: "300px",
            pointerEvents: "auto",
          }}
        >
          <FloatingPanel>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">About</h3>
              <p className="text-gray-300 mb-4">
                Passionate about creating immersive digital experiences that blend cutting-edge technology with
                beautiful design.
              </p>
              <div className="flex flex-wrap gap-2">
                {["VR/AR", "Web3", "AI", "Design"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 text-white rounded-full text-sm backdrop-blur-sm border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FloatingPanel>
        </Html>
      </Float>

      {/* Contact Panel */}
      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.25}>
        <Html
          transform
          occlude
          position={[3, -1, 2]}
          style={{
            width: "350px",
            height: "250px",
            pointerEvents: "auto",
          }}
        >
          <FloatingPanel>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Connect</h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 text-left">
                  📧 Email
                </button>
                <button className="w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 text-left">
                  🐙 GitHub
                </button>
                <button className="w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 text-left">
                  🐦 Twitter
                </button>
              </div>
            </div>
          </FloatingPanel>
        </Html>
      </Float>

      {/* Floating 3D Text */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <Text
          position={[0, 5, -5]}
          fontSize={1}
          color="#6ea8fe"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Bold.json"
        >
          Welcome to the Future
        </Text>
      </Float>
    </group>
  )
}
