import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Information Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We collect information you provide directly to us, including:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Personal contact information</li>
            <li>Account registration details</li>
            <li>Usage data and interactions</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Information Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We use collected information to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Provide and improve our services</li>
            <li>Communicate with you</li>
            <li>Personalize user experience</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Data Protection</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We implement industry-standard security measures to protect your data, including:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Encryption</li>
            <li>Access controls</li>
            <li>Regular security audits</li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Button variant="outline">Contact Privacy Team</Button>
      </div>
    </div>
  );
};

export default Privacy;