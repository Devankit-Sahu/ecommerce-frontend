import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="container mx-auto 2xl:px-40 px-5">
      <h1 className="text-center">ECommerce</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 border-y-[1px] border-solid border-y-[rgb(224,224,224)]">
        <div className="p-10">
          <h2>About Us</h2>
          <p className="text-[#9A9A9A]">
            We know there are a lot of threa developers our but we pride into a
            firm in the industry.
          </p>
        </div>
        <div className="p-10">
          <h2>Feature</h2>
          <div className="flex flex-col text-[#9A9A9A]">
            <Link to="/">About us</Link>
            <Link to="/">Terms & Conditions</Link>
            <Link to="/">Best Products</Link>
          </div>
        </div>
        <div className="p-10">
          <h2>Contact</h2>
          <input
            type="text"
            name=""
            id=""
            className="w-full border-none outline-none bg-[rgb(239,239,239)] h-[40px] px-3"
            placeholder="Send Message"
          />
        </div>
      </div>
      <div className="flex gap-5 py-3">
        <p className='cursor-pointer'>Facebook</p>
        <p className='cursor-pointer'>Twitter</p>
        <p className='cursor-pointer'>Instagram</p>
        <p>
          ©2024 <span className='text-black font-medium'>Devankit</span> All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;