import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PBLogo } from "../components/brand";
import GitHub from "../components/icons/github";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../services/api";

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <main className="h-screen grid grid-cols-1 lg:grid-cols-2 bg-hestia-bg overflow-hidden pt-20">
      {/* Visual Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative hidden lg:block overflow-hidden m-4 rounded-[40px]"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent z-10" />
        <img 
          src="/pbImg.png" 
          alt="PullBoard Dashboard Preview" 
          className="w-full h-full object-cover" 
        />
        {/* Decorative Overlay (Calibrated for h-screen) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-10 left-10 right-10 z-20 p-8 bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/20"
        >
          <p className="text-white text-xl font-black italic tracking-tight leading-tight">
            "The most elegant way to manage <br /> your engineering velocity."
          </p>
          <div className="mt-4 flex gap-2">
            <div className="h-1 w-12 bg-blue-500 rounded-full" />
            <div className="h-1 w-4 bg-white/30 rounded-full" />
            <div className="h-1 w-4 bg-white/30 rounded-full" />
          </div>
        </motion.div>
      </motion.div>

      {/* Form Side (Calibrated for Perfect Fit) */}
      <div className="flex flex-col justify-center items-center px-6 lg:px-20 py-8 grid-pattern relative overflow-hidden">
        {/* Vibrant Glow Backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md space-y-10"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <PBLogo width={140} />
          </div>

          {/* Text Content (Refined Scale) */}
          <div className="text-center lg:text-left space-y-3">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-serif text-5xl lg:text-6xl text-gray-950 italic"
            >
              Intelligence, <br />
              <span className="text-blue-600 not-italic">Refined for Flow.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-500 font-medium leading-relaxed"
            >
              Authenticate to join the professional standard in pull request monitoring.
            </motion.p>
          </div>

          {/* Login Card (Compact Precision) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-10 rounded-[var(--radius-ios-lg)] shadow-premium border border-white space-y-10"
          >
            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-xl font-bold text-gray-950 tracking-tight">Mission Control</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Sync your GitHub environment to start tracking lifecycle metrics.
              </p>
            </div>

            <button 
              onClick={() => window.location.href = `${API_BASE_URL}/auth/github`}
              className="w-full flex items-center justify-center gap-4 bg-gray-950 text-white py-5 px-8 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-600 active:scale-95 transition-all cursor-pointer"
            >
              <GitHub width={24} height={24} />
              <span>Connect GitHub</span>
            </button>

            <div className="pt-2 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                Secure OAuth 2.0 Integration
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
