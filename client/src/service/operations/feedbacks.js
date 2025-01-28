import { apiConnector } from "../apiConnector"
import { toast } from "react-toastify"

export const submitFeedback = async (data , navigate) => {
    try {
        const response = await apiConnector("POST", "http://localhost:5000/api/feedback/submit", data)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success(response.data.message);
        navigate("/")
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Error submitting feedback", error }
    }
}

export const getFeedbackSummary = async (token) => {
    try {
        const response = await apiConnector("GET", "http://localhost:5000/api/feedback/getFeedbackSummary", { token });

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Error getting feedback summary", error }
    }
}

export const getAllFeedback = async (token) => {
    try {
        const response = await apiConnector("GET", "http://localhost:5000/api/feedback/getAllFeedback", { token });

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, message: "Error getting feedback summary", error }
    }
}