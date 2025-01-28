import './App.css';
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import FeedBackForm from './Pages/FeedBackForm';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AboutUs from './Pages/AboutUs';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback-form" element={<FeedBackForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;
