import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMonitors,
  removeMonitor,
} from "../features/monitors/monitorSlice";
import API from "../api/api";
import type { RootState, AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket.js";
import { updateMonitorRealtime } from "../features/monitors/monitorSlice";
function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { monitors, loading } = useSelector(
    (state: RootState) => state.monitors,
  );

  const [url, setUrl] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchMonitors());
    }
  }, []);
  useEffect(() => {
    socket.on("monitor:update", (data) => {
      console.log("Realtime update:", data);

      dispatch(updateMonitorRealtime(data));

      setLastUpdated(new Date()); // update timestamp
    });

    return () => {
      socket.off("monitor:update");
    };
  }, [dispatch]);

  const addMonitor = async () => {
    if (!url) return;

    await API.post("/urls/add", {
      url: url,
      userId: 1,
    });

    setUrl("");

    dispatch(fetchMonitors());
  };
  const deleteMonitor = async (id: number) => {
    await API.delete(`/urls/${id}`);
    dispatch(removeMonitor(id));
  };
  return (
    
   <div style={{ padding: "30px" }}>
    <h2 style={{ marginBottom: "20px" }}>InfraWatch Dashboard</h2>

    {/* 🔥 TOP CARDS */}
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div className="card">
        Total: {monitors.length}
      </div>
      <div className="card">
        Down: {monitors.filter((m: any) => m.logs?.[0]?.status === "DOWN").length}
      </div>
      <div className="card">
        Avg:{" "}
        {Math.round(
          monitors.reduce(
            (acc: number, m: any) =>
              acc + (m.logs?.[0]?.responseTime || 0),
            0
          ) / (monitors.length || 1)
        )} ms
      </div>
    </div>

    {/* 🔥 ADD MONITOR */}
    <div className="card" style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="input"
      />

      <button onClick={addMonitor} className="btn">
        Add Monitor
      </button>
    </div>

    {/* 🔥 TABLE */}
    <div className="card">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Website</th>
              <th>Status</th>
              <th>Response</th>
              <th>Uptime</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {monitors.map((item: any) => (
              <tr
                key={item.id}
                onClick={() => navigate(`/monitor/${item.id}`)}
              >
                <td>{item.url}</td>

                <td>
                  <span
                    className={
                      item.logs?.[0]?.status === "UP"
                        ? "status up"
                        : "status down"
                    }
                  >
                    {item.logs?.[0]?.status}
                  </span>
                </td>

                <td>{item.logs?.[0]?.responseTime ?? "-"} ms</td>

                <td>{item.uptime ?? "-"}</td>

                <td>
                  {item.logs?.[0]?.checkedAt
                    ? new Date(item.logs[0].checkedAt).toLocaleTimeString()
                    : "-"}
                </td>

                <td>
                  <button
                    className="deleteBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMonitor(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
}

export default Dashboard;
