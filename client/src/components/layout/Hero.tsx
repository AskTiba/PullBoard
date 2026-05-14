import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-hestia-bg to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] opacity-20 blur-[120px] bg-blue-600 rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] opacity-15 blur-[100px] bg-purple-500 rounded-full animate-pulse delay-1000" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white shadow-sm text-[13px] font-black text-blue-700 tracking-widest uppercase">
            GitHub Management, Evolved
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-950 leading-[0.95]">
            Velocity, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-500">
              In Every PR.
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-xl text-slate-700 font-medium leading-relaxed">
            PullBoard is your team's mission control for seamless code review. 
            Monitor activity, identify bottlenecks, and maintain high-fidelity 
            development velocity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/open-prs" className="group relative px-10 py-5 bg-gray-950 text-white rounded-3xl font-black text-lg shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
              Launch Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;