import React, { useState } from "react";
import { Avatar, Rating } from "@mui/material";
import { useCreateReviewMutation } from "../../redux/api/product-api";

const ProductReviews = ({ productId, reviews, refetchProduct }) => {
  const [ratings, setRatings] = useState(0);
  const [message, setMessage] = useState("");
  const [createReview] = useCreateReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !productId) return;
    await createReview({ productId, ratings, message });
    setRatings(0);
    setMessage("");
    refetchProduct();
  };

  return (
    <div className="block md:flex">
      <div className="w-full md:w-[70%]">
        <h3>
          Total reviews : <span>{reviews.length}</span>
        </h3>
        {reviews.length > 0 && (
          <ul className="reviews-list">
            {reviews?.map((review) => (
              <li
                key={review._id}
                className="flex gap-4 md:gap-6 items-start py-3 border-b border-solid border-b-gray-300 mb-2"
              >
                <Avatar src={review.user.avatar.url} />
                <div>
                  <p className="capitalize font-bold text-xl">
                    {review.user.name}
                  </p>
                  <p className="flex">
                    <Rating value={review.ratings} readOnly />
                  </p>
                  <p className="text-sm">{review.message}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={handleSubmit} className="w-full md:w-[30%] p-10">
        <textarea
          className="w-full outline-none border border-solid border-slate-300 rounded p-2"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="my-3">
          <Rating
            value={ratings}
            onChange={(event, newValue) => {
              setRatings(newValue);
            }}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[rgba(1,159,127,1)] rounded text-white capitalize text-lg mt-3"
        >
          add review
        </button>
      </form>
    </div>
  );
};

export default ProductReviews;
