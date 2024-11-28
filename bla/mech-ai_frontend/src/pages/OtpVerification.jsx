import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email,setEmail]=useState("");
  const navigate=useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Automatically move to the next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  useEffect(()=>
{
    const storedUser=sessionStorage.getItem('signupEmail');
    if(storedUser)
    {
        
        setEmail(storedUser);
    }
},[]);

const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Join the OTP array into a single string
    const otpCode = otp.join("");
  
    // Validate email and OTP inputs
    if (!email || !otpCode) {
      return alert("Please provide both email and OTP.");
    }
  
    try {
      
      const response = await axios.post("http://localhost:8000/api/auth/verify-otp", { email, otp: otpCode });
  
      if (response.data.message === "OTP verified successfully. Proceed with registration.") {
        alert(response.data.message);
  
        
        const res = await axios.post("http://localhost:8000/api/auth/confirm-registration", { email });
  
        if (res.data.message === "mail sent") {
          alert("Registration successful! Redirecting to login.");
          navigate("/login");
        } else {
          alert("Error sending confirmation mail. Please try again.");
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during OTP verification or registration:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  const handleResendOtp = () => {
    // Logic for resending OTP
    alert("OTP resent successfully!");
  };

  return (
    <div className="bg-white-900 text-black min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Verify Your OTP</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-sm text-gray-400 mb-4 text-center">
            <p>
              We've sent a 6-digit OTP to your registered email. Please enter it
              below to verify your email address.
            </p>
          </div>

          <div className="flex justify-between gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleChange(e.target, index)}
                className="w-12 h-12 text-center bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500 transition duration-200"
          >
            Verify OTP
          </button>

          <div className="text-center text-sm text-gray-400 mt-4">
            <p>
              Didn't receive the OTP?{" "}
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-white underline hover:text-gray-300 transition duration-200"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
