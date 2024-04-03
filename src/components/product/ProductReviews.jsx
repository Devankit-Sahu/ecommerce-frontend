import React from "react";
import { Avatar, Rating } from "@mui/material";

const ProductReviews = () => {
  return (
    <div className="block md:flex">
      <div className="w-full md:w-[70%]">
        <ul className="reviews-list">
          <li className="flex gap-4 md:gap-6 items-start py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                est debitis tempore in eum eius? Ipsa pariatur natus molestiae
                ad reiciendis quis, ipsum, exercitationem similique voluptatem
                voluptatum ut est velit?
              </p>
            </div>
          </li>
          <li className="flex gap-4 md:gap-6 items-start py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                est debitis tempore in eum eius? Ipsa pariatur natus molestiae
                ad reiciendis quis, ipsum, exercitationem similique voluptatem
                voluptatum ut est velit?
              </p>
            </div>
          </li>
          <li className="flex gap-4 md:gap-6 items-start py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                est debitis tempore in eum eius? Ipsa pariatur natus molestiae
                ad reiciendis quis, ipsum, exercitationem similique voluptatem
                voluptatum ut est velit?
              </p>
            </div>
          </li>
          <li className="flex gap-4 md:gap-6 items-start py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                est debitis tempore in eum eius? Ipsa pariatur natus molestiae
                ad reiciendis quis, ipsum, exercitationem similique voluptatem
                voluptatum ut est velit?
              </p>
            </div>
          </li>
          <li className="flex gap-4 md:gap-6 items-start py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                est debitis tempore in eum eius? Ipsa pariatur natus molestiae
                ad reiciendis quis, ipsum, exercitationem similique voluptatem
                voluptatum ut est velit?
              </p>
            </div>
          </li>
          <li className="flex gap-4 md:gap-6 items-start py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                est debitis tempore in eum eius? Ipsa pariatur natus molestiae
                ad reiciendis quis, ipsum, exercitationem similique voluptatem
                voluptatum ut est velit?
              </p>
            </div>
          </li>
          <li className="flex gap-4 md:gap-6 items-start py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                est debitis tempore in eum eius? Ipsa pariatur natus molestiae
                ad reiciendis quis, ipsum, exercitationem similique voluptatem
                voluptatum ut est velit?
              </p>
            </div>
          </li>
          <li className="flex gap-4 md:gap-6 items-start py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                est debitis tempore in eum eius? Ipsa pariatur natus molestiae
                ad reiciendis quis, ipsum, exercitationem similique voluptatem
                voluptatum ut est velit?
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="w-full md:w-[30%] p-10">
        <textarea
          name=""
          id=""
          className="w-full outline-none border border-solid border-slate-300 rounded p-2"
          rows="3"
        ></textarea>
        <div className="my-3">
          <Rating />
        </div>
        <button className="w-full py-3 bg-[rgba(1,159,127,1)] rounded text-white capitalize text-lg mt-3">
          add review
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;
