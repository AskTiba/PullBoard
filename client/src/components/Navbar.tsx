import React from "react";
import PBLogo from "./brand/PBLogo";
import DateDisplay from "./ui/DateDisplay";
import HamburgerComponent from "./Hamburger";

const Navbar = () => {
  return (
    <div className="border-b-[0.5px] border-gray-300 py-2 px-4 ">
      <div className="flex justify-between max-w-7xl mx-auto items-center relative">
        {/* logo and app name*/}
        <div className="flex items-center gap-2 cursor-pointer">
          <PBLogo fill="#fff" width={55} className="" />
          <div className="text-2xl text-gray-600 font-semibold">Pull Board</div>
        </div>

        {/* Navigation */}
        <div className="block md:hidden">
        <HamburgerComponent />
        </div>
        <div className="md:flex items-center gap-2 hidden">
          <DateDisplay
            format="Month Do, YYYY"
            className="text-gray-400 absolute right-70"
          />

          {/* Using hamburger-react icons */}
          <div className="cursor-pointer text-gray-600 text-[16px] hover:bg-gray-100 p-2 hover:rounded-md">
            Home
          </div>
          <div className="cursor-pointer text-gray-600 text-[16px] hover:bg-gray-100 p-2 hover:rounded-md">
            Open PRs
          </div>
          <div className="cursor-pointer text-gray-600 text-[16px] hover:bg-gray-100 p-2 hover:rounded-md">
            Closed PRs
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
