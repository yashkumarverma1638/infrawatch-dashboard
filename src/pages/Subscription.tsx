import { useDispatch, useSelector } from "react-redux";
import API from "../api/api";
import { fetchUser } from "../features/user/userSlice";
import type { RootState, AppDispatch } from "../app/store";
import { toast } from "react-toastify";

function Subscription() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const upgrade = async () => {
    try {
      await API.post("/user/upgrade");

      toast.success("Upgraded to PRO 🚀");
      dispatch(fetchUser());
    } catch {
      toast.error("Upgrade failed ❌");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Choose Your Plan</h2>

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
          <p>₹0 / month</p>

          <ul>
            <li>✔ 3 Monitors</li>
            <li>✔ Basic Monitoring</li>
            <li>✔ Email Support</li>
          </ul>

          <button disabled className="btn" style={{ marginTop: "10px" }}>
            Current Plan
          </button>
        </div>

        {/* PRO PLAN */}
        <div className="card" style={{ border: "2px solid #6366f1" }}>
          <h3>PRO 🚀</h3>
          <p>₹299 / month</p>

          <ul>
            <li>✔ 50 Monitors</li>
            <li>✔ Faster Checks</li>
            <li>✔ Priority Support</li>
          </ul>

          {user?.plan === "PRO" ? (
            <button disabled className="btn" style={{ marginTop: "10px" }}>
              Current Plan
            </button>
          ) : (
            <button className="btn" onClick={upgrade}>
              Upgrade Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Subscription;
