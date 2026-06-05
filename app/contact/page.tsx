"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import MagneticButton from "../../components/MagneticButton"; // Pastikan path ini benar

export default function ContactPage() {
  const router = useRouter();
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [targetPath, setTargetPath] = useState("/");

  // Transisi Layar Masuk
  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 800); 
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setTargetPath(path);
    setIsExiting(true); 
    setTimeout(() => router.push(path), 900); 
  };

  // --- MATEMATIKA ANIMASI ---
  const transitionConfig: any = { duration: 0.9, ease: [0.76, 0, 0.24, 1] };
  const slideUp: Variants = { initial: { y: "0%" }, exit: { y: "-100%", transition: transitionConfig } };
  const curveDown: Variants = { initial: { d: "M0,0 Q50,100 100,0 L100,0 L0,0 Z" }, exit: { d: "M0,0 Q50,0 100,0 L100,0 L0,0 Z", transition: transitionConfig } };
  const slideUpEnter: Variants = { initial: { y: "100%" }, enter: { y: "0%", transition: transitionConfig } };
  const curveUp: Variants = { initial: { d: "M0,100 Q50,0 100,100 L100,100 L0,100 Z" }, enter: { d: "M0,100 Q50,100 100,100 L100,100 L0,100 Z", transition: transitionConfig } };

  return (
    <main className="bg-[#1C1D20] text-white min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* --- PRELOADER TRANSISI --- */}
      <AnimatePresence mode="wait">
        {isEntering && (
          <motion.div key="entrance" variants={slideUp} initial="initial" exit="exit" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1D20] text-white">
            <h1 className="text-4xl font-light tracking-tight flex items-center gap-4"><span className="w-2 h-2 bg-white rounded-full"></span>Contact</h1>
            <svg className="absolute top-full left-0 w-full h-[15vh] fill-[#1C1D20] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none"><motion.path variants={curveDown} initial="initial" exit="exit" /></svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isExiting && (
          <motion.div key="exit" variants={slideUpEnter} initial="initial" animate="enter" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1D20] text-white">
            <svg className="absolute bottom-full left-0 w-full h-[15vh] fill-[#1C1D20] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none"><motion.path variants={curveUp} initial="initial" animate="enter" /></svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NAVIGASI HEADER --- */}
      <nav className="w-full flex justify-between items-center py-8 px-6 md:px-12 text-sm font-medium z-10 relative">
        <div className="cursor-pointer" onClick={(e) => handleNavigate(e, "/")}>© Elgari Alfiras</div>
        <div className="flex gap-8">
          <a href="/" onClick={(e) => handleNavigate(e, "/")} className="hover:opacity-50 transition-opacity">Home</a>
          <a href="/works" onClick={(e) => handleNavigate(e, "/works")} className="hover:opacity-50 transition-opacity">Work</a>
          <span className="cursor-default flex items-center gap-2">Contact <div className="w-1.5 h-1.5 bg-white rounded-full"></div></span>
        </div>
      </nav>

      {/* --- KONTEN CONTACT (SNELLENBERG STYLE) --- */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pt-20 pb-32">
        <div className="flex flex-col md:flex-row gap-20 md:gap-10">
          
          {/* KIRI: Header & Form */}
          <div className="flex-1 md:pr-20">
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-tight mb-20">
              Let's start a <br/> project together
            </h1>

            {/* FORM DIMULAI DI SINI (Terhubung dengan Web3Forms) */}
            <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-12">
              
              {/* WAJIB: Ganti value di bawah ini dengan Access Key dari email Anda */}
              <input type="hidden" name="access_key" value="e972f74c-f666-42e9-93d3-9d2b9280ef2e" />
              
              {/* Ini mengarahkan pengguna kembali ke halaman Home setelah berhasil mengirim */}
              <input type="hidden" name="redirect" value="https://elgarialfiras.com" />

              <div className="flex flex-col gap-4 border-b border-gray-700 pb-4 group">
                <label className="text-gray-400 text-sm flex gap-4"><span className="text-gray-600">01</span> What's your name?</label>
                <input type="text" name="name" required placeholder="Garry *" className="bg-transparent text-xl md:text-2xl outline-none placeholder:text-gray-600 text-white transition-colors focus:text-blue-500" />
              </div>
              
              <div className="flex flex-col gap-4 border-b border-gray-700 pb-4 group">
                <label className="text-gray-400 text-sm flex gap-4"><span className="text-gray-600">02</span> What's your email?</label>
                <input type="email" name="email" required placeholder="garry@gmail.com *" className="bg-transparent text-xl md:text-2xl outline-none placeholder:text-gray-600 text-white transition-colors focus:text-blue-500" />
              </div>
              
              <div className="flex flex-col gap-4 border-b border-gray-700 pb-4 group">
                <label className="text-gray-400 text-sm flex gap-4"><span className="text-gray-600">03</span> What's the name of your organization?</label>
                <input type="text" name="organization" placeholder="Garry Agency ®" className="bg-transparent text-xl md:text-2xl outline-none placeholder:text-gray-600 text-white transition-colors focus:text-blue-500" />
              </div>
              
              <div className="flex flex-col gap-4 border-b border-gray-700 pb-4 group">
                <label className="text-gray-400 text-sm flex gap-4"><span className="text-gray-600">04</span> Your message</label>
                <textarea name="message" required placeholder="Hello Elgari, can you help me with... *" rows={3} className="bg-transparent text-xl md:text-2xl outline-none placeholder:text-gray-600 text-white resize-none transition-colors focus:text-blue-500"></textarea>
              </div>

              {/* Submit Button */}
              <div className="mt-8 self-end">
                <MagneticButton>
                  <button type="submit" className="w-32 h-32 md:w-40 md:h-40 bg-[#3B82F6] rounded-full text-white text-sm md:text-base font-medium hover:bg-blue-600 transition-colors shadow-2xl">
                    Send it!
                  </button>
                </MagneticButton>
              </div>
            </form>
          </div>

          {/* KANAN: Detail & Foto */}
          <div className="md:w-1/3 flex flex-col mt-20 md:mt-0">
            {/* Foto Profil */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-12">
              <img src="/elgari-photobg.png" alt="Elgari" className="w-full h-full object-cover object-top" />
            </div>

            {/* Ikon Panah Bawah */}
            <div className="mb-20 text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="7" x2="17" y2="17"></line>
                <polyline points="17 7 17 17 7 17"></polyline>
              </svg>
            </div>

            {/* Detail Kontak */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Contact Details</p>
                <a href="mailto:hello@elgarialfiras.com" className="text-lg hover:opacity-70 transition-opacity">elgarialfiras@gmail.com</a>
                <a href="#" className="text-lg hover:opacity-70 transition-opacity">+62 821 1465 5830</a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Profile</p>
                <p className="text-lg text-gray-300">Muhammad Elgari Alfiras</p>
                <p className="text-lg text-gray-300">Bogor, Indonesia</p>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Socials</p>
                <div className="flex gap-4 text-sm font-medium">
                  <a href="https://www.instagram.com/elgarialfiras" className="hover:opacity-70 transition-opacity">Instagram</a>
                  <a href="https://www.linkedin.com/in/elgarialfiras" className="hover:opacity-70 transition-opacity">LinkedIn</a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}