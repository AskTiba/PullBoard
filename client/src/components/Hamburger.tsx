"use client";
import React, { useState } from "react";
import Hamburger from "hamburger-react";

const HamburgerComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="text-gray-600">
        <Hamburger size={24} toggled={open} toggle={setOpen} />
      </div>
      {open && (
        <div>
          <div className="absolute right-4 top-14 bg-white border-[0.5px] border-gray-400 p-6 flex flex-col gap-2 rounded-sm">
            <div className="cursor-pointer text-gray-600 text-[16px] hover:text-gray-800">
              Home
            </div>
            <div className="cursor-pointer text-gray-600 text-[16px] hover:text-gray-800">
              Open PRs
            </div>
            <div className="cursor-pointer text-gray-600 text-[16px] hover:text-gray-800">
              Closed PRs
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerComponent;
