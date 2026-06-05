"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useRouter } from "next/navigation"; 
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../components/MagneticButton";
import { Home as HomeIcon, Briefcase, User, Mail, MousePointer2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const words = ["Hello", "Bonjour", "Ciao", "Olá", "おい", "Hallo"];

const projects = [
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
      "/mpk3.webp",
      "/mpk4.webp"
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
      "/mi5.webp",  
      "/mi8.webp", 
    ],
    desc: "Exploring AI tools and prompt engineering for creative media workflows.", 
    problem: "The rapid advancement of AI requires media professionals to adapt and leverage emerging technologies effectively.", 
    role: "Prompt Engineer & Data Analyst", 
    output: "Developed multiple AI-powered websites and utilized Google Gemini to support research, analysis, and course-related projects.", 
    impact: "Enhanced workflow efficiency, improved data-driven decision making, and expanded the application of AI in creative media production." 
  }
];

export default function Home() {
  const router = useRouter(); 
  const [isExiting, setIsExiting] = useState(false); 
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [targetPath, setTargetPath] = useState("/works");
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  
  const [hoverModal, setHoverModal] = useState({ active: false, index: 0 });
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const cursorX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 200); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setIsNavOpen(false); 
    setTargetPath(path);
    setIsExiting(true); 
    setTimeout(() => router.push(path), 900); 
  };
  
  const slideUpEnter: any = { initial: { y: "100%" }, enter: { y: "0%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } } };
  const curveUp: any = { initial: { d: "M0,100 Q50,0 100,100 L100,100 L0,100 Z" }, enter: { d: "M0,100 Q50,100 100,100 L100,100 L0,100 Z", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } } };

  const menuSlide: any = {
    initial: { x: "100%" },
    enter: { x: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

  const [marqueeText, setMarqueeText] = useState("Elgari Alfiras •");
  const speedRef = useRef(0.03); 
  const directionRef = useRef(1); 
  const xPercentRef = useRef(0);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    if (isNavOpen || selectedProject) lenis.stop(); else lenis.start();
    
    lenis.on('scroll', ScrollTrigger.update); 
    
    // Simpan ticker ke dalam variabel agar bisa dihapus nantinya
    const ticker = (time: any) => { lenis.raf(time * 1000); };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    
    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker); // Wajib dihapus agar HP tidak ngelag/crash!
    };
  }, [isNavOpen, selectedProject]);

  useEffect(() => {
    if (index === words.length - 1) { setTimeout(() => setIsLoading(false), 800); return; }
    const timeout = setTimeout(() => setIndex(index + 1), index === 0 ? 1000 : 150);
    return () => clearTimeout(timeout);
  }, [index]);

  useEffect(() => {
    if (!isLoading) {
      const animateMarquee = () => {
        if (xPercentRef.current <= -50) xPercentRef.current = 0;
        else if (xPercentRef.current > 0) xPercentRef.current = -50;
        if (sliderRef.current) gsap.set(sliderRef.current, { xPercent: xPercentRef.current });
        xPercentRef.current += speedRef.current * directionRef.current;
        requestRef.current = requestAnimationFrame(animateMarquee);
      };
      requestRef.current = requestAnimationFrame(animateMarquee);

      const scrollObserver = ScrollTrigger.create({
        trigger: document.documentElement, start: 0, end: window.innerHeight * 2,
        onUpdate: (self) => { directionRef.current = self.direction === 1 ? 1 : -1; }
      });

      projectRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(el, 
            { y: 100, opacity: 0 }, // Jarak awal dibuat lebih jauh agar efek scroll lebih terasa
            { 
              y: 0, 
              opacity: 1, 
              ease: "none", // Wajib "none" agar pergerakannya linear mengikuti kecepatan tangan Anda
              scrollTrigger: { 
                trigger: el, 
                start: "top 95%", // Animasi mulai saat elemen baru mengintip di bawah layar
                end: "top 70%",   // Animasi selesai saat elemen sudah naik ke posisi 70% layar
                scrub: 1          // Angka 1 ini adalah sihirnya: animasi akan mengikuti scroll dengan kehalusan (lag) 1 detik
              } 
            }
          );
        }
      });

      gsap.utils.toArray('.fade-up').forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } }
        );
      });

      let ctx = gsap.context(() => {
        if (aboutContainerRef.current && horizontalScrollRef.current) {
          const getScrollAmount = () => horizontalScrollRef.current!.scrollWidth - window.innerWidth;
          gsap.to(horizontalScrollRef.current, {
            x: () => -getScrollAmount(), 
            ease: "none",
            scrollTrigger: {
              trigger: aboutContainerRef.current,
              pin: true, scrub: 1,
              end: () => `+=${getScrollAmount()}`,
              invalidateOnRefresh: true 
            }
          });
        }
      });

      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        scrollObserver.kill();
        ctx.revert(); 
      };
    }
  }, [isLoading]);

  return (
    <main className="block min-h-screen bg-[#1C1D20] text-white overflow-x-hidden">
      
      {/* --- FLOATING BURGER MENU --- */}
      <AnimatePresence>
        {isScrolled && !isNavOpen && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-8 right-8 md:top-12 md:right-12 z-[100]"
          >
            <MagneticButton>
              <div onClick={() => setIsNavOpen(true)} className="w-16 h-16 bg-[#1C1D20] rounded-full flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-2xl border border-gray-800">
                <div className="w-6 h-[1px] bg-white"></div>
                <div className="w-6 h-[1px] bg-white"></div>
              </div>
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- OVERLAY NAVIGATION MENU --- */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className="fixed top-0 right-0 h-screen w-full md:w-[500px] bg-[#1C1D20] text-white z-[200] px-12 md:px-20 py-20 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-gray-800">
            <div className="absolute top-10 right-10">
              <MagneticButton>
                <div onClick={() => setIsNavOpen(false)} className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center cursor-pointer text-white hover:bg-blue-600 transition-colors">
                  <span className="text-xl">✕</span>
                </div>
              </MagneticButton>
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-16 border-b border-gray-800 pb-6 w-full">Navigation</p>
            <div className="flex flex-col gap-6 text-5xl md:text-6xl font-light tracking-tighter">
              <a href="#top" onClick={(e) => { e.preventDefault(); setIsNavOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:pl-4 hover:text-gray-400 transition-all duration-300 w-fit">Home</a>
              <a href="/works" onClick={(e) => handleNavigate(e, "/works")} className="hover:pl-4 hover:text-gray-400 transition-all duration-300 w-fit">Work</a>
              <a href="#about-me" onClick={(e) => { setIsNavOpen(false); document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:pl-4 hover:text-gray-400 transition-all duration-300 w-fit">About</a>
              <a href="/contact" onClick={(e) => handleNavigate(e, "/contact")} className="hover:pl-4 hover:text-gray-400 transition-all duration-300 w-fit">Contact</a>
            </div>
            <div className="mt-auto">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-6">Socials</p>
              <div className="flex gap-6 text-sm font-medium">
                <a href="https://www.instagram.com/elgarialfiras" className="hover:opacity-70 transition-opacity">Instagram</a>
                <a href="https://www.linkedin.com/in/elgarialfiras" className="hover:opacity-70 transition-opacity">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div key="preloader" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1D20]" exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}>
            <h1 className="text-5xl font-light tracking-tight flex items-center gap-4 text-white"><span className="w-3 h-3 bg-white rounded-full animate-pulse"></span> {words[index]}</h1>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isExiting && (
          <motion.div key="exit-home" variants={slideUpEnter} initial="initial" animate="enter" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1D20] text-white">
            <h1 className="text-4xl font-light tracking-tight flex items-center gap-4"><span className="w-2 h-2 bg-white rounded-full"></span>{targetPath === "/works" ? "Work" : targetPath === "/contact" ? "Contact" : "Home"}</h1>
            <svg className="absolute bottom-full left-0 w-full h-[15vh] fill-[#1C1D20] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none"><motion.path variants={curveUp} initial="initial" animate="enter" /></svg>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 w-[350px] h-[250px] pointer-events-none z-[150] overflow-hidden flex items-center justify-center hidden md:flex"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: hoverModal.active ? 1 : 0, opacity: hoverModal.active ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute w-20 h-20 bg-[#3B82F6] rounded-full text-white flex items-center justify-center text-sm font-medium z-50 shadow-2xl">View</div>
        <div className="w-full h-full relative transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" style={{ transform: `translateY(-${hoverModal.index * 100}%)` }}>
          {projects.map((proj, idx) => (
            <div key={idx} className="w-full h-full bg-gray-200 flex items-center justify-center relative"><img src={proj.image} alt={proj.title} className="w-full h-full object-cover" /></div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 text-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer" onClick={() => setSelectedProject(null)} />
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

      <section className="relative h-screen w-full bg-[#999D9E] text-white overflow-hidden">
        <div className="absolute top-6 w-full px-4 md:px-12 z-30 flex justify-center">
          <nav className="w-full bg-[#111111] rounded-full px-6 py-4 flex justify-between items-center shadow-xl border border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span className="text-sm font-medium tracking-wider">karyael</span>
            </div>
            <div className="hidden md:flex gap-8 text-xs font-medium text-gray-300 uppercase tracking-widest">
              <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 hover:text-white transition-colors"><HomeIcon size={14}/> Home</a>
              <a href="#selected-works" onClick={(e) => { e.preventDefault(); document.getElementById('selected-works')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center gap-2 hover:text-white transition-colors"><Briefcase size={14}/> Selected Works</a>
              <a href="#about-me" onClick={(e) => { e.preventDefault(); document.getElementById('about-me')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center gap-2 hover:text-white transition-colors"><User size={14}/> About Me</a>
            </div>
            <div>
              <a href="/contact" onClick={(e) => handleNavigate(e, "/contact")} className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity border border-gray-700 px-4 py-2 rounded-full">
                <Mail size={14}/> Contact Me
              </a>
            </div>
          </nav>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl flex items-end justify-center z-[5] pointer-events-none">
          <img src="/elgari-photo.png" alt="Elgari Portrait" className="h-[95vh] md:h-[110vh] w-auto max-w-none object-cover object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,0.35)]" />
        </div>

        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 bg-[#111111] rounded-2xl py-3 px-6 flex items-center gap-4 z-20 shadow-2xl border border-gray-800 cursor-pointer hover:scale-105 transition-transform duration-300">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.7)]"></div>
          <span className="text-sm font-medium tracking-wide">Let's Connect</span>
        </div>

        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex gap-6 md:gap-10 z-20 text-white drop-shadow-lg">
          <div className="flex flex-col items-center"><h2 className="text-4xl md:text-5xl font-bold tracking-tighter">+4</h2><p className="text-[10px] text-gray-100 mt-2 tracking-widest uppercase text-center max-w-[90px]">Years of<br/>Experience</p></div>
          <div className="flex flex-col items-center"><h2 className="text-4xl md:text-5xl font-bold tracking-tighter">+30</h2><p className="text-[10px] text-gray-100 mt-2 tracking-widest uppercase text-center max-w-[90px]">Creative<br/>Projects</p></div>
          <div className="flex flex-col items-center"><h2 className="text-4xl md:text-5xl font-bold tracking-tighter">+4</h2><p className="text-[10px] text-gray-100 mt-2 tracking-widest uppercase text-center max-w-[120px]">National-Level<br/>Achievements</p></div>
        </div>

        <motion.div animate={{ y: [0, -15, 0], x: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[30%] left-[15%] md:left-[35%] z-20 pointer-events-none">
          <MousePointer2 className="w-6 h-6 text-white fill-white/20 -rotate-12 drop-shadow-md" />
          <div className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium mt-1 ml-4 shadow-xl border border-white/20">karyael</div>
        </motion.div>
        <motion.div animate={{ y: [0, -20, 0], x: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[65%] left-[5%] md:left-[20%] z-20 pointer-events-none">
          <MousePointer2 className="w-6 h-6 text-white fill-white/20 -rotate-12 drop-shadow-md" />
          <div className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium mt-1 ml-4 shadow-xl border border-white/20">Content Strategist</div>
        </motion.div>
        <motion.div animate={{ y: [0, -18, 0], x: [0, 12, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[35%] right-[30%] md:right-[25%] z-20 pointer-events-none">
          <MousePointer2 className="w-6 h-6 text-white fill-white/20 -rotate-12 drop-shadow-md" />
          <div className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium mt-1 ml-4 shadow-xl border border-white/20">Digital Creator</div>
        </motion.div>

        <div className="absolute bottom-[-2vh] w-full z-10 overflow-hidden cursor-pointer" onMouseEnter={() => speedRef.current = 0.008} onMouseLeave={() => speedRef.current = 0.03} onTouchStart={() => speedRef.current = 0.008} onTouchEnd={() => speedRef.current = 0.03}>
          <div ref={sliderRef} className="flex whitespace-nowrap w-max text-[15vw] font-medium tracking-tight leading-none mix-blend-overlay opacity-80">
            <div className="flex"><p className="pr-12">{marqueeText}</p><p className="pr-12">{marqueeText}</p></div>
            <div className="flex"><p className="pr-12">{marqueeText}</p><p className="pr-12">{marqueeText}</p></div>
          </div>
        </div>
      </section> 

      <section id="selected-works" className="py-32 px-4 md:px-12 lg:px-24 w-full max-w-7xl mx-auto bg-[#1C1D20] relative z-10">
        <div className="flex flex-col mb-20">
          <h5 className="text-gray-400 uppercase tracking-widest text-sm border-b border-gray-800 pb-4">Selected Works</h5>
        </div>
        
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <div 
              key={i} 
              ref={(el) => { projectRefs.current[i] = el; }}
              onMouseEnter={() => setHoverModal({ active: true, index: i })}
              onMouseLeave={() => setHoverModal({ active: false, index: i })}
              onClick={() => setSelectedProject(project)}
              className="project-item group border-b border-gray-800 py-12 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:px-6 transition-all duration-500 ease-in-out relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 relative z-10 pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-light tracking-tight group-hover:text-black transition-colors duration-300">{project.title}</h2>
                <p className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{project.category}</p>
              </div>
              <p className="text-gray-500 mt-4 md:mt-0 relative z-10 group-hover:text-black transition-colors duration-300">{project.year}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-24">
          <a href="/works" onClick={(e) => handleNavigate(e, "/works")} className="block relative z-20">
            <MagneticButton>
              <div className="px-10 py-5 rounded-full border border-gray-600 hover:bg-white hover:text-black hover:border-white transition-colors duration-300 flex items-center justify-center">
                <span className="text-lg font-medium tracking-wide">More work</span>
              </div>
            </MagneticButton>
          </a>
        </div>
      </section>

      <section id="about-me" ref={aboutContainerRef} className="relative h-screen bg-[#F0F0EE] text-[#1A1A1A] overflow-hidden">
        
        {/* Background Grafis SVG */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20 mix-blend-multiply">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100,200 Q300,50 600,300 T1200,100 T1800,400 T2400,200 T3000,500" fill="none" stroke="#000" strokeWidth="1" />
            <path d="M-100,400 Q200,200 700,500 T1400,300 T2000,600 T2600,100 T3200,400" fill="none" stroke="#000" strokeWidth="1" />
            <path d="M0,600 Q400,800 800,400 T1600,700 T2200,300 T2800,800 T3400,500" fill="none" stroke="#000" strokeWidth="1" />
            <path d="M-50,800 Q500,600 900,900 T1700,500 T2300,900 T2900,600 T3500,900" fill="none" stroke="#000" strokeWidth="1" />
          </svg>
        </div>

        <div ref={horizontalScrollRef} className="flex h-full w-[400vw] relative z-10">
          
          {/* PANEL 1: Pengenalan & Judul */}
          <div className="horizontal-panel w-screen h-full shrink-0 relative flex items-center">
            <div className="absolute left-10 md:left-24 top-1/4 z-20 max-w-2xl">
              <h2 className="text-5xl md:text-8xl font-serif tracking-tight leading-none text-[#333] mb-8">About <br/> Me</h2>
              <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed max-w-lg">
                I help companies and individuals build strong digital presence with tailor-made solutions. With each project, I push my work to new horizons, always putting quality first.
              </p>
            </div>
            
            <div className="absolute left-10 md:left-[55%] bottom-[15%] w-[250px] md:w-[350px] aspect-square bg-gray-300 p-2 shadow-2xl z-10">
              <img src="/elgari1.webp" alt="Creative Space" className="w-full h-full object-cover" />
            </div>
            <div className="absolute right-10 md:right-[5%] top-[15%] w-[200px] md:w-[280px] aspect-[3/4] bg-gray-200 shadow-xl hidden md:block">
              <img src="/elgari2.webp" alt="Workspace Setup" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>

          {/* PANEL 2: Layanan 01 - Strategy & Content */}
          <div className="horizontal-panel w-screen h-full shrink-0 relative flex flex-col md:flex-row items-center justify-center md:justify-start px-10 md:px-24 gap-12 md:gap-24">
            <div className="w-[85vw] md:w-[35vw] h-[40vh] md:h-[65vh] bg-gray-400 relative z-10 shadow-2xl overflow-hidden group shrink-0 order-2 md:order-1">
              <img src="/elgari4.webp" alt="Strategy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            
            <div className="z-20 max-w-xl order-1 md:order-2 mt-20 md:mt-0">
              <p className="text-sm font-bold text-gray-400 mb-2 tracking-widest">01</p>
              <h3 className="text-3xl md:text-5xl font-serif mb-6 text-[#333]">Strategy & Content</h3>
              <p className="text-lg md:text-xl font-light text-gray-600 leading-relaxed">
                With a solid track record in digital strategy, I deliver strong and engaging narratives. My focus is on creating content that not only looks premium but also connects deeply with the audience.
              </p>
            </div>
          </div>

          {/* PANEL 3: Layanan 02 - Visual Design */}
          <div className="horizontal-panel w-screen h-full shrink-0 relative flex flex-col md:flex-row items-center justify-center md:justify-end px-10 md:px-24 gap-12 md:gap-24">
            <div className="z-20 max-w-xl mb-12 md:mb-0">
              <p className="text-sm font-bold text-gray-400 mb-2 tracking-widest">02</p>
              <h3 className="text-3xl md:text-5xl font-serif mb-6 text-[#333]">Visual Design</h3>
              <p className="text-lg md:text-xl font-light text-gray-600 leading-relaxed">
                I craft distinct brand identities and UI/UX solutions from scratch. By treating typography, layout, and color as structural elements, I ensure every design decision serves a clear purpose.
              </p>
            </div>

            <div className="relative w-[85vw] md:w-[40vw] h-[50vh] md:h-[70vh] flex items-center justify-center">
              <div className="absolute top-0 left-0 w-[180px] md:w-[250px] aspect-square bg-gray-200 p-2 shadow-xl z-20">
                <img src="/elgari5.webp" alt="Design Detail 1" className="w-full h-full object-cover grayscale" />
              </div>
              <div className="absolute bottom-0 right-0 w-[150px] md:w-[250px] aspect-[3/4] bg-gray-300 shadow-md z-10">
                <img src="/elgari6.webp" alt="Design Detail 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>

          {/* PANEL 4: Layanan 03 - The Full Package */}
          <div className="horizontal-panel w-screen h-full shrink-0 relative flex items-center justify-center px-10">
            <div className="absolute top-[10%] left-5 md:left-[10%] w-[250px] md:w-[350px] aspect-[16/9] bg-gray-200 shadow-xl hidden md:block">
              <img src="/elgari7.webp" alt="Full Package 1" className="w-full h-full object-cover" />
            </div>
            
            <div className="z-20 max-w-2xl text-center bg-[#F0F0EE]/80 backdrop-blur-sm p-8 rounded-3xl">
              <p className="text-sm font-bold text-gray-400 mb-2 tracking-widest">03</p>
              <h3 className="text-3xl md:text-5xl font-serif mb-6 text-[#333]">The Full Package</h3>
              <p className="text-lg md:text-2xl font-light text-gray-600 leading-relaxed mb-8">
                A complete creative process from concept to implementation, that's what makes my approach stand out. My great sense for visual storytelling and strategic thinking enables me to create kick-ass projects.
              </p>
              <h3 className="text-xl md:text-3xl font-serif italic text-[#4A4B42]">"It doesn't matter where you start, it's how you progress from there."</h3>
            </div>

            <div className="absolute bottom-[20%] left-10 md:left-[20%] w-[120px] md:w-[180px] aspect-square bg-gray-300 p-2 shadow-2xl z-20">
              <img src="/elgari8.webp" alt="Full Package 2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
            <div className="absolute top-[25%] right-10 md:right-[15%] w-[150px] md:w-[280px] aspect-[4/5] bg-gray-400 shadow-lg hidden md:block z-10">
              <img src="/elgari10.webp" alt="Full Package 3" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================================= */}
      {/* --- RESUME SECTION (Dikembalikan z-index normal) --- */}
      {/* ========================================================================================= */}
      <section className="bg-white text-black pt-32 pb-24 md:pb-40 px-6 md:px-12 w-full z-10 relative border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col relative z-20">
          
          <div className="fade-up mb-20 border-b border-gray-200 pb-10">
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter">Capabilities &<br/><span className="text-gray-400">Experience</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* KIRI: Work & Org Experience */}
            <div className="col-span-1 lg:col-span-7 flex flex-col gap-16">
              
              <div className="flex flex-col">
                <h3 className="fade-up text-2xl font-medium mb-8">Work Experience</h3>
                
                <div className="fade-up border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-center justify-between group hover:pl-4 transition-all duration-300 cursor-default">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <h4 className="text-xl md:text-2xl font-medium">Graphic Designer</h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-widest uppercase rounded-full">FREELANCE</span>
                    </div>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">Rey For Himpunan Pengusaha Muda Indonesia</p>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-4 md:mt-0">Mei 2026 - Present</p>
                </div>

                <div className="fade-up border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-center justify-between group hover:pl-4 transition-all duration-300 cursor-default">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <h4 className="text-xl md:text-2xl font-medium">Creative Team</h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-widest uppercase rounded-full">FREELANCE</span>
                    </div>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">MOOCs Universitas Indonesia</p>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-4 md:mt-0">Oct 2025 - Jan 2026</p>
                </div>

                <div className="fade-up border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-center justify-between group hover:pl-4 transition-all duration-300 cursor-default">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <h4 className="text-xl md:text-2xl font-medium">Graphic Designer</h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-widest uppercase rounded-full">INTERNSHIP</span>
                    </div>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">Teaching Factory Media Production (POLAR LAB)</p>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-4 md:mt-0">Sep 2025 - Jan 2026</p>
                </div>

                <div className="fade-up border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-center justify-between group hover:pl-4 transition-all duration-300 cursor-default">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <h4 className="text-xl md:text-2xl font-medium">Graphic Designer</h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-widest uppercase rounded-full">INTERNSHIP</span>
                    </div>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">BTN Housingpreneur & Oddinary</p>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-4 md:mt-0">Nov 2024 - Feb 2025</p>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="fade-up text-2xl font-medium mb-8">Organizational Experience</h3>
                
                <div className="fade-up border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-center justify-between group hover:pl-4 transition-all duration-300 cursor-default">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <h4 className="text-xl md:text-2xl font-medium">Project Manager</h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-widest uppercase rounded-full">Event</span>
                    </div>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">Media Pesta Karya</p>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-4 md:mt-0">Feb 2026 - Present</p>
                </div>

                <div className="fade-up border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-center justify-between group hover:pl-4 transition-all duration-300 cursor-default">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <h4 className="text-xl md:text-2xl font-medium">Vice Head of Creative Production</h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-widest uppercase rounded-full">PRODUCTION</span>
                    </div>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">Radio Telekomunikasi Cipta UI</p>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-4 md:mt-0">Jan 2026 - Present</p>
                </div>

                <div className="fade-up border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-center justify-between group hover:pl-4 transition-all duration-300 cursor-default">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <h4 className="text-xl md:text-2xl font-medium">Creative Strategy Lead & Supervisor</h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-widest uppercase rounded-full">PROMOTION</span>
                    </div>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">Prorientation UI 2025</p>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-4 md:mt-0">Apr 2025 - Nov 2025</p>
                </div>

                <div className="fade-up border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-center justify-between group hover:pl-4 transition-all duration-300 cursor-default">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <h4 className="text-xl md:text-2xl font-medium">Visual Communication Design Staff</h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-widest uppercase rounded-full">DESIGN</span>
                    </div>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">Himpunan Mahasiswa Produksi Media UI</p>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-4 md:mt-0">Jul 2025 - Nov 2025</p>
                </div>

                <div className="fade-up border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-center justify-between group hover:pl-4 transition-all duration-300 cursor-default">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <h4 className="text-xl md:text-2xl font-medium">Head of Design Division</h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold tracking-widest uppercase rounded-full">Design</span>
                    </div>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">Etopia UI 2025</p>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mt-4 md:mt-0">Apr 2025 - Nov 2025</p>
                </div>
              </div>

            </div>

            {/* KANAN: Hard & Soft Skills */}
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-16">
              
              <div className="flex flex-col">
                <h3 className="fade-up text-2xl font-medium mb-8">Hard Skills</h3>
                <div className="fade-up flex flex-col gap-6">
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>Figma</span>
                      <span className="text-gray-400 text-xs uppercase tracking-widest">Proficient</span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200 relative"><div className="absolute top-0 left-0 h-full bg-black w-[95%]"></div></div>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>Adobe Illustrator</span>
                      <span className="text-gray-400 text-xs uppercase tracking-widest">Competent</span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200 relative"><div className="absolute top-0 left-0 h-full bg-black w-[75%]"></div></div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>Lightroom</span>
                      <span className="text-gray-400 text-xs uppercase tracking-widest">Competent</span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200 relative"><div className="absolute top-0 left-0 h-full bg-black w-[75%]"></div></div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>CapCut</span>
                      <span className="text-gray-400 text-xs uppercase tracking-widest">Proficient</span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200 relative"><div className="absolute top-0 left-0 h-full bg-black w-[95%]"></div></div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>Davinci Resolve</span>
                      <span className="text-gray-400 text-xs uppercase tracking-widest">Proficient</span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200 relative"><div className="absolute top-0 left-0 h-full bg-black w-[95%]"></div></div>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>AI Prompting</span>
                      <span className="text-gray-400 text-xs uppercase tracking-widest">Competent</span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200 relative"><div className="absolute top-0 left-0 h-full bg-black w-[75%]"></div></div>
                  </div>

                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="fade-up text-2xl font-medium mb-6">Soft Skills</h3>
                <div className="fade-up flex flex-wrap gap-3">
                  <span className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-default">Adaptability</span>
                  <span className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-default">Creative Strategy</span>
                  <span className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-default">Leadership</span>
                  <span className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-default">Problem Solving</span>
                  <span className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-default">Time Management</span>
                  <span className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-default">Project Management</span>
                  <span className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-black hover:text-white transition-colors cursor-default">Analytical Thinking</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      
      {/* ========================================================================================= */}
      {/* --- FOOTER SECTION DENGAN KURVA HITAM (KEMBALI KE ORIGINAL) --- */}
      {/* ========================================================================================= */}
      {/* z-20 agar kurva hitamnya bisa melampaui dan menimpa warna putih di atasnya */}
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
            <a href="mailto:elgarialfiras08@gmail.com" className="px-8 py-5 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors duration-300 text-sm font-medium w-fit">elgarialfiras08@gmail.com</a>
            <a href="#" className="px-8 py-5 rounded-full border border-gray-700 hover:bg-white hover:text-black transition-colors duration-300 text-sm font-medium w-fit">+62 821 1465 5830</a>
          </div>

        </div>
      </section>

    </main>
  );
}