import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function MonitorDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await API.get(`/urls/metrics/${id}`);
      setData(res.data);
    };

    fetchMetrics();
  }, [id]);

  return (
    <div>
      <h2>Response Time Graph</h2>

      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="checkedAt" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="responseTime" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default MonitorDetails;
