"use client"

import type { ReactNode } from "react"

interface FloatingPanelProps {
  children: ReactNode
  className?: string
}

export function FloatingPanel({ children, className = "" }: FloatingPanelProps) {
  return (
    <div
      className={`
        bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl
        shadow-2xl hover:shadow-3xl transition-all duration-300
        hover:bg-black/40 hover:border-white/30
        ${className}
      `}
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          0 0 0 1px rgba(255, 255, 255, 0.1)
        `,
      }}
    >
      {children}
    </div>
  )
}
