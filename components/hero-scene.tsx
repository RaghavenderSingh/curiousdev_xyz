"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Stars, Box, RoundedBox, Html } from "@react-three/drei"
import type * as THREE from "three"

function Computer() {
  const computerRef = useRef<THREE.Group>(null)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [terminalText, setTerminalText] = useState("")
  const [currentLine, setCurrentLine] = useState(0)

  const lines = [
    "whoami",
    "Curious Developer",
    "ls -la projects/",
    "portfolio.js  e-commerce.js  3d-engine.js  api.js",
    "cat skills.txt",
    "React.js ████████████ 95%\nNext.js ███████████░ 90%\nThree.js ██████████░░ 85%",
    "echo $MOTTO",
    "Building beautiful digital experiences with modern tech",
  ]

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Typing effect
  useEffect(() => {
    if (currentLine >= lines.length) return

    const text = lines[currentLine]
    let index = 0

    const interval = setInterval(
      () => {
        if (index <= text.length) {
          setTerminalText((prev) => {
            // If we're starting a new command, add the prompt
            if (index === 0 && currentLine % 2 === 0) {
              return prev + "\n> "
            }
            return prev + text.charAt(index)
          })
          index++
        } else {
          clearInterval(interval)
          setTimeout(
            () => {
              setCurrentLine((prev) => prev + 1)
            },
            currentLine % 2 === 0 ? 300 : 1000,
          ) // Wait longer after responses
        }
      },
      currentLine % 2 === 0 ? 100 : 30,
    ) // Type commands slower than responses

    return () => clearInterval(interval)
  }, [currentLine])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (computerRef.current) {
      computerRef.current.rotation.y = Math.sin(time * 0.3) * 0.1
      computerRef.current.position.y = Math.sin(time * 0.5) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={computerRef} position={[0, 0, 0]} scale={1.5}>
        {/* Laptop Base */}
        <RoundedBox args={[4, 0.3, 3]} radius={0.1} smoothness={4} position={[0, -1, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Laptop Screen Frame */}
        <RoundedBox
          args={[3.8, 2.5, 0.2]}
          radius={0.1}
          smoothness={4}
          position={[0, 0.5, -1.4]}
          rotation={[-0.1, 0, 0]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
        </RoundedBox>

        {/* Working Screen with HTML Content - Fixed positioning */}
        <Html
          transform
          occlude
          position={[0, 0.5, -1.28]}
          rotation={[-0.1, 0, 0]}
          style={{
            width: "400px",
            height: "250px",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: -1,
          }}
          zIndexRange={[-1, -1]}
        >
          <div
            className="w-full h-full rounded-lg overflow-hidden border-2 border-gray-700 flex flex-col"
            style={{
              background: "linear-gradient(135deg, #000000 0%, #0f0f0f 100%)",
              boxShadow: "inset 0 0 10px rgba(0, 255, 0, 0.2)",
              zIndex: -1,
            }}
          >
            {/* Terminal Header */}
            <div className="bg-gray-900 px-3 py-1 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-xs ml-2 flex-1 text-center font-mono">curious-terminal</span>
            </div>

            {/* Terminal Content */}
            <div
              className="p-4 text-green-500 text-sm leading-relaxed font-mono flex-1 overflow-hidden"
              style={{
                textShadow: "0 0 5px rgba(0, 255, 0, 0.5)",
                backgroundImage: "radial-gradient(rgba(0, 50, 0, 0.1) 1px, transparent 0)",
                backgroundSize: "4px 4px",
                backgroundPosition: "-19px -19px",
              }}
            >
              <div className="mb-1">
                <span className="text-green-300">Welcome to CuriousOS v1.0.3</span>
              </div>
              <div className="mb-2">
                <span className="text-green-300">Last login: {new Date().toLocaleDateString()}</span>
              </div>

              <div className="whitespace-pre-wrap">
                {terminalText}
                {cursorVisible && <span className="inline-block w-2 h-4 bg-green-500 ml-1"></span>}
              </div>
            </div>
          </div>
        </Html>

        {/* Keyboard */}
        <RoundedBox args={[3.2, 0.05, 2.2]} radius={0.02} smoothness={4} position={[0, -0.85, 0.2]} castShadow>
          <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
        </RoundedBox>

        {/* Trackpad */}
        <RoundedBox args={[1.2, 0.02, 0.8]} radius={0.05} smoothness={4} position={[0, -0.82, 0.8]} castShadow>
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </RoundedBox>

        {/* Keyboard Keys */}
        {Array.from({ length: 60 }).map((_, i) => {
          const row = Math.floor(i / 12)
          const col = i % 12
          const x = (col - 5.5) * 0.25
          const z = (row - 2) * 0.25 - 0.2
          return (
            <Box key={i} args={[0.15, 0.05, 0.15]} position={[x, -0.8, z]} castShadow>
              <meshStandardMaterial color="#3a3a3a" metalness={0.4} roughness={0.6} />
            </Box>
          )
        })}

        {/* Retro Apple Logo */}
        <Box args={[0.3, 0.3, 0.01]} position={[0, 1.2, -1.5]} rotation={[-0.1, 0, 0]}>
          <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.3} transparent opacity={0.8} />
        </Box>
      </group>
    </Float>
  )
}

export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Retro-style lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ff6b6b" castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4ecdc4" />
      <pointLight position={[10, -5, 5]} intensity={0.6} color="#ffd93d" />
      <spotLight position={[0, 15, 0]} intensity={1} angle={0.3} penumbra={1} color="#ffffff" castShadow />

      {/* Stars */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      {/* Computer Model */}
      <Computer />

      {/* Retro floating elements */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <Box
            args={[0.15, 0.15, 0.15]}
            position={[
              Math.cos((i / 12) * Math.PI * 2) * 10,
              Math.sin((i / 12) * Math.PI * 2) * 4,
              Math.sin((i / 12) * Math.PI * 2) * 6,
            ]}
          >
            <meshStandardMaterial
              color={i % 3 === 0 ? "#ff6b6b" : i % 3 === 1 ? "#4ecdc4" : "#ffd93d"}
              emissive={i % 3 === 0 ? "#ff6b6b" : i % 3 === 1 ? "#4ecdc4" : "#ffd93d"}
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </Box>
        </Float>
      ))}

      {/* Ground plane for shadows */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0a0a0a" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}
