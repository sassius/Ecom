import React from "react";
import { MdFacebook } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { GiChestnutLeaf } from "react-icons/gi";
const Footer = () => {
  return (
    <div className=" bg-black">
      <div className="max-w-[1240px] mx-auto flex justify-between w-full bg-black text-white py-10">
        <div className="w-[33%]">
          <img src="/footer-logo.png" alt="logo" className="mb-15" />
          <p className="text-lg font-semibold italic">
            Maecenas mi justo, interdum at consectetur vel, tristique et arcu.
            Ut quis eros blandit, ultrices diam in, elementum ex. Suspendisse
            quis faucibus urna. Suspendisse pellentesque.
          </p>
        </div>
        <div>
          <div>
            <div className="mb-10 text-3xl">Quick Links</div>
            <ul>
              <li>About</li>
              <li>Cart</li>
              <li>Checkout</li>
              <li>Contact</li>
              <li>Home</li>
              <li>My account</li>
              <li>Shop</li>
            </ul>
          </div>
          <div>
            <div className="my-10 text-3xl">Site Links</div>
            <ul>
              <li>Privacy Policy</li>
              <li>Shipping Details</li>
              <li>Offers Coupons</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
        <div className="w-[33%]">
          <div>
            <h5 className="mb-10 text-3xl">Download Our Mobile App</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              aliquam gravida sollicitudin. Praesent porta enim mi, non
              tincidunt libero interdum sit amet.
            </p>
          </div>
          <div>
            <div className="my-10 text-3xl">Quick Links</div>
            <ul>
              <li>Know More About Us</li>
              <li>Visit Store</li>
              <li>Let's Connect</li>
              <li>Locate Stores</li>
            </ul>
            <div className="flex gap-2 mt-4">
              <img src="play-store.png" alt="" className="h-10" />
              <img src="app-store.png" alt="" className="h-10" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-1 border-slate-500 ">
        <div className="text-white max-w-[1240px] flex justify-between items-center mx-auto py-7">
          <p>Copyright © 2025 | Organic Store</p>
          <div className="flex items-center gap-5">
            <GiChestnutLeaf className="link-hover-effect cursor-pointer text-xl" />
            <MdFacebook className="link-hover-effect cursor-pointer text-xl" />
            <FaTwitter className="link-hover-effect cursor-pointer text-xl" />
            <FaInstagram className="link-hover-effect cursor-pointer text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
