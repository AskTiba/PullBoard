import { motion } from "framer-motion";

export default function HomeSections() {
  const pillars = [
    { 
      title: "Zero-Latency Tracking", 
      desc: "Stop waiting for syncs. Our PullBoard-powered engine fetches your GitHub data in milliseconds.",
      icon: "⚡"
    },
    { 
      title: "Workflow Integrity", 
      desc: "Advanced filters remove noise, highlighting the PRs that truly need your team's expertise.",
      icon: "🛡️"
    },
    { 
      title: "Unified Analytics", 
      desc: "Move beyond counts. Visualize your team's code review velocity and identify bottlenecks.",
      icon: "📊"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-32 px-6 bg-[#F3F7FA]">
      <div className="max-w-7xl mx-auto">
        {/* Core Pillars */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-40"
        >
          {pillars.map((p, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="card-ios p-10"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-2xl mb-8 flex items-center justify-center text-2xl shadow-lg shadow-blue-600/20">
                {p.icon}
              </div>
              <h3 className="text-2xl font-black text-gray-950 mb-4 tracking-tight">{p.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Narrative Spotlight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-40 p-12 md:p-24 bg-slate-950 rounded-ios-lg overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-blue-500 font-black text-xs tracking-widest uppercase mb-6 block">The Professional Standard</span>
            <h2 className="text-4xl md:text-6xl text-editorial text-white mb-8">Built for GitHub Authority.</h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed mb-12">
              We don't just track your PRs; we audit your review lifecycle. Direct high-performance integration with GitHub's Search and Issues API ensures your team operates with total transparency and data-driven confidence.
            </p>
            <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/25">
              Read the Whitepaper
            </button>
          </div>
        </motion.div>

        {/* Grounding Trust Seal */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-ios-lg bg-white border border-white shadow-ios-lg p-1"
        >
          <div className="rounded-[39px] bg-white px-12 py-20 md:px-20 flex flex-col md:flex-row items-center gap-16 lg:gap-32">
            <div className="space-y-6 md:w-2/5">
              <h3 className="text-5xl text-editorial text-gray-950 tracking-tighter">Architectural <br /> Integrity</h3>
              <div className="h-1.5 w-12 bg-blue-600 rounded-full" />
              <p className="text-slate-500 font-medium text-lg leading-relaxed">
                Every review cycle is logged, creating an immutable trail of accountability for high-performance engineering cultures.
              </p>
            </div>
            <div className="md:w-3/5 grid sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-black text-xl">✓</div>
                <h4 className="text-xl font-black text-gray-950">Audit-Ready</h4>
                <p className="text-slate-500 font-medium">Compliance-first pipelines built for enterprise-grade review tracking.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 font-black text-xl">∞</div>
                <h4 className="text-xl font-black text-gray-950">Infinite Scale</h4>
                <p className="text-slate-500 font-medium">Built in the open, scaled for thousands of PRs per repository.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
