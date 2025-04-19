import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    try{
      const response=await axios.post("http://localhost:8000/api/auth/login",{email,password});
    const { message, _id, username, email_id, token ,date} = response.data;
    alert(response.data.message);
    if (response.data.message==="login sucessful") {
      sessionStorage.setItem('user', JSON.stringify({ _id, username, email_id,date}));
      sessionStorage.setItem('token', token);
      navigate('/chat');
    } else {
      setError('Invalid email or password');
    }
    }
    catch(err)
    {
      alert("signup required");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm">Password</label>
              <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            
            <Button type="submit" className="w-full">
              Login
            </Button>
            
            <div className="text-center mt-4">
              <a 
                href="/forgot-password" 
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm">
                Don't have an account? 
                <a 
                  href="/signup" 
                  className="ml-1 text-blue-600 hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;