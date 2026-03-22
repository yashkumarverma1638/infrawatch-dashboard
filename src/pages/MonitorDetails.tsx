import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function MonitorDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [uptime, setUptime] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await API.get(`/urls/metrics/${id}`);
      setUptime(res.data.uptime);
      setData(res.data);
    };

    fetchMetrics();
  }, [id]);

  return (
  <div style={{ padding: "30px" }}>
    <h2 style={{ marginBottom: "20px" }}>Monitor Details</h2>

    {/* 🔥 TOP STATS */}
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div className="card">Uptime: {uptime}</div>
      <div className="card">
        Avg Response:{" "}
        {Math.round(
          data.reduce(
            (acc: number, d: any) => acc + d.responseTime,
            0
          ) / (data.length || 1)
        )}{" "}
        ms
      </div>
      <div className="card">Checks: {data.length}</div>
    </div>

    {/* 🔥 CHART CARD */}
    <div className="card">
      <h3 style={{ marginBottom: "20px" }}>Response Time Graph</h3>

      <LineChart width={800} height={350} data={data}>
        <XAxis
          dataKey="checkedAt"
          tickFormatter={(time) =>
            new Date(time).toLocaleTimeString()
          }
        />
        <YAxis />
        <Tooltip
          labelFormatter={(label) =>
            new Date(label).toLocaleString()
          }
        />
        <Line
          type="monotone"
          dataKey="responseTime"
          stroke="#6366f1"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </div>
  </div>
);
}

export default MonitorDetails;
