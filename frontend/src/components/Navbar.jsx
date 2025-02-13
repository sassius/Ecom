import React from "react";
import { Link } from "react-router";
import { FaShoppingBasket } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
const Navbar = () => {
  return (
    <div className="max-w-[1440px] mx-auto flex items-center justify-between py-4 bg-[#FFFFFF]">
      <div className="flex items-center gap-10">
        <img src="/logo.svg" alt="logo" className="w-36" />
        <Link to="/shop" className="link-hover-effect">
          Everything
        </Link>
        <Link to="/catagory/groceries" className="link-hover-effect">
          Groceries
        </Link>
        <Link to="/catagory/juice" className="link-hover-effect">
          Juice
        </Link>
      </div>
      <div className="flex items-center gap-10">
        <Link to="/about" className="link-hover-effect">
          About
        </Link>
        <Link to="/contact" className="link-hover-effect">
          Contact
        </Link>
        <div className="flex items-center gap-6">
          <Link className="flex items-center gap-4">
            <span className="font-semibold text-[var(--primary-color)]">
              Rs 35.00
            </span>
            <FaShoppingBasket className="text-xl text-[var(--primary-color)]" />
          </Link>
          <Link>
            <IoPersonSharp className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
