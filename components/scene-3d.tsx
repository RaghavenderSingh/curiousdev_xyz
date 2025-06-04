"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  Sphere,
  Torus,
  Box,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import * as THREE from "three";

export function Scene3D() {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  // Create particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3;
      torusRef.current.rotation.y = time * 0.2;
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
      <spotLight
        position={[0, 10, 0]}
        intensity={0.8}
        angle={0.3}
        penumbra={1}
        castShadow
      />

      {/* Main geometric shapes */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere
          ref={sphereRef}
          args={[2, 64, 64]}
          position={[0, 0, 0]}
          castShadow
        >
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <Torus ref={torusRef} args={[3, 0.5, 16, 100]} position={[0, 0, 0]}>
          <MeshWobbleMaterial
            color="#ec4899"
            attach="material"
            factor={0.6}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Torus>
      </Float>

      {/* Floating cubes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.5}
          floatIntensity={0.3}
        >
          <Box
            args={[0.5, 0.5, 0.5]}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
            ]}
            castShadow
          >
            <meshStandardMaterial
              color={new THREE.Color().setHSL(Math.random(), 0.7, 0.5)}
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
        </Float>
      ))}

      {/* Particle system */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            args={[particlePositions, 3]}
            attach="attributes-position"
            count={200}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.6} />
      </points>

      {/* Background gradient sphere */}
      <Sphere args={[100, 64, 64]} position={[0, 0, -50]}>
        <meshBasicMaterial
          color="#000000"
          side={THREE.BackSide}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </group>
  );
}
