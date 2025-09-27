import React from "react";
import { PBLogo } from "../brand";
import { Docs, Github, Shield } from "../icons";
import { Copyright } from "../ui";
import DateDisplay from "../ui/DateDisplay";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white p-6 text-center md:text-left">
      <div className="max-w-screen-lg mx-auto">
        <section className="mb-8">
          <PBLogo fill="#fff" width={150} className="mx-auto md:mx-0" />
          <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto md:mx-0">
            Streamline your GitHub workflow with comprehensive pull request
            tracking and management
          </p>
        </section>

        <div className="flex flex-col md:flex-row md:justify-between">
          <section className="mb-6 md:mb-0">
            <h3 className="font-bold text-lg mb-3">Our Team</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>@Yusuf - UI/UX Designer</li>
              <li>@Barristan Selmy - Web Developer</li>
              <li>@Klári - Web Developer</li>
              <li>@Naz - Web Developer</li>
              <li>@Anthony - Web Developer</li>
              <li>@Henok - Web Developer</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">Resources</h3>
            <ul className="text-sm text-gray-300 flex flex-col gap-2">
              <li className="flex items-center justify-center md:justify-start">
                <span className="bg-white size-5 rounded-full flex items-center justify-center">
                  <Github />
                </span>
                <a href="#" className="ml-3 hover:underline">
                  View on GitHub
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Docs width={24} fill="#fff" />
                <a href="#" className="ml-2 hover:underline">
                  Documentation
                </a>
              </li>
            </ul>
          </section>
        </div>

        <section className="mt-8 border-t text-white border-gray-700 pt-6">
          <div className="text-xs flex justify-center items-center gap-0.5 ">
            <Copyright width={16} fill="#fff" />
            <p className="">
              <DateDisplay format="YYYY" /> PullBoard. All Rights Reserved.
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
