import { Box, Typography, Collapse } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonitorIcon from "@mui/icons-material/Monitor";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const menu = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { name: "Monitors", icon: <MonitorIcon />, path: "/monitors" },
  { name: "Alerts", icon: <NotificationsIcon />, path: "/alerts" },
  { name: "Subscription", icon: <SettingsIcon />, path: "/subscription" },
];

const settingsMenu = [
  { name: "Profile", path: "/settings/profile" },
  { name: "Security", path: "/settings/security" },
  { name: "Notifications", path: "/settings/notifications" },
  { name: "Billing", path: "/settings/billing" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSettings, setOpenSettings] = useState(true);

  const isActive = (path: string) => location.pathname === path;
  const isSettingsActive = location.pathname.startsWith("/settings");

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        background: "linear-gradient(180deg, #0f172a, #1e293b)",
        color: "#fff",
        p: 2,
        position: "fixed",
      }}
    >
      {/* Logo */}
      <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
        InfraWatch
      </Typography>

      {/* Main Menu */}
      {menu.map((item) => {
        const active = isActive(item.path);

        return (
          <Box
            key={item.name}
            onClick={() => navigate(item.path)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.5,
              borderRadius: 2,
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

      {/* SETTINGS MENU */}
      <Box
        onClick={() => setOpenSettings(!openSettings)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1.5,
          borderRadius: 2,
          cursor: "pointer",
          background: isSettingsActive
            ? "linear-gradient(135deg, #38bdf8, #6366f1)"
            : "transparent",
          "&:hover": {
            background: "rgba(255,255,255,0.1)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <SettingsIcon />
          <Typography>Settings</Typography>
        </Box>
        {openSettings ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>

      {/* SUB MENU */}
      <Collapse in={openSettings}>
        <Box sx={{ ml: 3, mt: 1 }}>
          {settingsMenu.map((item) => (
            <Box
              key={item.name}
              onClick={() => navigate(item.path)}
              sx={{
                p: 1,
                borderRadius: 2,
                cursor: "pointer",
                mb: 0.5,
                fontSize: "14px",
                background: isActive(item.path)
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
                "&:hover": {
                  background: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {item.name}
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

export default Sidebar;
