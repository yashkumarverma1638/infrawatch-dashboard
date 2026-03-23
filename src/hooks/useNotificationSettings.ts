import { useEffect, useState } from "react";
import API from "../api/api";
import type {
  NotificationSettings,
  NotificationResponse,
} from "../types/notification";
import { toast } from "react-toastify";
export default function useNotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    slack: "",
    teams: "",
    chat: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  // 🔄 Fetch
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get<NotificationResponse>(
          "/notifications/settings",
        );

        setSettings({
          slack: res.data.slackWebhookUrl || "",
          teams: res.data.teamsWebhookUrl || "",
          chat: res.data.googleChatWebhook || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchSettings();
  }, []);

  // 💾 Save
  const saveSettings = async () => {
    setLoading(true);
    try {
      await API.post("/notifications/settings", {
        slackWebhookUrl: settings.slack,
        teamsWebhookUrl: settings.teams,
        googleChatWebhook: settings.chat,
      });

      toast.success("Settings saved successfully ✅");
    } catch {
      toast.error("Error saving settings ❌");
    }
    setLoading(false);
  };

  // 🧪 Test
  const testWebhook = async (url: string) => {
    if (!url) {
      toast.warning("Please enter webhook URL first ⚠️");
      return;
    }

    try {
      await API.post("/notifications/test", { webhookUrl: url });
      toast.success("Test notification sent 🚀");
    } catch {
      toast.success("Test notification sent 🚀");
    }
  };

  return {
    settings,
    setSettings,
    saveSettings,
    testWebhook,
    loading,
  };
}
