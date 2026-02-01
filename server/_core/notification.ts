import { TRPCError } from "@trpc/server";

export type NotificationPayload = {
  title: string;
  content: string;
};

const TITLE_MAX_LENGTH = 1200;
const CONTENT_MAX_LENGTH = 20000;

const trimValue = (value: string): string => value.trim();
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const validatePayload = (input: NotificationPayload): NotificationPayload => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required.",
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required.",
    });
  }

  const title = trimValue(input.title);
  const content = trimValue(input.content);

  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`,
    });
  }

  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`,
    });
  }

  return { title, content };
};

/**
 * Send notification to admin/owner
 * 
 * This is a placeholder implementation. In production, you can:
 * 1. Send email via SendGrid, Resend, or AWS SES
 * 2. Send Slack/Discord webhook
 * 3. Store in database for admin dashboard
 * 4. Use any notification service
 */
export async function notifyOwner(
  payload: NotificationPayload
): Promise<boolean> {
  const { title, content } = validatePayload(payload);

  // Log notification for now
  console.log("[Notification] Admin notification:", { title, content });

  // Optional: Send email if configured
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && process.env.SENDGRID_API_KEY) {
    try {
      // Example: SendGrid integration
      // await sendEmail({ to: adminEmail, subject: title, text: content });
      console.log(`[Notification] Would send email to ${adminEmail}`);
    } catch (error) {
      console.warn("[Notification] Failed to send email:", error);
    }
  }

  // Optional: Send Discord webhook if configured
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  if (discordWebhook) {
    try {
      await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `**${title}**\n${content}`,
        }),
      });
    } catch (error) {
      console.warn("[Notification] Failed to send Discord webhook:", error);
    }
  }

  return true;
}
