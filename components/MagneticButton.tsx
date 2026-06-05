"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticButton({ children }: { children: React.ReactNode }) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    // GSAP quickTo untuk animasi performa tinggi yang mengikuti kursor
    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      
      // Menghitung titik tengah tombol
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Kekuatan magnet (0.35 adalah *sweet spot* agar tidak terlalu liar)
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const mouseLeave = () => {
      // Mengembalikan tombol ke posisi semula saat kursor pergi
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", mouseMove);
    element.addEventListener("mouseleave", mouseLeave);

    return () => {
      element.removeEventListener("mousemove", mouseMove);
      element.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <div ref={magneticRef} className="relative inline-flex cursor-pointer">
      {children}
    </div>
  );
}