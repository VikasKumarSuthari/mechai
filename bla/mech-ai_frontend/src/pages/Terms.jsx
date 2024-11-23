import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Acceptance of Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <p>By accessing our service, you agree to these terms. Use of our platform constitutes acceptance of these conditions.</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Responsibilities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide accurate account information</li>
            <li>Maintain account security</li>
            <li>Use service in compliance with applicable laws</li>
            <li>Respect intellectual property rights</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Service Limitations</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Our service is provided "as is" with no guarantees. We reserve the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Modify or discontinue service</li>
            <li>Suspend or terminate accounts</li>
            <li>Change pricing and features</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Liability</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We are not liable for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Direct or indirect damages</li>
            <li>Loss of data or revenue</li>
            <li>Interruption of service</li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Button variant="outline">Contact Legal Team</Button>
      </div>
    </div>
  );
};

export default Terms;