import { GitPR } from "../icons";
import Timer from "../ui/timer";
import Filter from "../icons/filter";

export default function KeyFeatures() {
  const cardData = [
    {
      icon: <GitPR className="size-6 text-white" />,
      title: "Open PR Tracking",
      description:
        "Monitor all open pull requests with detailed information including reviewers, creation dates and last actions.",
      color: "#28a745",
    },
    {
      icon: <Timer className="size-6 text-white" />,
      title: "Historical Data",
      description:
        "Access comprehensive records of all closed and merged pull requests for project insights.",
      color: "#6f42c1",
    },
    {
      icon: <Filter className="size-6 text-white" />,
      title: "Advanced Filtering",
      description:
        "Filter results by team members, dates, and other criteria to find exactly what you need.",
      color: "#d73a49",
    },
  ];

  return (
    <main className="relative md:pt-32 pt-24 pb-20 px-6 bg-[#F3F7FA] overflow-hidden">
      {/* Background floating blobs */}
      <span
        className="absolute top-[-50px] left-[-50px] w-48 h-48 rounded-full opacity-20 animate-pulse-slow"
        style={{ backgroundColor: "#28a745" }}
      ></span>
      <span
        className="absolute bottom-[-40px] right-[-40px] w-60 h-60 rounded-full opacity-20 animate-pulse-slow"
        style={{ backgroundColor: "#6f42c1" }}
      ></span>
      <span
        className="absolute top-1/2 left-[80%] w-32 h-32 rounded-full opacity-20 animate-pulse-slow"
        style={{ backgroundColor: "#d73a49" }}
      ></span>

      <div className="max-w-screen-lg mx-auto relative z-10">
        {/* Section Title with subtle gradient */}
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#6f42c1] via-[#28a745] to-[#d73a49]">
          Key Features
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map((card, idx) => (
            <section
              key={idx}
              className="relative bg-white p-8 rounded-3xl shadow-lg border-[0.5px] border-gray-200
                flex flex-col items-start gap-6 transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Icon floating inside colored circle */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <span
                  className="absolute size-12 rounded-full opacity-20 animate-pulse-slow"
                  style={{ backgroundColor: card.color }}
                ></span>
                <div className="relative animate-float">{card.icon}</div>
              </div>

              {/* Badge */}
              <div
                className="inline-block px-3 py-1 rounded-full font-semibold text-white text-sm"
                style={{ backgroundColor: card.color }}
              >
                {card.title.toUpperCase()}
              </div>

              {/* Description */}
              <p className="text-gray-700">{card.description}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
