import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [user,setUser]=useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const Storeddata = sessionStorage.getItem('user');
    if (Storeddata) {
      const userdata = JSON.parse(Storeddata);
      setUser(userdata);
    }
  }, []);

  useEffect(() => {
    const getdata = async () => {
      try {

        if (user && user._id) {

          const token = sessionStorage.getItem("token");
          if (!token) {
          console.error("Authentication token is missing.");
          }


          const response = await axios.get("http://localhost:8000/api/auth/profile", {
            params: { _id: user._id },
            headers: {
            Authorization: `Bearer ${token}`,
          },
          });
          setProfile(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getdata();
  }, [user]);



  const handleSave = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
   console.error("Authentication token is missing.");
    }
    try {
      const response = await axios.put("http://localhost:8000/api/auth/profile", {
        _id: user._id,
        username: profile.username, 
      }, {
        headers: {
           Authorization: `Bearer ${token}`, 
        }
     });
      sessionStorage.setItem('user', JSON.stringify(response.data)); 
      setIsEditing(false); 
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              {profile ? (
                isEditing ? (
                  <Input 
                    name="username"
                    value={profile.username || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{profile.username || 'N/A'}</p>
                )
              ) : (
                <p>Loading...</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              {profile ? (
                  <p>{profile.email || 'N/A'}</p>
                ): (
                <p>Loading...</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Joined us on</label>
              {profile ? (
                <p>{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }) : 'N/A'}</p>
                ) : (
                <p>Loading...</p>
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
