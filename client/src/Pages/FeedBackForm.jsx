import React, { useContext, useEffect, useState } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { submitFeedback } from "../service/operations/feedbacks";
import { UserContext } from "../Context/User";
import { useNavigate } from "react-router-dom";
const FeedBackForm = () => {
  const { token , userData } = useContext(UserContext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    rating: 0,
    priority: "",
    category: "",
    description: "",
    feedbackType : "",
  });

  useEffect(() => {
    const feedbackType =
      formData.rating > 3
        ? "positive"
        : formData.rating < 3
        ? "negative"
        : formData.rating === 3
        ? "neutral"
        : "";
    setFormData((prev) => ({ ...prev, feedbackType }));
  }, [formData.rating]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, token : token };
    const response = await submitFeedback(data , navigate);
    if (!response.success) {
      return console.log("Something went wrong");
    }
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="text-2xl font-semibold text-center">Give your Feedback</h1>
      <p className="text-center">
        We would love to hear your thoughts, suggestions, concerns or problems
        with anything so we can improve!
      </p>
      <div>
        <form
          action=""
          onSubmit={(e) => {
            handleOnSubmit(e);
          }}
          className="w-full max-w-md mx-auto p-5 bg-white shadow-xl rounded-md flex flex-col gap-4 "
        >
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Category Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-gray-700 font-medium">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={(e) => {
                handleOnChange(e);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="" disabled>Select Feedback type</option>
              <option value="Product">Product Feedback</option>
              <option value="Service">Service Feedback</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Priority Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="priority" className="text-gray-700 font-medium">
              Priority
            </label>
            <select
              name="priority"
              id="priority"
              value={formData.priority}
              onChange={(e) => {
                handleOnChange(e);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="" disabled>Select Feedback priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="w-40 flex flex-col gap-1">
            <label htmlFor="priority" className="text-gray-700 font-medium">
              Rating
            </label>
            <Rating
              itemStyles={{
                itemShapes: RoundedStar,
                activeFillColor: "#ffb700",
                inactiveFillColor: "#fbf1a9",
              }}
              name="rating"
              value={formData.rating}
              onChange={(value) => {
                setFormData({ ...formData, rating: value });
              }}
              className="size-7"
            />
          </div>

          {/* Feedback Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="feedback" className="text-gray-700 font-medium">
              Feedback
            </label>
            <textarea
              name="description"
              id="description"
              rows="5"
              placeholder="Share your feedback here..."
              value={formData.description}
              onChange={(e) => {
                handleOnChange(e);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedBackForm;
