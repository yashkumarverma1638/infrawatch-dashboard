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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      navigate("/");
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
              Real-time DevOps Monitoring
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
            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#cbd5f5" } }}
            />

            {/* API Error */}
            {errors.api && (
              <Typography color="error" sx={{ mt: 1 }}>
                {errors.api}
              </Typography>
            )}

            {/* Button */}
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
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;
