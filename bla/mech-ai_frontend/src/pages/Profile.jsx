import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe123'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the profile
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <div className="flex justify-end">
            <Button 
              variant={isEditing ? "secondary" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              {isEditing ? (
                <Input 
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profile.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              {isEditing ? (
                <Input 
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              {isEditing ? (
                <Input 
                  name="username"
                  value={profile.username}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profile.username}</p>
              )}
            </div>

            {isEditing && (
              <div className="mt-4">
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;