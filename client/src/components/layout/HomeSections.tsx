export default function HomeSections() {
  const pillars = [
    { title: "Zero-Latency Tracking", desc: "Stop waiting for syncs. Our Hestia-powered engine fetches your GitHub data in milliseconds." },
    { title: "Workflow Integrity", desc: "Advanced filters remove noise, highlighting the PRs that truly need your team's expertise." },
    { title: "Unified Analytics", desc: "Move beyond counts. Visualize your team's code review velocity and identify bottlenecks." },
  ];

  return (
    <section className="py-32 px-6 bg-hestia-bg">
      <div className="max-w-7xl mx-auto">
        {/* Core Pillars */}
        <div className="grid md:grid-cols-3 gap-10 mb-32">
          {pillars.map((p, i) => (
            <div key={i} className="group p-10 bg-white rounded-[40px] border border-white shadow-ios hover:shadow-ios-lg transition-all duration-500">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl mb-8 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-600/20">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-2xl font-black text-gray-950 mb-4 tracking-tight">{p.title}</h3>
              <p className="text-slate-700 font-medium leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Narrative Spotlight */}
        <div className="relative mb-32 p-16 bg-slate-950 rounded-[48px] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl font-black text-white mb-8 tracking-tight">Built for GitHub Authority.</h2>
            <p className="text-xl text-slate-300 font-medium leading-relaxed mb-10">
              We don't just track your PRs; we audit your review lifecycle. Direct high-performance integration with GitHub's Search and Issues API ensures your team operates with total transparency and data-driven confidence.
            </p>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors">
              Read the Technical Whitepaper
            </button>
          </div>
        </div>

        {/* Grounding Trust Seal */}
        <div className="relative rounded-[48px] bg-gradient-to-br from-blue-900 to-slate-950 p-1">
          <div className="rounded-[47px] bg-slate-950 px-16 py-20 flex flex-col md:flex-row items-center gap-16">
            <div className="space-y-4 md:w-1/3">
              <h3 className="text-4xl font-black text-white tracking-tight">Architectural Integrity</h3>
              <p className="text-blue-400 font-bold uppercase text-xs tracking-widest">Built to be trusted</p>
            </div>
            <div className="md:w-2/3 grid md:grid-cols-2 gap-12">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4 text-blue-400 font-black">✓</div>
                <h4 className="text-lg font-black text-white">Audit-Ready Pipelines</h4>
                <p className="text-slate-400 font-medium">Every review cycle is logged, creating an immutable trail of accountability.</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4 text-purple-400 font-black">∞</div>
                <h4 className="text-lg font-black text-white">Built in the Open</h4>
                <p className="text-slate-400 font-medium">PullBoard thrives on transparency. Join our public roadmap and contribute.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
