"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fisika spring yang sangat responsif (tanpa delay)
  const springConfig = { damping: 25, stiffness: 600, mass: 0.05 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".project-item") 
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none flex items-center justify-center z-[99999]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* 
        Efek Clear 3D Glass / Gel (Sesuai Referensi Gambar):
        - Background gradasi transparan
        - Tepi putih mengkilap (inset shadow)
        - Sedikit drop shadow untuk kedalaman
        - Blur sangat tipis (2px) agar tetap jernih
      */}
      <motion.div
        animate={{
          width: isClicking ? 25 : isHovered ? 65 : 35,
          height: isClicking ? 25 : isHovered ? 65 : 35,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="rounded-full flex items-center justify-center relative"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 100%)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "inset 0 4px 6px rgba(255, 255, 255, 0.9), inset 0 -2px 5px rgba(255, 255, 255, 0.4), 0 4px 15px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(1px)", 
        }}
      >
        <motion.div 
           animate={{ 
             opacity: isHovered ? 0 : 1,
             scale: isClicking ? 0.5 : 1
           }}
           transition={{ duration: 0.2 }}
           className="w-1.5 h-1.5 bg-white/80 rounded-full shadow-sm"
        />
      </motion.div>
    </motion.div>
  );
}