import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import API from "../api/api";
import { fetchUser } from "../features/user/userSlice";
import type { RootState, AppDispatch } from "../app/store";
import { toast } from "react-toastify";

function Subscription() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(false);

  // 🔥 Stripe upgrade
  const upgrade = async () => {
    try {
      setLoading(true);

      const res = await API.post("/payments/create-checkout-session");

      // redirect to Stripe checkout
      window.location.href = res.data.url;
    } catch (err) {
      toast.error("Payment failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* Header */}
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ margin: 0 }}>Subscription</h2>
        <p style={{ color: "#6b7280" }}>
          Upgrade your plan to unlock more features 🚀
        </p>
      </div>

      {/* Plans */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {/* FREE PLAN */}
        <div className="card">
          <h3>FREE</h3>
          <p style={{ fontSize: "20px", fontWeight: 600 }}>₹0 / month</p>

          <ul>
            <li>✔ 3 Monitors</li>
            <li>✔ Basic Monitoring</li>
            <li>✔ Email Alerts</li>
          </ul>

          {user?.plan === "FREE" && (
            <button
              disabled
              className="btn"
              style={{ marginTop: "10px", opacity: 0.7 }}
            >
              Current Plan
            </button>
          )}
        </div>

        {/* PRO PLAN */}
        <div
          className="card"
          style={{
            border: "2px solid #6366f1",
            position: "relative",
          }}
        >
          {/* Badge */}
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "10px",
              background: "#6366f1",
              color: "#fff",
              padding: "4px 10px",
              borderRadius: "10px",
              fontSize: "12px",
            }}
          >
            Popular
          </span>

          <h3>PRO 🚀</h3>
          <p style={{ fontSize: "20px", fontWeight: 600 }}>₹299 / month</p>

          <ul>
            <li>✔ 50 Monitors</li>
            <li>✔ Faster Checks</li>
            <li>✔ Priority Support</li>
            <li>✔ Email Alerts</li>
          </ul>

          {user?.plan === "PRO" ? (
            <button
              disabled
              className="btn"
              style={{ marginTop: "10px", opacity: 0.7 }}
            >
              Current Plan
            </button>
          ) : (
            <button
              className="btn"
              onClick={upgrade}
              disabled={loading}
              style={{ marginTop: "10px" }}
            >
              {loading ? "Redirecting..." : "Upgrade Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Subscription;
