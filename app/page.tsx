"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { HeroScene } from "@/components/hero-scene";
import { HeroOverlay } from "@/components/hero-overlay";
import { LoadingScreen } from "@/components/loading-screen";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { TerminalSection } from "@/components/terminal-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Hero Section - 3D */}
      <div className="h-screen w-full relative overflow-hidden">
        <Canvas shadows camera={{ position: [0, 0, 15], fov: 50 }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <HeroScene />
          </Suspense>
        </Canvas>
        <HeroOverlay />
        <LoadingScreen />
      </div>

      {/* Unified sections with consistent theme */}
      <div className="relative">
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <TerminalSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
