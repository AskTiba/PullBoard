import { Shield, Team } from "../icons";
import { Chart, Clock } from "../ui";

export default function WhyChoose() {
  const reasons = [
    {
      icon: <Clock width={24} />,
      title: "Save Time",
      description:
        "Quickly identify PRs that need attention and streamline your preview process.",
    },
    {
      icon: <Team width={24} />,
      title: "Team Collaboration",
      description:
        "Foster seamless teamwork with integrated tools for discussions, feedback, and approvals.",
    },
    {
      icon: <Chart width={24} />,
      title: "Project Insights",
      description:
        "Gain valuable insights into your project's progress and team performance with intuitive dashboards.",
    },
    {
      icon: <Shield width={24} />,
      title: "Secure and Reliable",
      description:
        "Ensure your codebase remains secure with robust checks and a reliable, stable platform.",
    },
  ];

  return (
    <main className="py-20 px-6">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-3">
          Why Choose PullBoard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {reasons.map((reason, index) => (
            <section key={index} className="p-6 text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-100 p-2 w-fit rounded-lg">
                  {reason.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-800 ">
                  {reason.title}
                </h3>
              </div>
              <p className="text-gray-600">{reason.description}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
