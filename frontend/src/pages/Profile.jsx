import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-4">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.picture || "https://via.placeholder.com/100"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Profile Details</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Profile;
