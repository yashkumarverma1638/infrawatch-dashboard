import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/user/userSlice";
import type { AppDispatch } from "../app/store";

function Success() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // 🔥 refresh user after payment
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#16a34a" }}>Payment Successful 🎉</h2>

        <p>Your plan has been upgraded to PRO 🚀</p>

        <button
          onClick={() => (window.location.href = "/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Success;
