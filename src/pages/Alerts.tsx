import { useEffect, useState } from "react";
import API from "../api/api";
import { socket } from "../socket/socket.js";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 10;

  // 🔄 Fetch alerts with pagination
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await API.get(`/alerts?page=${page}&limit=${LIMIT}`);
        setAlerts(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch alerts", err);
      }
    };

    fetchAlerts();
  }, [page]);

  // ⚡ Real-time updates (only for page 1)
  useEffect(() => {
    socket.on("alert:new", (alert) => {
      setAlerts((prev) => {
        if (page === 1) {
          return [alert, ...prev.slice(0, LIMIT - 1)];
        }
        return prev;
      });
    });

    return () => {
      socket.off("alert:new");
    };
  }, [page]);

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
            {alerts.map((a) => (
              <tr key={a.id}>
                <td>{a.url.url}</td>

                <td
                  style={{
                    color: a.status === "DOWN" ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {a.status}
                </td>

                <td>{new Date(a.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔽 Pagination */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px", fontWeight: "bold" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* 🔢 Page Numbers (optional pro UI) */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              margin: "5px",
              padding: "5px 10px",
              background: page === i + 1 ? "#007bff" : "#eee",
              color: page === i + 1 ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
