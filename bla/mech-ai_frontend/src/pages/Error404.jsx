import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          The page you are looking for might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>
        <Button 
          onClick={() => navigate('/')} 
          variant="default"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default Error404;