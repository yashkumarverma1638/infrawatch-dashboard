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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState("");
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

  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };
  const confirmDelete = (id: number) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete?</p>

          <div
            style={{
              display: "grid",
              gap: "16px",
              marginTop: "10px",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <button
              onClick={async () => {
                await deleteMonitor(id);
                toast.success("Monitor deleted 🗑️");
                closeToast?.();
              }}
              style={{
                background: "red",
                color: "white",
                padding: "5px 10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Yes
            </button>

            <button
              onClick={() => closeToast?.()}
              style={{
                background: "gray",
                color: "white",
                padding: "5px 10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false, // important
        closeOnClick: false,
      },
    );
  };

  const addMonitor = async () => {
    if (!url) {
      setError("URL is required");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Enter a valid URL (https://example.com)");
      return;
    }

    try {
      await API.post("/urls/add", {
        url,
      });

      setUrl("");
      setError("");

      dispatch(fetchMonitors());
    } catch (err: any) {
      toast.error(err.response?.data?.error);
    }
  };
  const deleteMonitor = async (id: number) => {
    try {
      await API.delete(`/urls/${id}`);
      dispatch(removeMonitor(id));
    } catch {
      toast.error("Delete failed ❌");
    }
  };
  return (
    <div>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 600 }}>Dashboard</h2>

        <p style={{ color: "#64748b", fontSize: "14px" }}>
          Monitor your infrastructure in real-time
        </p>
      </div>

      {/* 🔥 TOP CARDS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div className="card">Total: {monitors.length}</div>
        <div className="card">
          Down:{" "}
          {monitors.filter((m: any) => m.logs?.[0]?.status === "DOWN").length}
        </div>
        <div className="card">
          Avg:{" "}
          {Math.round(
            monitors.reduce(
              (acc: number, m: any) => acc + (m.logs?.[0]?.responseTime || 0),
              0,
            ) / (monitors.length || 1),
          )}{" "}
          ms
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
        {error && (
          <p style={{ color: "red", fontSize: "13px", marginTop: "6px" }}>
            {error}
          </p>
        )}
      </div>

      {/* 🔥 TABLE */}
      <div className="card">
        {loading ? (
          <div className="card">Loading monitors...</div>
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
                        confirmDelete(item.id);
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
