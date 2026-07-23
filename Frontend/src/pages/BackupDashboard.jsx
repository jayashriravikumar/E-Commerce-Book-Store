import { useEffect, useState } from "react";
import axios from "axios";
import BackupChart from "../components/BackupChart";

const BackupDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [analytics, setAnalytics] = useState([]);

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/admin/dashboard"
      );

      setDashboard(data.dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnalytics = async () => {
  try {
    const { data } = await axios.get(
      "/api/v1/admin/analytics"
    );

    setAnalytics(data.analytics);

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchDashboard();
    fetchAnalytics();
  }, []);

  if (!dashboard) {
    return (
      <h2 className="text-center mt-10">
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">

      <h1 className="text-4xl font-bold mb-8">
        Backup Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-blue-600 text-white rounded-xl p-6">
          <h2>Total Backups</h2>
          <p className="text-4xl font-bold">
            {dashboard.totalBackups}
          </p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-6">
          <h2>Success</h2>
          <p className="text-4xl font-bold">
            {dashboard.successfulBackups}
          </p>
        </div>

        <div className="bg-red-600 text-white rounded-xl p-6">
          <h2>Failed</h2>
          <p className="text-4xl font-bold">
            {dashboard.failedBackups}
          </p>
        </div>

        <div className="bg-purple-600 text-white rounded-xl p-6">
          <h2>Latest Backup</h2>

          <p className="mt-3">
            {dashboard.latestBackup
              ? new Date(
                  dashboard.latestBackup.backupDate
                ).toLocaleString()
              : "No Backup"}
          </p>

        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Last 7 Days Backup Analytics
  </h2>

  <BackupChart analytics={analytics} />
</div>

      </div>

    </div>
  );
};

export default BackupDashboard;