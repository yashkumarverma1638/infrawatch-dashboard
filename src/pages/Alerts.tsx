import { useEffect, useState } from "react";
import API from "../api/api";
import { socket } from "../socket/socket.js";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const res = await API.get("/alerts");
      setAlerts(res.data);
    };

    fetchAlerts();
  }, []);

  useEffect(() => {
    socket.on("alert:new", (alert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

    return () => {
      socket.off("alert:new");
    };
  }, []);

  return (
    <div>
      <h2>Alerts 🚨</h2>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Website</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((a: any) => (
              <tr key={a.id}>
                <td>{a.url.url}</td>
                <td style={{ color: "red" }}>{a.status}</td>
                <td>{new Date(a.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Alerts;
