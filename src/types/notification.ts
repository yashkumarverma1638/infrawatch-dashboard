export interface NotificationSettings {
  slack: string;
  teams: string;
  chat: string;
}

export interface NotificationResponse {
  slackWebhookUrl?: string;
  teamsWebhookUrl?: string;
  googleChatWebhook?: string;
}
