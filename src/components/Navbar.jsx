import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-500/50 flex items-center justify-around py-5 w-full">
      <div className="logo">
        <h1 className="font-bold text-4xl">
          &lt;Pass<span className="text-sky-600">OP</span>/&gt;
        </h1>
      </div>
      <ul>
        <li className="flex gap-4">
          <a className="font-semibold cursor-pointer">Home</a>
          <a className="font-semibold cursor-pointer">About</a>
          <a className="font-semibold cursor-pointer">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
