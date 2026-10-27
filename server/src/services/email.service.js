import nodemailer from "nodemailer";

/**
 * HTML Escaping helper to prevent XSS or malformed markup in email templates.
 */
function escapeHtml(string) {
  if (string === null || string === undefined) return "";
  return String(string)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Creates and returns a Nodemailer transporter instance configured from environment variables.
 * Supports SMTP (Host/Port/User/Pass) or service-based configuration (e.g. Gmail, SendGrid, SES).
 * If SMTP credentials are not yet configured in .env, falls back to a clean mock previewer in development.
 */
let transporter = null;

export const getTransporter = () => {
  if (transporter) {
    return transporter;
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    EMAIL_SERVICE,
  } = process.env;

  if (EMAIL_SERVICE) {
    transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  } else if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: SMTP_SECURE === "true" || Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  } else {
    // Development / fallback transporter: log clean metadata + preview summary
    console.info(
      "ℹ️ [EmailService] SMTP credentials not fully configured in server/.env. Outbound emails will log to terminal."
    );
    transporter = {
      sendMail: async (mailOptions) => {
        console.info(
          `\n================= 📨 OUTBOUND EMAIL PREVIEW =================\n` +
          `To:      ${mailOptions.to}\n` +
          `Subject: ${mailOptions.subject}\n` +
          `From:    ${mailOptions.from}\n` +
          `-------------------------------------------------------------\n` +
          `${mailOptions.text || "See HTML content"}\n` +
          `=============================================================\n`
        );
        return { messageId: `mock-${Date.now()}` };
      },
    };
  }

  return transporter;
};

/**
 * Send an email with responsive HTML and plain-text fallback.
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  const mailer = getTransporter();
  const fromAddress =
    process.env.EMAIL_FROM ||
    `"Rental Management" <${process.env.SMTP_USER || "noreply@rentalmanagement.com"}>`;

  const info = await mailer.sendMail({
    from: fromAddress,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>?/gm, ""),
  });

  return info;
};

/**
 * Generate production-quality HTML template for Password Reset email.
 * Built with email-safe table layout, inline CSS, high-contrast typography,
 * responsive mobile styling, and dark-mode safe CTA.
 *
 * @param {Object} params
 * @param {string} params.name - User's display name
 * @param {string} params.resetUrl - Full password reset URL with token and email
 * @param {number|string} [params.expirationHours=1] - Expiration duration in hours
 * @param {number|string} [params.year=2026] - Copyright year
 */
export const generatePasswordResetTemplate = ({
  name = "there",
  resetUrl,
  expirationHours = 1,
  year = new Date().getFullYear(),
}) => {
  const safeName = escapeHtml(name || "there");
  const safeResetUrl = escapeHtml(resetUrl);

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Reset your password</title>
  <style type="text/css">
    /* Client resets */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #F4F6FA; }

    /* Responsive */
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .email-card { padding: 24px 20px !important; border-radius: 12px !important; }
      .mobile-button { width: 100% !important; display: block !important; text-align: center !important; }
      .button-cell { padding-left: 0 !important; padding-right: 0 !important; }
    }
  </style>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <center style="width: 100%; background-color: #F4F6FA; padding-top: 36px; padding-bottom: 48px;">
    <!-- Main Email Container -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; margin: 0 auto;" class="email-container">
      
      <!-- Brand Header -->
      <tr>
        <td align="left" style="padding-bottom: 20px; padding-left: 4px; padding-right: 4px;">
          <table border="0" cellpadding="0" cellspacing="0">
            <tr>
              <!-- Outline House Icon SVG represented cleanly with inline table / shapes -->
              <td valign="middle" style="padding-right: 12px;">
                <table border="0" cellpadding="0" cellspacing="0" width="36" height="36" style="background-color: #172033; border-radius: 10px;">
                  <tr>
                    <td align="center" valign="middle" style="color: #ffffff; font-size: 18px; font-weight: bold; line-height: 1;">
                      ⌂
                    </td>
                  </tr>
                </table>
              </td>
              <td valign="middle">
                <span style="font-size: 16px; font-weight: 700; color: #172033; letter-spacing: -0.3px; display: block; line-height: 1.2;">Rental Management</span>
                <span style="font-size: 12px; font-weight: 500; color: #667085; display: block;">Workspace Security</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Email Card -->
      <tr>
        <td>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; border: 1px solid #E7EAF0; border-radius: 16px; padding: 36px 36px; box-shadow: 0 4px 12px rgba(23, 32, 51, 0.04);" class="email-card">
            
            <!-- Eyebrow -->
            <tr>
              <td align="left" style="padding-bottom: 8px;">
                <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.8px; color: #3659E3; text-transform: uppercase;">ACCOUNT SECURITY</span>
              </td>
            </tr>

            <!-- Heading -->
            <tr>
              <td align="left" style="padding-bottom: 16px;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #172033; letter-spacing: -0.5px; line-height: 1.25;">Reset your password</h1>
              </td>
            </tr>

            <!-- Description -->
            <tr>
              <td align="left" style="font-size: 15px; line-height: 1.6; color: #334155; padding-bottom: 28px;">
                Hello <strong>${safeName}</strong>,<br /><br />
                We received a request to reset the password for your Rental Management account. Click the button below to choose a new password.
              </td>
            </tr>

            <!-- Primary CTA Button -->
            <tr>
              <td align="left" style="padding-bottom: 32px;" class="button-cell">
                <table border="0" cellspacing="0" cellpadding="0" class="mobile-button">
                  <tr>
                    <td align="center" style="border-radius: 10px; background-color: #3659E3;">
                      <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${safeResetUrl}" style="height:48px;v-text-anchor:middle;width:200px;" arcsize="20%" stroke="f" fillcolor="#3659E3">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:sans-serif;font-size:14px;font-weight:bold;">Reset password &rarr;</center>
                      </v:roundrect>
                      <![endif]-->
                      <!--[if !mso]><!-->
                      <a href="${safeResetUrl}" target="_blank" rel="noopener noreferrer" style="background-color: #3659E3; border: 1px solid #3659E3; border-radius: 10px; color: #ffffff !important; display: inline-block; font-size: 14px; font-weight: 600; line-height: 1.2; padding: 14px 28px; text-align: center; text-decoration: none; -webkit-text-size-adjust: none; box-shadow: 0 2px 6px rgba(54, 89, 227, 0.25);" class="mobile-button">
                        Reset password &rarr;
                      </a>
                      <!--<![endif]-->
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Security Notice Box -->
            <tr>
              <td align="left" style="padding-bottom: 28px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F5F7FC; border: 1px solid #E7EAF0; border-radius: 10px; padding: 14px 16px;">
                  <tr>
                    <td valign="top" style="width: 20px; font-size: 14px; color: #3659E3; line-height: 1.4; padding-right: 8px;">
                      🛡️
                    </td>
                    <td align="left" style="font-size: 13px; line-height: 1.5; color: #475569;">
                      For your security, this link expires in <strong>${expirationHours} hour</strong>. If you didn't request a password reset, you can safely ignore this email. Your account will remain secure.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Fallback URL Section -->
            <tr>
              <td align="left" style="border-top: 1px solid #E7EAF0; padding-top: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #667085;">
                  Having trouble with the button? Copy and paste the link below into your browser:
                </p>
                <div style="background-color: #FAFAFC; border: 1px solid #E7EAF0; border-radius: 8px; padding: 10px 12px; word-break: break-all;">
                  <a href="${safeResetUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 12px; line-height: 1.5; color: #3659E3; text-decoration: underline;">
                    ${safeResetUrl}
                  </a>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding-top: 24px; padding-bottom: 12px; text-align: center;">
          <p style="margin: 0 0 6px 0; font-size: 12px; color: #94A3B8; line-height: 1.4;">
            This is an automated security email from Rental Management. Please do not reply directly.
          </p>
          <p style="margin: 0; font-size: 12px; color: #94A3B8; line-height: 1.4;">
            &copy; ${year} Rental Management. All rights reserved.
          </p>
        </td>
      </tr>

    </table>
  </center>
</body>
</html>`;
};

/**
 * Send a secure Password Reset email with redesigned template.
 *
 * @param {Object} params
 * @param {string} params.to - User email
 * @param {string} params.name - User name
 * @param {string} params.resetToken - Raw crypto token
 */
export const sendPasswordResetEmail = async ({ to, name, resetToken }) => {
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const resetUrl = `${clientUrl}/reset-password?token=${encodeURIComponent(
    resetToken
  )}&email=${encodeURIComponent(to)}`;

  const subject = "Reset your Rental Management password";

  const html = generatePasswordResetTemplate({
    name,
    resetUrl,
    expirationHours: 1,
    year: new Date().getFullYear(),
  });

  const plainText = [
    `ACCOUNT SECURITY: Reset your password`,
    ``,
    `Hello ${name || "there"},`,
    ``,
    `We received a request to reset the password for your Rental Management account.`,
    `To choose a new password, visit the link below:`,
    ``,
    resetUrl,
    ``,
    `This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email; your account will remain secure.`,
    ``,
    `© ${new Date().getFullYear()} Rental Management. All rights reserved.`,
  ].join("\n");

  return sendEmail({
    to,
    subject,
    html,
    text: plainText,
  });
};
