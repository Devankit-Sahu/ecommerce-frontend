import { Avatar, Rating } from "@mui/material";
import React from "react";

const ProductReviews = () => {
  return (
    <div className="flex">
      <div className="w-[70%]">
        <ul className="reviews-list">
          <li className="flex gap-8 items-center py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni est
              debitis tempore in eum eius? Ipsa pariatur natus molestiae ad
              reiciendis quis, ipsum, exercitationem similique voluptatem
              voluptatum ut est velit?
            </p>
          </li>
          <li className="flex gap-8 items-center py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni est
              debitis tempore in eum eius? Ipsa pariatur natus molestiae ad
              reiciendis quis, ipsum, exercitationem similique voluptatem
              voluptatum ut est velit?
            </p>
          </li>
          <li className="flex gap-8 items-center py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni est
              debitis tempore in eum eius? Ipsa pariatur natus molestiae ad
              reiciendis quis, ipsum, exercitationem similique voluptatem
              voluptatum ut est velit?
            </p>
          </li>
          <li className="flex gap-8 items-center py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni est
              debitis tempore in eum eius? Ipsa pariatur natus molestiae ad
              reiciendis quis, ipsum, exercitationem similique voluptatem
              voluptatum ut est velit?
            </p>
          </li>
          <li className="flex gap-8 items-center py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni est
              debitis tempore in eum eius? Ipsa pariatur natus molestiae ad
              reiciendis quis, ipsum, exercitationem similique voluptatem
              voluptatum ut est velit?
            </p>
          </li>
          <li className="flex gap-8 items-center py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni est
              debitis tempore in eum eius? Ipsa pariatur natus molestiae ad
              reiciendis quis, ipsum, exercitationem similique voluptatem
              voluptatum ut est velit?
            </p>
          </li>
          <li className="flex gap-8 items-center py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni est
              debitis tempore in eum eius? Ipsa pariatur natus molestiae ad
              reiciendis quis, ipsum, exercitationem similique voluptatem
              voluptatum ut est velit?
            </p>
          </li>
          <li className="flex gap-8 items-center py-3 border-b border-solid border-b-gray-300 mb-2">
            <Avatar />
            <div>
              <p className="capitalize font-bold text-xl">name</p>
              <p className="flex">
                <Rating readOnly />
              </p>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni est
              debitis tempore in eum eius? Ipsa pariatur natus molestiae ad
              reiciendis quis, ipsum, exercitationem similique voluptatem
              voluptatum ut est velit?
            </p>
          </li>
        </ul>
      </div>
      <div className="w-[30%] p-10">
        <textarea
          name=""
          id=""
          className="w-full outline-none focus:border focus:border-solid focus:border-sky-500 rounded-2xl p-2"
          rows="3"
        ></textarea>
        <div className="my-3">
          <Rating />
        </div>
        <button className="w-full py-3 bg-sky-400 rounded-2xl text-white capitalize text-lg mt-3">
          add review
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;
