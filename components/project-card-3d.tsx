"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Float } from "@react-three/drei"
import * as THREE from "three"
import { FloatingPanel } from "@/components/floating-panel"

interface ProjectCard3DProps {
  position: [number, number, number]
  title: string
  description: string
  color: string
}

export function ProjectCard3D({ position, title, description, color }: ProjectCard3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      const scale = hovered ? 1.1 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={position}>
        {/* 3D Card Background */}
        <mesh ref={meshRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
          <boxGeometry args={[2, 1.2, 0.1]} />
          <meshStandardMaterial color={color} transparent opacity={0.1} />
        </mesh>

        {/* HTML Content */}
        <Html
          transform
          occlude
          style={{
            width: "300px",
            height: "180px",
            pointerEvents: "auto",
          }}
        >
          <FloatingPanel>
            <div className="p-4 h-full flex flex-col justify-center">
              <div className="w-8 h-8 rounded-lg mb-3" style={{ backgroundColor: color }} />
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-300 text-sm">{description}</p>
              <button className="mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-all duration-200 backdrop-blur-sm border border-white/20">
                View Project
              </button>
            </div>
          </FloatingPanel>
        </Html>
      </group>
    </Float>
  )
}
