"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Float, Sphere } from "@react-three/drei"
import * as THREE from "three"

interface SkillOrbProps {
  position: [number, number, number]
  skill: string
  color: string
}

export function SkillOrb({ position, skill, color }: SkillOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      const scale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        <Sphere
          ref={meshRef}
          args={[0.3]}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <meshStandardMaterial color={color} transparent opacity={0.8} />
        </Sphere>

        <Html
          center
          style={{
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <div className="text-white text-sm font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-sm">{skill}</div>
        </Html>
      </group>
    </Float>
  )
}
