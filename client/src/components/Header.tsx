import React from "react";

const Header = () => {
  return (
  <div className="mx-6">
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center py-12">

    {/* Headline */}
    <h2 className="text-4xl text-gray-700">Track Your GitHub Pull Requests</h2>

    {/* Description */}
    <p className="max-w-2xl text-gray-600 py-8 text-[18px]">Stay on top of your team's development workflow with our comprehensive PR tracking solution. Moniter open pull requests, review closed ones, and keep your development process running smoothly.</p>

    {/* Buttons */}
    <div className="flex md:flex-row gap-6 flex-col">
      <button className="p-2 px-4 rounded-md bg-black text-white cursor-pointer hover:bg-gray-700 ">View Open PRs</button>
      <button className="border-[0.5px] border-gray-400 p-2 px-4 rounded-md cursor-pointer hover:bg-gray-200">Browse Closed PRs</button>
    </div>
    </div>

  </div>
  );
};

export default Header;
