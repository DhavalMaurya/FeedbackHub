import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Diagram = () => {
  // Provided feedback data
  const feedbackData = [
    {
      "_id": "2025-01-17",
      "count": 5,
      "feedbacks": [
        {"category": "Product", "rating": 1, "feedbackType": "negative"},
        {"category": "Service", "rating": 4, "feedbackType": "positive"},
        {"category": "Service", "rating": 2, "feedbackType": "negative"},
        {"category": "Product", "rating": 5, "feedbackType": "positive"},
        {"category": "Service", "rating": 3, "feedbackType": "neutral"}
      ]
    }
    // {
    //   "_id": "2025-01-24",
    //   "count": 1,
    //   "feedbacks": [
    //     {"category": "Product", "rating": 4, "feedbackType": "positive"}
    //   ]
    // },
    // {
    //   "_id": "2025-01-26",
    //   "count": 3,
    //   "feedbacks": [
    //     {"category": "Service", "rating": 4, "feedbackType": "positive"},
    //     {"category": "Product", "rating": 3, "feedbackType": "neutral"},
    //     {"category": "Others", "rating": 3, "feedbackType": "neutral"}
    //   ]
    // }
  ];

  // Process data for chart
  const processedData = {
    dates: feedbackData.map(item => item._id),
    totalFeedbacks: feedbackData.map(item => item.count),
    categoryBreakdown: {
      Product: feedbackData.map(item => 
        item.feedbacks.filter(f => f.category === "Product").length
      ),
      Service: feedbackData.map(item => 
        item.feedbacks.filter(f => f.category === "Service").length
      ),
      Others: feedbackData.map(item => 
        item.feedbacks.filter(f => f.category === "Others").length
      )
    }
  };

  const data = {
    labels: processedData.dates,
    datasets: [
      {
        label: "Product Feedback",
        data: processedData.categoryBreakdown.Product,
        backgroundColor: "rgba(70, 130, 180, 0.7)",
        stack: "Stack 0",
      },
      {
        label: "Service Feedback",
        data: processedData.categoryBreakdown.Service,
        backgroundColor: "rgba(34, 139, 34, 0.7)",
        stack: "Stack 0",
      },
      {
        label: "Other Feedback",
        data: processedData.categoryBreakdown.Others,
        backgroundColor: "rgba(255, 165, 0, 0.7)",
        stack: "Stack 0",
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Feedback Categories by Date",
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Number of Feedbacks'
        }
      }
    }
  };

  return (
   <div className="bg-white">
     <Box sx={{ height: "500px", width: "100%" }}>
      <Bar data={data} options={options} />
    </Box>
   </div>
  );
};

export default Diagram;