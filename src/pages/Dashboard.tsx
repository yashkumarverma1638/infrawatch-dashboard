import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonitors } from "../features/monitors/monitorSlice";
import API from "../api/api";
import type { RootState, AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { monitors, loading } = useSelector(
    (state: RootState) => state.monitors,
  );

  const [url, setUrl] = useState("");

  useEffect(() => {
    dispatch(fetchMonitors());
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

  return (
    <div style={{ padding: "30px" }}>
      <h2>InfraWatch Dashboard</h2>

      {/* Add Monitor */}

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={addMonitor} style={{ marginLeft: "10px" }}>
          Add Monitor
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Website</th>
            <th>Status</th>
            <th>Response Time</th>
          </tr>
        </thead>

        <tbody>
          {monitors.map((item: any) => (
            <tr
              key={item.id}
              onClick={() => navigate(`/monitor/${item.id}`)}
              style={{
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f5f5f5")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              <td>{item.url}</td>

              <td>{item.logs?.[0]?.status === "UP" ? "🟢 UP" : "🔴 DOWN"}</td>

              <td>{item.logs?.[0]?.responseTime ?? "-"} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
