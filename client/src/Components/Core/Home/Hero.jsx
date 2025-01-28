import React, { useContext } from "react";
import { 
  FaRocket, 
  FaLightbulb, 
  FaChevronRight 
} from "react-icons/fa";
import image from "../../../assets/Hero.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../../Context/User";

const HeroSection = () => {
  const { token} = useContext(UserContext);
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen flex items-center py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center gap-3 text-purple-700">
            <FaRocket className="text-2xl animate-pulse" />
            <span className="font-semibold text-sm md:text-base">
              Innovative Feedback Platform
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Transform Ideas
            <br />
            <span className="text-purple-700">Through Powerful Insights</span>
          </h1>
          
          <p className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed">
            Revolutionize your product development by capturing, analyzing, and implementing user feedback with unprecedented precision.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
           <Link to={token ? "/feedback-form" : "/login"}>
           <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-md">
              Share Feedback
              <FaChevronRight className="text-lg" />
            </button>
           </Link>
            <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition flex items-center justify-center gap-2">
              Explore Features
              <FaLightbulb className="text-lg" />
            </button>
          </div>
        </div>
        
        <div className="relative group">
          <img 
            src={image}
            alt="Feedback Visualization"
            className="w-full rounded-xl shadow-2xl transform transition duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <FaLightbulb className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Real-Time Insights</h3>
                <p className="text-xs text-gray-600">Instant feedback analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;