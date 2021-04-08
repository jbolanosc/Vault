import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="px-16 bg-white flex flex-wrap items-center lg:py-0 py-2">
      <div className="lg:p-2 py-1 flex-1 flex justify-between items-center">
        <Link to="/">
          <h3 className="text-teal-700 text-xl text-center font-bold">
            Vault Warehouses
          </h3>
        </Link>
      </div>
      <label className="cursor-pointer lg:hidden block" htmlFor="menu-toggle">
        <i className="fa fa-bars" aria-hidden="true"></i>
      </label>
      <input type="checkbox" className="hidden" id="menu-toggle" />
      <div
        className="hidden lg:flex lg:items-center lg:w-auto w-full"
        id="menu"
      >
        <nav>
          <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
            <li>
              <Link
                to="/warehouses"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:text-blue-300 font-bold"
              >
                Warehouses
              </Link>
            </li>
            <li>
              <Link
                to="/storages"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:text-blue-300 font-bold"
              >
                Storages
              </Link>
            </li>
            <li>
              <Link
                to="/agents"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:text-blue-300 font-bold"
              >
                Agents
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:text-blue-300 font-bold"
              >
                Services
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
