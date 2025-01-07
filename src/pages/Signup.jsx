import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link component

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Log form data
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        formData
      );
      if (response.status === 201) {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/accounts/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error); // Log the error for more details
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div>
      <nav>
        <a href="/accounts/signup">Signup</a>
        <a href="">|</a>
        <a href="/accounts/login">Login</a>
      </nav>
      <div className="signup-form">
        <h2>
          <span className="typing-effect">Welcome to Sign Up Page...!</span>
        </h2>

        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/accounts/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
