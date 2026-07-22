import { useState, useEffect } from "react";
import axios from "axios";
import { Database, Download, Upload } from "lucide-react";

const BackupRecovery = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [backupPath, setBackupPath] = useState("");
  const [history, setHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  

  // Backup Database
  const handleBackup = async () => {
  try {
    setLoading(true);
    setMessage("Creating database backup...");

    const { data } = await axios.post(
      "http://localhost:8000/api/v1/admin/backup"
    );

    setBackupPath(data.backupPath);
    setMessage("✅ Database backup completed successfully.");
    fetchHistory();
  } catch (error) {
    console.error(error);

    setMessage(
      error.response?.data?.message ||
      "❌ Database backup failed."
    );
  } finally {
    setLoading(false);
  }
};

  // Restore Database
const handleRestore = async () => {
  try {
    setLoading(true);
    setMessage("Restoring database...");

    const { data } = await axios.post(
      "http://localhost:8000/api/v1/admin/restore",
      {
        backupPath,
      }
    );

    setMessage(data.message);

  } catch (error) {
    setMessage(
      error.response?.data?.message ||
      "Restore Failed"
    );
  } finally {
    setLoading(false);
  }
};

const restoreBackup = async (path) => {
    if (!window.confirm("Are you sure you want to restore this backup?")) {
    return;
}

    try{

        setLoading(true);

        setMessage("Restoring database...");

        const { data } = await axios.post(
            "http://localhost:8000/api/v1/admin/restore",
            {
                backupPath: path
            }
        );

        setMessage(data.message);

    }catch(error){

        setMessage(
            error.response?.data?.message ||
            "Restore Failed"
        );

    }finally{

        setLoading(false);

    }

};

const downloadBackup = async (path) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/admin/download-backup",
      {
        backupPath: path,
      },
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = "backup.zip";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(error);
  }
};
//fetch backup history
  const fetchHistory = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/admin/backup-history"
    );

    setHistory(data.history);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchHistory();
}, []);

  return (
    <div className="max-w-6xl mx-auto px-3 md:px-6 py-6">

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
          <Database size={32} />
          Backup & Recovery
        </h1>

       <div className="space-y-4 md:space-y-6">

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-xl mb-2">
              Database Backup
            </h2>

            <button
  onClick={handleBackup}
  disabled={loading}
 className={`w-full md:w-auto px-6 py-3 rounded-lg text-white font-semibold ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {loading ? "Backing Up..." : "Backup Database"}
</button>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-xl mb-2">
              Database Restore
            </h2>

            <button
  onClick={handleRestore}
  disabled={loading}
  className={`px-6 py-3 rounded-lg text-white font-semibold ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-red-600 hover:bg-red-700"
  }`}
>
  {loading ? "Restoring..." : "Restore Database"}
</button>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold">
              Backup Location
            </h2>

            <p className="text-gray-600 break-all">
              {backupPath || "No Backup Yet"}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold">
              Status
            </h2>

            <p>
              {message || "Waiting..."}
            </p>
          </div>

          <div className="border rounded-lg p-4 mt-6 overflow-hidden">
  <h2 className="text-xl font-semibold mb-4">
    Backup History
  </h2>
  <div className="hidden md:block overflow-x-auto">

  <table className="w-full border-collapse">
    <thead>
      <tr className="border-b">
        <th className="text-left p-2">Date</th>
<th className="text-left p-2">Status</th>
<th className="text-left p-2">Database</th>
<th className="text-left p-2">Action</th>
      </tr>
    </thead>

    <tbody>
      {history.length === 0 ? (
        <tr>
          <td colSpan="3" className="p-4 text-center text-gray-500">
            No backups found.
          </td>
        </tr>
      ) : (
        history.map((item) => (

<tr key={item._id} className="border-b">

    <td className="p-2">
        {new Date(item.backupDate).toLocaleString()}
    </td>

    <td className="p-2">
        {item.status}
    </td>

    <td className="p-2">
        {item.database}
    </td>

    <td className="p-2 space-x-2">

  <button
    onClick={() => restoreBackup(item.backupPath)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
  >
    Restore
  </button>

  <button
    onClick={() => downloadBackup(item.backupPath)}
    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
  >
    Download
  </button>

</td>


</tr>

))
      )}
    </tbody>
  </table>
</div>

<div className="md:hidden space-y-4">

{history.length === 0 ? (

<div className="text-center text-gray-500">
No backups found.
</div>

) : (

history.map((item)=>(

<div
key={item._id}
className="border rounded-xl p-4 shadow-sm"
>

<p className="font-semibold">

📅 {new Date(item.backupDate).toLocaleString()}

</p>

<p className="mt-2">

Status:

<span className="ml-2 font-semibold text-green-600">

{item.status}

</span>

</p>

<p className="mt-2">

Database:

<span className="ml-2">

{item.database}

</span>

</p>

<div className="flex gap-2 mt-4">

<button
onClick={()=>restoreBackup(item.backupPath)}
className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
>

Restore

</button>

<button
onClick={()=>downloadBackup(item.backupPath)}
className="flex-1 bg-green-600 text-white py-2 rounded-lg"
>

Download

</button>

</div>

</div>


))

)}

</div>
</div>
        </div>

      </div>

    </div>
  );
};

export default BackupRecovery;