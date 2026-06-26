import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SystemMonitor = () => {
  const [metrics, setMetrics] = useState(null);

  const fetchMetrics = async () => {
    try {
      const res = await fetch("/metrics");
      const data = await res.json();
      setMetrics(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">
          System Monitoring Dashboard
        </h1>

        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white p-6 rounded shadow">
              <h2 className="font-bold">Server Status</h2>
              <p>UP</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="font-bold">Total Requests</h2>
              <p>{metrics.totalRequests}</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="font-bold">Uptime</h2>
              <p>{Math.floor(metrics.uptime)} sec</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="font-bold">Memory Usage</h2>
              <p>
                {(metrics.memoryUsage / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default SystemMonitor;