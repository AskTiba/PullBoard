import { GitPR } from "../icons";
import Timer from "../ui/timer"; // New import
import Filter from "../icons/filter"; // New import

export default function KeyFeatures() {
  const cardData = [
    {
      icon: <GitPR />,
      title: "Open PR Tracking",
      description:
        "Monitor all open pull requests with detailed information including reviewers, creation dates and last actions.",
    },
    {
      icon: <Timer />,
      title: "SLA & Deadline Tracking",
      description:
        "Ensure pull requests are reviewed on time by setting and tracking Service Level Agreement (SLA) deadlines.",
    },
    {
      icon: <Filter />,
      title: "Customizable Filters",
      description:
        "Create and save custom filters to quickly find the pull requests that need your attention.",
    },
  ];

  return (
    <main className=" py-20 px-6">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <section
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg text-left transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="bg-gray-400 w-fit p-1 rounded-lg mb-6">
                {card.icon}
              </div>
              <h3 className="font-bold text-xl mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
