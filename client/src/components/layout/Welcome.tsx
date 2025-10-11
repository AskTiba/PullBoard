import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="relative md:py-28 py-20 px-4 overflow-hidden bg-black">
      {/* Subtle background shapes */}
      <span className="absolute top-[-40px] left-[-40px] w-48 h-48 rounded-full opacity-5 bg-gray-800"></span>
      <span className="absolute bottom-[-60px] right-[-60px] w-60 h-60 rounded-full opacity-5 bg-gray-800"></span>

      <div className="max-w-6xl mx-auto flex md:flex-row flex-col justify-between items-center gap-12 relative z-10">
        {/* Text content */}
        <div className="md:w-1/2 flex flex-col gap-10">
          <div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Welcome to PullBoard
            </h3>
            <p className="text-gray-300 text-lg mt-2">
              Your professional GitHub PR tracker.
            </p>
          </div>

          <div className="bg-[#1E1E1E] rounded-xl p-6 shadow-lg border border-gray-800">
            <h4 className="text-2xl font-semibold text-white mb-4 border-l-4 border-gray-600 pl-3">
              What is PullBoard?
            </h4>
            <div className="flex flex-col gap-4 text-gray-300 text-base md:text-lg leading-relaxed">
              <p>
                PullBoard is your team's mission control for GitHub pull
                requests.
              </p>
              <p>
                Get a real-time overview of all open and closed PRs, identify
                bottlenecks, and track progress with clear, actionable insights.
                Never lose track of a review with smart filters.
              </p>
              <p>
                Save time by streamlining workflow, reducing context switching,
                and making code review more efficient and transparent.
              </p>
            </div>

            {/* CTA Button */}
            <Link to="/auth">
              <button className="mt-6 bg-white text-black cursor-pointer py-3 px-6 rounded-lg font-semibold hover:bg-white/80 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 md:block hidden relative">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/github3D.png"
              alt="PullBoard 3D Github"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(1.05)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
