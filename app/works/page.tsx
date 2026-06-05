"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import MagneticButton from "../../components/MagneticButton"; // Pastikan path ini benar!

// --- DATA PROYEK FULL (Dengan sistem Gallery Array yang tak terbatas) ---
const allProjects = [
  { 
    title: "Personal Branding", category: "Branding", year: "2022-Present", 
    image: "/pb-1.webp", 
    gallery: [
      "/pb-1.webp",
      "/pb-3.webp",
      "/pb-4.webp",
      "/pb-5.mp4",
      "/pb-2.webp"
    ],
    desc: "Building a strong digital presence through strategic content and storytelling.", 
    problem: "Standing out in a competitive job market requires a strong personal brand.", 
    role: "Content Strategist & Creator", 
    output: "Produced high-quality content, including a post that reached 200K+ views.", 
    impact: "Increased visibility, credibility, and professional opportunities." 
  },
  { 
    title: "Media Pesta Karya", category: "Event and Campaign", year: "2026", 
    image: "/mpk1.webp", 
    gallery: [
      "/mpk1.webp",
      "/mpk2.mp4",
      "/mpk3.webp",
      "/mpk4.webp",
      "/mpk5.mp4"
    ],
    desc: "A creative campaign themed 'Once Upon Our Time' aimed at celebrating digital arts and media.", 
    problem: "Needed a cohesive narrative to tie various creative sub-events together under one umbrella.", 
    role: "Project Officer & Strategy Lead", 
    output: "Developed project proposals, sponsorship plans, and the core event concept.", 
    impact: "Successfully unified the event identity and secured initial partnership interests." 
  },
  { 
    title: "Satu Akses", category: "UI/UX", year: "2025", 
    image: "/sa1.webp", 
    gallery: [
      "/sa1.webp",
      "/sa2.webp",
      "/sa3.webp",
      "/sa4.webp",
      "/sa5.webp",
    ],
    desc: "An inclusive platform centralizing accessible digital resources for people with disabilities.", 
    problem: "People with disabilities struggle to find accessible digital tools due to scattered information and low awareness.", 
    role: "UI/UX Designer", 
    output: "Designed a centralized platform featuring 'Inclusivity Badges,' personalized recommendations, and community forums.", 
    impact: "Empowered users with independent access to digital tools." 
  },
  { 
    title: "Smooch", category: "Branding", year: "2025", 
    image: "/sm7.webp", 
    gallery: [
      "/sm1.webp",
      "/sm2.webp",
      "/sm3.webp",
      "/sm4.webp",
      "/sm5.webp",
      "/sm6.webp",
      "/sm8.webp",
    ],
    desc: "Developing a playful baby care brand inspired by a mother’s kiss.", 
    problem: "Many baby care products lacked a distinctive fragrance while maintaining skin-nourishing benefits.", 
    role: "Brand Designer", 
    output: "Designed a colorful brand identity system, including logo, packaging, and brand guidelines inspired by puzzle elements.", 
    impact: "Created a memorable and trustworthy brand identity that strengthened product differentiation in the baby care market." 
  },
  { 
    title: "Himprodia", category: "Branding", year: "2025", 
    image: "/dkv1.webp",
    gallery: [
      "/dkv2.mp4",
      "/dkv3.webp",
      "/dkv4.webp",
      "/dkv5.webp",
    ],
    desc: "Supporting the branding and content strategy of Media Production Student Association.", 
    problem: "The organization lacked a distinctive visual identity and consistent content approach to effectively engage students.", 
    role: "Junior Designer", 
    output: "Produced visual content that generated 2.8M+ impressions and contributed to a photoshoot concept that became a trendsetter within the organization.", 
    impact: "Strengthened organizational visibility, increased student engagement, and established a more recognizable brand presence." 
  },
  { 
    title: "Media Intelligence", category: "Artificial Intelligence and Prompting", year: "2025-2026", 
    image: "/mi1.webp", 
    gallery: [
      "/mi1.webp",
      "/mi2.mp4",
      "/mi3.webp", 
      "/mi4.mp4", 
      "/mi5.webp", 
      "/mi6.mp4", 
      "/mi7.mp4", 
      "/mi8.webp", 
    ],
    desc: "Exploring AI tools and prompt engineering for creative media workflows.", 
    problem: "The rapid advancement of AI requires media professionals to adapt and leverage emerging technologies effectively.", 
    role: "Prompt Engineer & Data Analyst", 
    output: "Developed multiple AI-powered websites and utilized Google Gemini to support research, analysis, and course-related projects.", 
    impact: "Enhanced workflow efficiency, improved data-driven decision making, and expanded the application of AI in creative media production." 
  },
  { 
    title: "Photography", category: "Photography", year: "2022-Present", 
    image: "/pt1.webp", 
    gallery: [
      "/pt1.webp",
      "/pt2.webp",
      "/pt3.webp",
      "/pt4.webp",
      "/pt5.webp",
      "/pt6.webp",
      "/pt7.webp",
      "/pt8.webp",
    ],
    desc: "Showcasing personal photography works through my platform, @karyael_.", 
    problem: "Photographers need a strong personal brand to stand out in an increasingly competitive creative industry.", 
    role: "Photographer", 
    output: "Produced a collection of street, portrait, event, and visual storytelling photographs curated across digital platforms.", 
    impact: "Strengthened my personal brand, expanded audience reach, and showcased visual storytelling skills to potential clients and collaborators." 
  },
  { 
    title: "Keripik Tempe Rohani", category: "Packaging", year: "2025", 
    image: "/rh1.webp", 
    gallery: [
      "/rh1.webp",
      "/rh2.webp", 
      "/rh3.webp", 
    ],
    desc: "Packaging redesign to modernize a traditional local snack.", 
    problem: "Outdated packaging failing to attract new customers.", 
    role: "Packaging Designer", 
    output: "Modernized packaging design.", 
    impact: "Improved product shelf appeal." 
  },
  { 
    title: "Tsijinema", category: "Branding & Campaign", year: "2025", 
    image: "/tsi1.webp", 
    gallery: [
      "/tsi2.mp4",
      "/tsi3.webp", 
      "/tsi4.mp4", 
      "/tsi5.mp4", 
    ],
    desc: "Promotional campaign and branding for the Prorientation UI event.", 
    problem: "Needed to engage new students effectively.", 
    role: "Creative Strategy Lead", 
    output: "Creative campaign materials.", 
    impact: "High engagement from participants." 
  },
  { 
    title: "Tanda", category: "Branding & Marketing", year: "2025", 
    image: "/tnd1.jpg", 
    gallery: [
      "/tnd1.jpg",
      "/tnd2.jpg", 
      "/tnd3.mp4", 
      "/tnd4.jpg", 
    ],
    desc: "Marketing materials and brand strategy for a local initiative.", 
    problem: "Building brand awareness.", 
    role: "Marketing Strategist", 
    output: "Marketing campaign designs.", 
    impact: "Increased local reach." 
  }
];

export default function WorksPage() {
  const router = useRouter();
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [targetPath, setTargetPath] = useState("/");
  
  // State untuk Menu Burger
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  // State untuk efek Hover Gambar (Gambar 1)
  const [modal, setModal] = useState({ active: false, index: 0 });
  
  // State untuk Popup Case Study (Gambar 2)
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Fisika kursor untuk pergerakan gambar yang super smooth
  const cursorX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    // Mendeteksi pergerakan mouse
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

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
  const slideUp: Variants = {
    initial: { y: "0%" },
    exit: { y: "-100%", transition: transitionConfig }
  };
  const curveDown: Variants = {
    initial: { d: "M0,0 Q50,100 100,0 L100,0 L0,0 Z" }, 
    exit: { d: "M0,0 Q50,0 100,0 L100,0 L0,0 Z", transition: transitionConfig } 
  };
  const slideUpEnter: Variants = {
    initial: { y: "100%" },
    enter: { y: "0%", transition: transitionConfig }
  };
  const curveUp: Variants = {
    initial: { d: "M0,100 Q50,0 100,100 L100,100 L0,100 Z" }, 
    enter: { d: "M0,100 Q50,100 100,100 L100,100 L0,100 Z", transition: transitionConfig } 
  };

  return (
    <main className="bg-white text-black min-h-screen font-sans selection:bg-black selection:text-white">
      
      {/* --- PRELOADER MASUK & KELUAR --- */}
      <AnimatePresence mode="wait">
        {isEntering && (
          <motion.div key="entrance" variants={slideUp} initial="initial" exit="exit" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1D20] text-white">
            <h1 className="text-4xl font-light tracking-tight flex items-center gap-4"><span className="w-2 h-2 bg-white rounded-full"></span>Work</h1>
            <svg className="absolute top-full left-0 w-full h-[15vh] fill-[#1C1D20] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path variants={curveDown} initial="initial" exit="exit" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isExiting && (
          <motion.div key="exit" variants={slideUpEnter} initial="initial" animate="enter" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1D20] text-white">
             <h1 className="text-4xl font-light tracking-tight flex items-center gap-4">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              {targetPath === "/contact" ? "Contact" : "Home"}
            </h1>
            <svg className="absolute bottom-full left-0 w-full h-[15vh] fill-[#1C1D20] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path variants={curveUp} initial="initial" animate="enter" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          FITUR 3: BURGER MENU & OVERLAY SNELLENBERG
          ========================================= */}
      <AnimatePresence mode="wait">
        {isNavOpen && (
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: "0%" }} 
            exit={{ x: "100%" }} 
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 w-full md:w-[450px] h-screen bg-[#1C1D20] text-white z-[150] p-12 md:p-20 flex flex-col justify-between shadow-2xl"
          >
            <div className="flex flex-col gap-8 mt-20">
              <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-4 border-b border-gray-800 pb-4">Navigation</p>
              
              <div onClick={(e) => { setIsNavOpen(false); handleNavigate(e, "/"); }} className="text-5xl font-light cursor-pointer hover:translate-x-4 transition-transform duration-300">Home</div>
              
              <div onClick={(e) => { setIsNavOpen(false); handleNavigate(e, "/works"); }} className="text-5xl font-light cursor-pointer hover:translate-x-4 transition-transform duration-300 flex items-center gap-4">
                Work 
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
                  className="w-3 h-3 bg-white rounded-full"
                />
              </div>
              
              <div onClick={(e) => { setIsNavOpen(false); handleNavigate(e, "/contact"); }} className="text-5xl font-light cursor-pointer hover:translate-x-4 transition-transform duration-300">Contact</div>
            </div>
            
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BURGER BUTTON */}
      <div className="fixed top-8 right-6 md:right-12 z-[200]">
        <MagneticButton>
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className={`w-16 h-16 rounded-full flex flex-col items-center justify-center gap-1.5 transition-colors duration-300 ${isNavOpen ? 'bg-[#3B82F6] text-white' : 'bg-[#1C1D20] text-white hover:bg-gray-800 shadow-xl'}`}
          >
            <div className={`w-5 h-[1.5px] bg-current transition-all duration-300 ${isNavOpen ? 'rotate-45 translate-y-[3px]' : ''}`}></div>
            <div className={`w-5 h-[1.5px] bg-current transition-all duration-300 ${isNavOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`}></div>
          </button>
        </MagneticButton>
      </div>

      {/* =========================================
          FITUR 1: GAMBAR MELAYANG MENGIKUTI KURSOR
          ========================================= */}
      <motion.div
        className="fixed top-0 left-0 w-[350px] h-[250px] pointer-events-none z-40 overflow-hidden flex items-center justify-center hidden md:flex"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: modal.active ? 1 : 0, opacity: modal.active ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute w-20 h-20 bg-[#3B82F6] rounded-full text-white flex items-center justify-center text-sm font-medium z-50 shadow-2xl">
          View
        </div>
        
        <div 
          className="w-full h-full relative transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: `translateY(-${modal.index * 100}%)` }}
        >
          {allProjects.map((proj, idx) => (
            <div key={idx} className="w-full h-full bg-gray-200 flex items-center justify-center relative">
              <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* =========================================
          FITUR 2: MODAL POPUP CASE STUDY
          ========================================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          >
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer" 
              onClick={() => setSelectedProject(null)} 
            />
            
            <motion.div 
              data-lenis-prevent="true"
              className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl relative z-10 overflow-y-auto p-8 md:p-14 shadow-2xl overscroll-contain"
              initial={{ y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-black transition-colors z-50"
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-black transition-colors font-medium text-sm flex items-center gap-2">
                  ← Back
                </button>
              </div>

              <p className="text-blue-600 font-bold text-xs tracking-widest uppercase mb-2">Case Study</p>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">{selectedProject.title}</h2>
              <p className="text-xl md:text-2xl text-gray-500 mb-16 max-w-3xl leading-relaxed">{selectedProject.desc}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 text-sm md:text-base">
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="font-bold mb-3 text-black">The Problem</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.problem}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3 text-black">My Role</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.role}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="font-bold mb-3 text-black">The Output</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.output}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3 text-black">The Impact</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.impact}</p>
                  </div>
                </div>
              </div>

              {/* --- AREA MASONRY GALLERY (PINTEREST STYLE) --- */}
              <div className="columns-1 md:columns-2 gap-4">
                
                {selectedProject.gallery?.map((media: string, index: number) => (
                  <div 
                    key={index} 
                    className="break-inside-avoid mb-4 w-full bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative"
                  >
                    {/* Logika pintar MP4 */}
                    {media.includes(".mp4") ? (
                      <video 
                        src={media} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        // h-auto memastikan rasio asli video tetap terjaga (tidak dipaksa kotak)
                        className="w-full h-auto" 
                      />
                    ) : (
                      <img 
                        src={media} 
                        alt={`${selectedProject.title} gallery ${index + 1}`} 
                        // h-auto memastikan gambar portrait akan memanjang ke bawah, landscape akan melebar
                        className="w-full h-auto hover:scale-105 transition-transform duration-500 block" 
                      />
                    )}
                  </div>
                ))}
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- KONTEN HALAMAN UTAMA --- */}
      <nav className="w-full flex justify-between items-center py-8 px-6 md:px-12 text-sm font-medium relative z-10">
        <div className="cursor-pointer hover:opacity-50 transition-opacity" onClick={(e) => handleNavigate(e, "/")}>© Elgari Alfiras</div>
        {/* Teks link di kanan dihapus karena sudah digantikan oleh tombol Burger Melayang */}
      </nav>

      <section className="pt-20 pb-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tighter leading-[0.95]">
          Crafting content, brands,<br/> and creative experiences 
        </h1>
      </section>

      {/* pb-60 ditambahkan agar ada ruang lega sebelum footer melengkung */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-60 relative z-10">
        <div className="grid grid-cols-12 pb-4 border-b border-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-widest">
          <div className="col-span-12 md:col-span-6">Project</div>
          <div className="hidden md:block col-span-4">Services</div>
          <div className="hidden md:block col-span-2 text-right">Year</div>
        </div>

        <div className="flex flex-col">
          {allProjects.map((project, i) => (
            <div 
              key={i} 
              onMouseEnter={() => setModal({ active: true, index: i })}
              onMouseLeave={() => setModal({ active: false, index: i })}
              onClick={() => setSelectedProject(project)}
              className="grid grid-cols-12 py-8 border-b border-gray-200 items-center group cursor-pointer hover:bg-gray-50 transition-colors duration-300 -mx-6 px-6 md:mx-0 md:px-0"
            >
              <div className="col-span-12 md:col-span-6">
                <h2 className="text-3xl md:text-5xl font-light tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-out text-gray-400 group-hover:text-black">
                  {project.title}
                </h2>
                <div className="flex justify-between mt-2 md:hidden text-sm text-gray-500">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>
              <div className="hidden md:block col-span-4 text-lg text-gray-400 group-hover:text-gray-600 transition-colors">
                {project.category}
              </div>
              <div className="hidden md:block col-span-2 text-right text-lg text-gray-400 group-hover:text-gray-600 transition-colors">
                {project.year}
              </div>
            </div>
          ))}
        </div>

        {/* --- TOMBOL ARCHIVE GOOGLE DRIVE (SNELLENBERG STYLE) --- */}
        <div className="w-full flex justify-center mt-24 md:mt-32">
          <MagneticButton>
            <a 
              href="https://drive.google.com/drive/folders/17FlrQiLxyJZ5JfHkNzTgS2LW_Y92Jjt3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 md:px-10 md:py-5 rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors duration-300 text-sm md:text-base font-medium flex items-center gap-3 group"
            >
              View Full Archive
              {/* Ikon panah serong khas Snellenberg */}
              <svg 
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:rotate-45 transition-transform duration-300"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </MagneticButton>
        </div>

      </section>

      {/* ========================================================================================= */}
      {/* --- FOOTER SNELLENBERG STYLE DENGAN KURVA HITAM MELENGKUNG --- */}
      {/* ========================================================================================= */}
      <section className="relative w-full bg-[#1C1D20] text-white pt-40 pb-20 px-6 md:px-12 z-20">
        
        {/* KURVA HITAM MELENGKUNG KE ATAS */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] md:w-[120%] h-[150px] md:h-[250px] bg-[#1C1D20] rounded-[100%] z-[-1]"></div>

        <div className="max-w-7xl mx-auto flex flex-col relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-gray-700 pb-16 relative">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-6">
                <img src="/elgari-photobg.png" alt="Elgari Alfiras" className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover object-top" />
                <h2 className="text-6xl md:text-[7rem] font-light tracking-tighter">Let's work</h2>
              </div>
              <h2 className="text-6xl md:text-[7rem] font-light tracking-tighter">together</h2>
            </div>

            <div className="hidden md:block absolute right-[25%] top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>

            <div onClick={(e) => handleNavigate(e, "/contact")}>
              <MagneticButton>
                <div className="w-32 h-32 md:w-48 md:h-48 bg-[#3B82F6] rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors duration-300 shadow-2xl">
                  <span className="text-white font-medium text-sm md:text-lg">Get in touch</span>
                </div>
              </MagneticButton>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-12">
            <a href="mailto:hello@elgarialfiras.com" className="px-8 py-5 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors duration-300 text-sm font-medium w-fit">hello@elgarialfiras.com</a>
            <a href="#" className="px-8 py-5 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors duration-300 text-sm font-medium w-fit">+62 812 3456 7890</a>
          </div>

        </div>
      </section>

    </main>
  );
}