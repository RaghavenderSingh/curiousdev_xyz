"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import { VisionProScene } from "@/components/vision-pro-scene"
import { LoadingScreen } from "@/components/loading-screen"

export function VisionProInterface() {
  return (
    <div className="w-full h-screen relative">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
          <Environment preset="night" />
          <VisionProScene />
        </Suspense>
      </Canvas>

      {/* Loading overlay */}
      <LoadingScreen />
    </div>
  )
}
