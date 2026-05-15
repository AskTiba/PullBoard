import React from "react";
import { Copyright } from "../ui";
import { Github } from "../icons";
import { PBLogo } from "../brand";
import GitHub from "../icons/github";
import LinkedIn from "../icons/linkedIn";

const Footer: React.FC = () => {
  const developers = {
    "Development Team": [
      { name: "Tibamwenda Anthony", linkedIn: "#", github: "https://github.com/AskTiba" },
      { name: "Nazeeha Khalil Ahmed", linkedIn: "#", github: "https://github.com/nazeeha-kb" },
      { name: "Banto Klára", linkedIn: "#", github: "https://github.com/bantoklara" },
      { name: "Henok Hailemariam", linkedIn: "#", github: "https://github.com/henokkhm" },
      { name: "Mohamed Ouederni", linkedIn: "#", github: "https://github.com/9-barristanselmy-9" },
      { name: "Yusuf Mohsen", linkedIn: "#", github: "https://github.com/yusufmohsiin" },
    ],
  };

  return (
    <footer className="bg-pb-text text-white py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <PBLogo width={160} fill="white" />
          <p className="max-w-xs text-white/60 font-medium leading-relaxed">
            PullBoard is the definitive mission control for GitHub pull requests, 
            built for high-performance development teams.
          </p>
        </div>

        {/* Team */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">The Architects</h4>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {developers["Development Team"].map((person) => (
              <div key={person.name} className="flex items-center justify-between gap-8">
                <span className="font-bold text-lg text-white">{person.name}</span>
                <div className="flex gap-4">
                  <a href={person.linkedIn} className="text-white/60 hover:text-white transition-colors"><LinkedIn width={18} /></a>
                  <a href={person.github} className="text-white/60 hover:text-white transition-colors"><GitHub width={18} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-white/60">
        <div className="flex items-center gap-2">
          <Copyright width={18} fill="white" />
          <span className="text-white">2026 PullBoard. All Rights Reserved.</span>
        </div>
        <a href="https://github.com/chingu-voyages/V57-tier3-team-33" className="flex items-center gap-2 hover:text-blue-400">
          <Github width={18} fill="white" />
          <span className="text-white">Voyage 57 • Tier 3 • Team 33</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
