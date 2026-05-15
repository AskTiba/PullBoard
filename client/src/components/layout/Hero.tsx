import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Hero = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("auth_token"));
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden grid-pattern px-6"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none mesh-gradient-vibrant" />
      
      {/* Central Radiant Glow (Maximized and Centered) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center pt-20">
        {/* Pure Content Block (Centered for Perfect Fit) */}
        <motion.div style={{ y: springY, opacity }} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-black text-blue-700 tracking-[0.35em] uppercase shadow-sm">
              The Engineering Executive Standard
            </span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="text-serif text-5xl md:text-8xl text-gray-950 italic leading-[1] tracking-tight"
            >
              Intelligence, <br />
              <span className="text-blue-600 not-italic">Refined for Flow.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-500 font-medium leading-relaxed"
            >
              The premium mission control for high-performance engineering cultures. 
              Monitor and accelerate your review lifecycle.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="pt-4"
          >
            <Link 
              to={isAuthenticated ? "/dashboard" : "/auth"} 
              className="px-12 py-5 bg-blue-600 text-white rounded-[24px] font-black text-lg shadow-2xl hover:bg-blue-700 hover:scale-[1.05] active:scale-[0.95] transition-all cursor-pointer inline-block"
            >
              {isAuthenticated ? "Enter Dashboard" : "Get Started"}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;