import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { applyTheme, getTheme } from "../utils/theme";
import { useDispatch } from "react-redux";
import { logout } from "../features/products/user/userSlice";


import SettingCard from "../components/settings/SettingCard";
import ToggleSwitch from "../components/settings/ToggleSwitch";

import {
  User,
  Lock,
  Package,
  Heart,
  MapPin,
  Bell,
  Moon,
  CircleHelp,
  LogOut,
  CreditCard,
  Globe,
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


const handleLogout = async () => {
  try {
    const { data } = await axios.post(
      "/api/v1/logout",
      {},
      {
        withCredentials: true,
      }
    );

    console.log(data);

    dispatch(logout());

    localStorage.removeItem("token");

    navigate("/login");
  } catch (error) {
    console.log(error);

    
  }
};

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(getTheme());
  useEffect(() => {
  applyTheme(darkMode);
}, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">

        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl font-bold mb-8">
            ⚙ Account Settings
          </h1>

          <div className="space-y-4">

            <SettingCard
              icon={<User size={26} />}
              title="Edit Profile"
              subtitle="Manage your personal information"
              onClick={() => navigate("/profile")}
            />

            <SettingCard
              icon={<Lock size={26} />}
              title="Change Password"
              subtitle="Update your account password"
              onClick={() => navigate("/update-password")}
            />

            <SettingCard
              icon={<Package size={26} />}
              title="My Orders"
              subtitle="Track your previous orders"
              onClick={() => navigate("/orders")}
            />

            <SettingCard
              icon={<Heart size={26} />}
              title="Wishlist"
              subtitle="Books you have saved"
              onClick={() => navigate("/wishlist")}
            />

            <SettingCard
              icon={<MapPin size={26} />}
              title="Manage Address"
              subtitle="Add or edit delivery addresses"
              onClick={() => navigate("/settings/address")}
            />
           <SettingCard
  icon={<CreditCard size={26} />}
  title="Payment Methods"
  subtitle="Manage your debit and credit cards"
  onClick={() => navigate("/settings/payment")}
/>
<SettingCard
  icon={<Bell size={26} />}
  title="Notification Settings"
  subtitle="Email, SMS & Push Notifications"
  onClick={() => navigate("/settings/notifications")}
/>
            

       

           
            <SettingCard
  icon={<Globe size={26} />}
  title="Language & Currency"
  subtitle="Language and Currency Preferences"
  onClick={() => navigate("/settings/language")}
/>
            <SettingCard
  icon={<Lock size={26} />}
  title="Privacy & Security"
  subtitle="Password, Login Devices & Privacy"
  onClick={() => navigate("/settings/security")}
/>

            <SettingCard
              icon={<CircleHelp size={26} />}
              title="Help Center"
              subtitle="FAQ & Contact Support"
              onClick={() => navigate("/faqs")}
            />

            
           <SettingCard
  icon={<LogOut size={26} />}
  title="Logout"
  subtitle="Sign out of your account"
  onClick={handleLogout}
/>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Settings;