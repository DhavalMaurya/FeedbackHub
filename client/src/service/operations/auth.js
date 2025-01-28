import { apiConnector } from "../apiConnector";
import { toast } from "react-toastify"


export const login = async (email, password, navigate) => {
    try {
        const response = await apiConnector("POST", "http://localhost:5000/api/auth/login", { email, password })
        if (!response.data.success) {
            console.log(response.data)
            return alert("Something went wrong, please try again");
        }
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
        if (!response.data.success) {
            return toast.error(response.data.message)
        }
        toast.success(response.data.message);
        navigate("/")
        return response.data
    } catch (error) {
        console.log("something went wrong", error)
        toast.error("try again something went wrong");
    }
}

export const signUp = async (formData , navigate) => {
    try {
        if (!formData.password === formData.confirmPassword) {
            return alert("Password and Confirm Password does not match");
        }

        const response = await apiConnector("POST", "http://localhost:5000/api/auth/signup", formData)
        if (!response.data.success) {
            return toast.error(response.data.message)
        }
        toast.success(response.data.message);
        navigate("/login")
        return response;
    } catch (error) {
        console.log("something went wrong", error)
        toast.error("try again something went wrong");
    }
}