import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogoutButton } from "../components/buttons/LogoutButton"; // Optional button component

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome, {user ? user.name : "User"}!</p>
      {/* Dashboard widgets and info can be added here */}
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
