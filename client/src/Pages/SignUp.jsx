import React, { useState } from 'react'
import { signUp } from '../service/operations/auth';
import {useNavigate} from "react-router-dom"

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role : "Client"
      });
    const navigate = useNavigate();
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        const response = await signUp(formData ,navigate);
        console.log(response);
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-50"
                  required
                />
              </div>
    
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-50"
                  required
                />
              </div>
    
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-50"
                  required
                />
              </div>
    
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-gray-50"
                  required
                />
              </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      );
}

export default SignUp