import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Monitor = () => {
  const [metrics, setMetrics] = useState(null);

  const fetchMetrics = async () => {
    try {
      const res = await fetch("/metrics");
      const data = await res.json();
      setMetrics(data);
    } catch (error) {
      console.error("Metrics Error:", error);
    }
  };

  useEffect(() => {
    fetchMetrics();

    const interval = setInterval(() => {
      fetchMetrics();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">
          System Monitoring Dashboard
        </h1>

        {!metrics ? (
          <p>Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Total Requests */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">
                Total Requests
              </h2>
              <p className="text-3xl font-bold mt-3">
                {metrics.totalRequests}
              </p>
            </div>

            {/* Uptime */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">
                Uptime
              </h2>
              <p className="text-3xl font-bold mt-3">
                {Math.floor(metrics.uptime)} sec
              </p>
            </div>

            {/* Memory */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">
                Memory Usage
              </h2>
              <p className="text-3xl font-bold mt-3">
                {(metrics.memoryUsage / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-lg font-semibold">
    Response Time
  </h2>

  <p className="text-3xl font-bold mt-3">
    {metrics.responseTime} ms
  </p>
</div>

            {/* Status */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">
                Server Status
              </h2>
              <p className="text-3xl font-bold mt-3 text-green-600">
                {metrics.serverStatus || "UP"}
              </p>
            </div>

          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-lg font-semibold">
    Last Updated
  </h2>

  <p className="text-xl font-bold mt-3">
    {new Date(metrics.serverTime).toLocaleTimeString()}
  </p>
</div>

      <div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    API Analytics
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {metrics?.apiStats &&
      Object.entries(metrics.apiStats).map(
        ([route, count]) => (
          <div
            key={route}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h3 className="font-semibold text-gray-700">
              {route}
            </h3>

            <p className="text-2xl font-bold mt-2">
              {count}
            </p>

            <p className="text-sm text-gray-500">
              Requests
            </p>
          </div>
        )
      )}
  </div>
</div>
      <Footer />
    </>
  );
};

export default Monitor;