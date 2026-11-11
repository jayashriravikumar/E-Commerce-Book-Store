import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginDevices = () => {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
  fetchDevices();
}, []);

const fetchDevices = async () => {
  try {
    const { data } = await axios.get("/api/v1/security/devices");

    if (data.success) {
      setDevices(data.devices);
    }
  } catch (error) {
    console.log(error);
  }
};

  const logoutDevice = async (id) => {
  if (!window.confirm("Logout this device?")) return;

  try {
    await axios.delete(`/api/v1/security/devices/${id}`);

    fetchDevices();
  } catch (error) {
    console.log(error);
  }
};

  const logoutAll = async () => {
  if (!window.confirm("Logout from all other devices?")) return;

  try {
    for (const device of devices) {
      if (!device.current) {
        await axios.delete(`/api/v1/security/devices/${device.id}`);
      }
    }

    fetchDevices();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

          <h1 className="text-3xl font-bold mb-2">
            📱 Login Devices
          </h1>

          <p className="text-gray-500 mb-8">
            Manage devices currently signed in to your account.
          </p>

          <div className="space-y-5">

            {devices.map((device) => (
              <div
                key={device.id}
                className="border rounded-xl p-5 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold text-lg">
                    {device.device}
                  </h2>

                  <p className="text-gray-500">
                    {device.browser}
                  </p>

                  <p className="text-gray-500">
                    {device.location}
                  </p>

                  {device.current && (
                    <span className="text-green-600 font-semibold">
                      Current Device
                    </span>
                  )}
                </div>

                {!device.current && (
                  <button
                    onClick={() => logoutDevice(device.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Logout
                  </button>
                )}
              </div>
            ))}

          </div>

          <button
            onClick={logoutAll}
            className="mt-8 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg"
          >
            Logout from Other Devices
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginDevices;