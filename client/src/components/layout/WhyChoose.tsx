export default function WhyChoose() {
  const CardData = [
    {
      title: "SAVE TIME",
      desc: "Quickly identify PRs that need your attention and streamline your review process.",
      color: "#28a745",
    },
    {
      title: "TEAM COLLABORATION",
      desc: "Keep everyone informed about the status of pull requests and assignments.",
      color: "#6f42c1",
    },
    {
      title: "PROJECT INSIGHTS",
      desc: "Analyze historical data to improve your development workflow and process.",
      color: "#d73a49",
    },
    {
      title: "SECURE AND RELIABLE",
      desc: "Built with security in mind and designed to handle your team's workflow reliably.",
      color: "#000000",
    },
  ];

  return (
    <section className="relative py-10 px-6 md:px-20 bg-[#F3F7FA] overflow-hidden">
      {/* Subtle decorative circles for depth */}
      <span className="absolute top-[-80px] left-[-60px] w-60 h-60 rounded-full bg-[#28a745]/10"></span>
      <span className="absolute bottom-[-60px] right-[-40px] w-48 h-48 rounded-full bg-[#6f42c1]/10"></span>

      <div className="max-w-6xl mx-auto flex md:flex-row flex-col justify-between gap-10 items-start">
        {/* Left Column: Text + Cards */}
        <div className="lg:w-[55%] md:w-[50%] flex flex-col gap-10">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Why choose <span className="text-[#6f42c1]">PullBoard</span>?
          </h3>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            {CardData.map((card, idx) => (
              <div
                key={idx}
                className="relative bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2"
              >
                {/* Accent Badge */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-3"
                  style={{ backgroundColor: card.color }}
                >
                  {card.title}
                </span>

                <p className="text-gray-700 leading-relaxed">{card.desc}</p>

                {/* Optional subtle floating circle behind card */}
                <span
                  className="absolute -top-6 -right-6 w-12 h-12 rounded-full opacity-20"
                  style={{ backgroundColor: card.color }}
                ></span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="lg:w-[45%] md:block hidden relative">
          <img
            src="/PR.png"
            alt="Pull Requests"
            className="w-full h-full object-cover rounded-3xl shadow-lg grayscale brightness-90"
          />
        </div>
      </div>
    </section>
  );
}
