import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Validation Function
  const validate = () => {
    const newErrors: any = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleReset = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await API.post("/auth/forgot-password", { email });
      toast.success("Check your email for reset instructions");
    } catch (err: any) {
      setErrors({ api: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(-45deg, #0f172a, #1e3c72, #2a5298, #6366f1)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          sx={{
            width: 380,
            padding: 2,
            borderRadius: "16px",
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            color: "#fff",
          }}
        >
          <CardContent>
            <Typography variant="h4" align="center" sx={{ mb: 1 }}>
              InfraWatch
            </Typography>

            <Typography align="center" sx={{ mb: 3, color: "#cbd5f5" }}>
              Reset Password
            </Typography>

            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#cbd5f5" } }}
            />

            {/* Password */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                height: 45,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #38bdf8, #6366f1)",
                fontWeight: "bold",
                textTransform: "none",
              }}
              onClick={handleReset}
              disabled={loading}
            >
              {loading ? "Resetting password..." : "Reset Password"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
