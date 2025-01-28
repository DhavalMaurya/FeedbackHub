import React, { useContext, useEffect, useState } from "react";
import Diagram from "../Components/Core/Dashboard/Diagram";

import { HiOutlineMail } from "react-icons/hi";
import {FaComments, } from "react-icons/fa";
import { getFeedbackSummary } from "../service/operations/feedbacks";
import FeedbackTable from "../Components/Core/Dashboard/FeedbackTabel";
import { UserContext } from "../Context/User";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const {token} = useContext(UserContext)
  
  const getFeedbackData = async () => {
    const response = await getFeedbackSummary(token);
    if (!response) {
      console.log("Error fetching data");
    }
    console.log(response);
    setDashboardData(response);
  };

  useEffect(() => {
    getFeedbackData();
  }, []);

  return (
    <div className="px-5  py-3 bg-[#ececec]">
      <h1 className="text-3xl  pb-5 font-bold">
        Cutomer feedback Dashboard
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-black">
            <p className="text-xl font-bold">Total Feedbacks</p>
            <p className="text-lg">{dashboardData?.totalFeedbacks}</p>
          </div>
          <FaComments className="text-blue-500 text-4xl" />
        </div>
      </div>
      <div className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold">Feedback Summary</p>
            <HiOutlineMail className="text-gray-500 text-3xl" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Summary 1: Positive Feedback */}
            {
              dashboardData?.feedbacksByRating?.map((elem)=>(
                <div key={elem._id} className={`${elem._id === "positive" ? "bg-green-100" : elem._id === "negative" ? "bg-red-100" : "bg-yellow-100" }  p-4 rounded-lg shadow-md`}>
                <p className="font-semibold">{elem._id} Feedback</p>
                <p className="text-lg">{elem.totalFeedbacks}</p>
              </div>
              ))
            }
          </div>
        </div>
      </div>
      <Diagram />
      <FeedbackTable />
    </div>
  );
};

export default Dashboard;
