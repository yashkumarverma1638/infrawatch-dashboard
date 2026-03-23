import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SlackIcon from "@mui/icons-material/Chat";
import TeamsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Forum";
import useNotificationSettings from "../../hooks/useNotificationSettings";

function NotificationSettings() {
  const { settings, setSettings, saveSettings, testWebhook, loading } =
    useNotificationSettings();

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, px: 2 }}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <NotificationsActiveIcon color="primary" />
        <Typography variant="h4" fontWeight="bold">
          Notification Settings
        </Typography>
      </Stack>

      {/* ================= SLACK ================= */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <SlackIcon color="primary" />
              <Typography variant="h6">Slack</Typography>
            </Stack>

            <TextField
              fullWidth
              label="Slack Webhook URL"
              placeholder="https://hooks.slack.com/..."
              value={settings.slack}
              onChange={(e) =>
                setSettings({ ...settings, slack: e.target.value })
              }
            />

            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => testWebhook(settings.slack)}
                >
                  Test Slack
                </Button>
              </Grid>

              <Grid item>
                <Chip
                  label={settings.slack ? "Connected" : "Not Connected"}
                  color={settings.slack ? "success" : "default"}
                />
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>

      {/* ================= TEAMS ================= */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TeamsIcon color="primary" />
              <Typography variant="h6">Microsoft Teams</Typography>
            </Stack>

            <TextField
              fullWidth
              label="Teams Webhook URL"
              placeholder="https://outlook.office.com/webhook/..."
              value={settings.teams}
              onChange={(e) =>
                setSettings({ ...settings, teams: e.target.value })
              }
            />

            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => testWebhook(settings.teams)}
                >
                  Test Teams
                </Button>
              </Grid>

              <Grid item>
                <Chip
                  label={settings.teams ? "Connected" : "Not Connected"}
                  color={settings.teams ? "success" : "default"}
                />
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>

      {/* ================= GOOGLE CHAT ================= */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ChatIcon color="primary" />
              <Typography variant="h6">Google Chat</Typography>
            </Stack>

            <TextField
              fullWidth
              label="Google Chat Webhook URL"
              placeholder="https://chat.googleapis.com/..."
              value={settings.chat}
              onChange={(e) =>
                setSettings({ ...settings, chat: e.target.value })
              }
            />

            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => testWebhook(settings.chat)}
                >
                  Test Chat
                </Button>
              </Grid>

              <Grid item>
                <Chip
                  label={settings.chat ? "Connected" : "Not Connected"}
                  color={settings.chat ? "success" : "default"}
                />
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>

      {/* ================= SAVE BUTTON ================= */}
      <Divider sx={{ my: 3 }} />

      <Box textAlign="right">
        <Button
          variant="contained"
          size="large"
          onClick={saveSettings}
          disabled={loading}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
          }}
        >
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </Box>
    </Box>
  );
}

export default NotificationSettings;
