import { motion } from "framer-motion";

const Showcase = () => {
  return (
    <section className="relative py-24 px-6 bg-white overflow-hidden">
      {/* Structural Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative w-full group glow-blue"
        >
          {/* Label */}
          <div className="flex justify-center mb-12">
            <span className="px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">
              Product Interface
            </span>
          </div>

          {/* The Visual */}
          <div className="rounded-[48px] overflow-hidden border border-slate-200 bg-white shadow-premium transition-transform duration-1000 group-hover:scale-[1.01]">
            <img 
              src="/pullboard_hero_mockup_1778827600169.png" 
              alt="PullBoard Dashboard Interface" 
              className="w-full h-auto object-cover opacity-95 transition-opacity group-hover:opacity-100"
            />
          </div>
          
          {/* Subtle Atmosphere */}
          <div className="absolute -inset-20 bg-blue-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        </motion.div>
      </div>

      {/* Bottom Separator */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
};

export default Showcase;
