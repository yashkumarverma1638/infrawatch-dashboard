import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔥 Fetch user
  const fetchUser = async () => {
    try {
      const res = await API.get("/user/me");
      setUser(res.data);
      setEmail(res.data.email || "");
    } catch (err) {
      toast.error("Failed to load user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔥 Update profile
  const updateProfile = async () => {
    if (!email) {
      return toast.error("Email required");
    }

    try {
      await API.put("/user/update", { email });
      toast.success("Profile updated ✅");

      fetchUser(); // refresh data
    } catch (err: any) {
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Update failed ❌");
      }
    }
  };

  // 🔐 Change password
  const changePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 chars");
    }

    try {
      await API.put("/user/change-password", {
        oldPassword,
        newPassword,
      });

      toast.success("Password updated 🔐");

      // reset fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error("Wrong old password ❌");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
      {/* HEADER */}
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Avatar sx={{ width: 56, height: 56 }}>
          {user.email?.[0]?.toUpperCase()}
        </Avatar>

        <Box>
          <Typography variant="h5" fontWeight="bold">
            Profile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your account settings
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* USER INFO */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, p: 1 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>
                User Information
              </Typography>

              <Divider sx={{ mb: 2 }} />

              {/* ✅ FIXED EMAIL INPUT */}
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                onClick={updateProfile}
                sx={{ borderRadius: 2 }}
              >
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* PASSWORD */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, p: 1 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Change Password
              </Typography>

              <Divider sx={{ mb: 1 }} />

              <TextField
                type="password"
                label="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />

              <TextField
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />

              <TextField
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />

              <Button
                variant="contained"
                onClick={changePassword}
                sx={{ borderRadius: 2 }}
              >
                Update Password
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
