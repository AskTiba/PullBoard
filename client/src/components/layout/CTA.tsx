import { Github } from "../icons";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  const handleConnectClick = () => {
    navigate("/auth");
  };

  return (
    <section className="relative py-10 md:py-40 px-6 md:px-20 bg-[#F3F7FA]">
      <div className="bg-white p-10 md:p-16 rounded-2xl shadow-lg w-full relative overflow-hidden">
        {/* Decorative Accent Circle */}
        <span className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full bg-[#6f42c1]/10"></span>
        <span className="absolute bottom-[-30px] left-[-30px] w-32 h-32 rounded-full bg-[#28a745]/10"></span>

        {/* Badge */}
        <div
          className="inline-block mb-4 px-3 py-1 rounded-full font-semibold text-white"
          style={{ backgroundColor: "#28a745" }}
        >
          Quick Setup
        </div>

        {/* Heading */}
        <h2 className="text-gray-900 lg:text-6xl md:text-5xl text-4xl pt-4 pb-10 font-bold leading-tight">
          Connect your <span className="text-[#6f42c1]">GitHub</span> repository
        </h2>

        {/* CTA Button */}
        <button
          className="flex items-center cursor-pointer gap-3 bg-gray-900 text-white font-medium py-3 px-5 rounded-full shadow-md hover:shadow-lg hover:bg-gray-800 active:scale-[0.97] transition-all"
          onClick={handleConnectClick}
        >
          <Github className="w-5 h-5" />
          <span>Connect repository</span>
        </button>
      </div>
    </section>
  );
};

export default CTA;
