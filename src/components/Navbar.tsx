import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <Box
      sx={{
        height: "70px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
      }}
    >
      {/* Left */}
      <Typography sx={{ fontWeight: 200 }}>Dashboard</Typography>
      <Typography sx={{ fontSize: "12px", color: "#6b7280" }}>
        Plan: {user?.plan || "FREE"}
      </Typography>

      {/* Right */}
      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
        }}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );
}

export default Navbar;
