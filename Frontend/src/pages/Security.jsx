import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Lock, Shield, Smartphone, Trash2 } from "lucide-react";

const Security = () => {
  const navigate = useNavigate();

  const Card = ({ icon, title, subtitle, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow border p-5 flex justify-between items-center cursor-pointer hover:shadow-lg transition"
    >
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h2 className="font-semibold text-lg">{title}</h2>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>

      <span className="text-gray-400 text-xl">›</span>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            🔒 Privacy & Security
          </h1>

          <div className="space-y-4">

            <Card
              icon={<Lock className="text-blue-600" />}
              title="Change Password"
              subtitle="Update your account password"
              onClick={() => navigate("/update-password")}
            />

            <Card
  icon={<Shield className="text-green-600" />}
  title="Two-Factor Authentication"
  subtitle="Enable extra account protection"
  onClick={() => navigate("/two-factor")}
/>

           <Card
  icon={<Smartphone className="text-orange-500" />}
  title="Login Devices"
  subtitle="Manage logged-in devices"
  onClick={() => navigate("/login-devices")}
/>

           <Card
  icon={<Trash2 className="text-red-600" />}
  title="Delete Account"
  subtitle="Permanently delete your account"
  onClick={() => navigate("/delete-account")}
/>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Security;