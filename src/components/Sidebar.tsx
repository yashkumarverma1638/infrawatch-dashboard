import { Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonitorIcon from "@mui/icons-material/Monitor";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate, useLocation } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { name: "Monitors", icon: <MonitorIcon />, path: "/" },
  { name: "Alerts", icon: <NotificationsIcon />, path: "/alerts" },
  { name: "Subscription", icon: <SettingsIcon />, path: "/subscription" },
  { name: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 220,
        height: "100vh",
        background: "linear-gradient(180deg, #0f172a, #1e293b)",
        color: "#fff",
        padding: "20px",
        position: "fixed",
      }}
    >
      {/* Logo */}
      <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
        InfraWatch
      </Typography>

      {/* Menu */}
      {menu.map((item) => {
        const active = location.pathname === item.path;

        return (
          <Box
            key={item.name}
            onClick={() => navigate(item.path)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              mb: 1,
              background: active
                ? "linear-gradient(135deg, #38bdf8, #6366f1)"
                : "transparent",
              "&:hover": {
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            {item.icon}
            <Typography>{item.name}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default Sidebar;
