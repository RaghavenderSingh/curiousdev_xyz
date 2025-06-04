"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera, useTexture } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"

function VRHeadset() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Load the VR headset texture
  const texture = useTexture("/images/vr-headset.png")

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05

      // Scale effect on hover
      const targetScale = hovered ? 1.1 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        {/* Create a plane geometry to display the image */}
        <planeGeometry args={[4, 2.5]} />
        <meshStandardMaterial map={texture} transparent alphaTest={0.1} side={THREE.DoubleSide} />

        {/* Add a subtle glow effect */}
        <mesh position={[0, 0, -0.01]} scale={1.05}>
          <planeGeometry args={[4, 2.5]} />
          <meshBasicMaterial color="#6ea8fe" transparent opacity={hovered ? 0.2 : 0.1} side={THREE.DoubleSide} />
        </mesh>
      </mesh>

      {/* Floating particles around the headset */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4]}>
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color="#6ea8fe" transparent opacity={0.6} />
        </mesh>
      ))}
    </Float>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <Environment preset="night" />

      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />

      {/* Key light */}
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />

      {/* Fill light */}
      <directionalLight position={[-5, -5, 2]} intensity={0.5} color="#6ea8fe" />

      <VRHeadset />
    </>
  )
}

export function VRHeadset3D() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas>
        <Scene />
      </Canvas>

      {/* Overlay content */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center z-10"
        >
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2">Next-Gen Experience</h3>
            <p className="text-white/80">Immersive technology meets beautiful design</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
