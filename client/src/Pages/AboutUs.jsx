import React from "react";
import { FaArrowRight } from "react-icons/fa";
import about from "../assets/about.png"

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 text-gray-800">
          About <span className="text-blue-600">FeedbackHub</span>
        </h1>
        
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image Section */}
          <div className="w-full md:w-1/2 group">
            <img
              src={about}
              alt="About Us"
              className="rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
              Welcome to <span className="font-bold text-blue-600">FeedbackHub</span>, 
              the ultimate platform for empowering innovation through meaningful 
              feedback. We believe in creating a space where voices are heard, 
              and ideas are transformed into impactful solutions.
            </p>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
              Whether you're a customer, creator, or entrepreneur, your feedback 
              matters. Together, we shape the future by fostering collaboration, 
              transparency, and growth.
            </p>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
              Join us on this journey and be a part of the change you want to see!
            </p>
            
            <div className="flex justify-center md:justify-start">
              <button className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                Learn More
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;