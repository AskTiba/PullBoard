import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-x-hidden overflow-y-clip bg-[#F3F7FA]">
      {/* Floating abstract shapes (opposite corners of images) */}
      <span className="absolute top-[-40px] right-[-40px] w-48 h-48 rounded-full bg-[#28a745] opacity-20 animate-pulse-slow animate-float-slow"></span>
      <span className="absolute bottom-[-50px] left-[-50px] w-60 h-60 rounded-full bg-[#6f42c1] opacity-20 animate-pulse-slow animate-float-slow"></span>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 sm:px-10">
        <div className="max-w-4xl flex flex-col gap-6">
          {/* Headline */}
          <h1 className="md:text-6xl sm:text-5xl text-4xl font-extrabold text-gray-900 leading-tight">
            Track Your GitHub Pull Requests
          </h1>

          {/* Description */}
          <p className="text-gray-700 md:text-lg text-base leading-relaxed">
            Stay on top of your team's development workflow with our
            comprehensive PR tracking solution. Monitor open pull requests,
            review closed ones, and keep your development process running
            smoothly.
          </p>

          {/* CTA Buttons */}
          <div className="flex md:flex-row gap-6 flex-col justify-center mt-6">
            <Link to="/open-prs">
              <button className="bg-black hover:bg-black/85 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all transform hover:-translate-y-1">
                View Open PRs
              </button>
            </Link>
            <Link to="/closed-prs">
              <button className="border border-gray-400 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-xl transition-all transform hover:-translate-y-1">
                Browse Closed PRs
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating cube images */}
      <div className="absolute inset-0 z-0">
        <img
          src="/cube.png"
          alt=""
          className="lg:block hidden w-1/4 h-1/2 absolute top-10 left-[-60px] animate-[pulse_4s_ease-in-out_infinite]"
        />
        <img
          src="/cube.png"
          alt=""
          className="lg:block hidden w-1/4 h-1/2 absolute bottom-0 right-[-60px] animate-[pulse_4s_ease-in-out_infinite_2s]"
        />
      </div>
    </section>
  );
};

export default Hero;
