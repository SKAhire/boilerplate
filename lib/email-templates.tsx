/**
 * Email verification template
 */
export function getVerificationEmailTemplate(
  userName: string,
  verificationLink: string
): { subject: string; html: string; text: string } {
  return {
    subject: "Verify your SecureAuth email",
    html: `
      <h2>Welcome to SecureAuth, ${userName}!</h2>
      <p>Please verify your email address to complete your account setup.</p>
      <a href="${verificationLink}" style="
        display: inline-block;
        background-color: #000;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 4px;
        margin: 20px 0;
      ">Verify Email</a>
      <p>Or copy this link: ${verificationLink}</p>
      <p>This link expires in 24 hours.</p>
    `,
    text: `
      Welcome to SecureAuth, ${userName}!
      
      Please verify your email by visiting this link:
      ${verificationLink}
      
      This link expires in 24 hours.
    `,
  };
}

/**
 * Password reset template
 */
export function getPasswordResetEmailTemplate(
  userName: string,
  resetLink: string
): { subject: string; html: string; text: string } {
  return {
    subject: "Reset your SecureAuth password",
    html: `
      <h2>Password Reset Request</h2>
      <p>Hi ${userName},</p>
      <p>We received a request to reset your SecureAuth password.</p>
      <a href="${resetLink}" style="
        display: inline-block;
        background-color: #000;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 4px;
        margin: 20px 0;
      ">Reset Password</a>
      <p>Or copy this link: ${resetLink}</p>
      <p>This link expires in 1 hour.</p>
      <p>If you didn't request this, you can ignore this email.</p>
    `,
    text: `
      Password Reset Request
      
      Hi ${userName},
      
      We received a request to reset your SecureAuth password.
      
      Reset your password by visiting this link:
      ${resetLink}
      
      This link expires in 1 hour.
      
      If you didn't request this, you can ignore this email.
    `,
  };
}

/**
 * OTP email template
 */
export function getOTPEmailTemplate(
  userName: string,
  otpCode: string
): { subject: string; html: string; text: string } {
  return {
    subject: "Your SecureAuth verification code",
    html: `
      <h2>Verification Code</h2>
      <p>Hi ${userName},</p>
      <p>Your SecureAuth verification code is:</p>
      <div style="
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 4px;
        text-align: center;
        margin: 20px 0;
      ">
        <h1 style="letter-spacing: 5px; margin: 0;">${otpCode}</h1>
      </div>
      <p>This code expires in 10 minutes.</p>
      <p>Do not share this code with anyone.</p>
    `,
    text: `
      Verification Code
      
      Hi ${userName},
      
      Your SecureAuth verification code is: ${otpCode}
      
      This code expires in 10 minutes.
      
      Do not share this code with anyone.
    `,
  };
}

/**
 * Welcome email template
 */
export function getWelcomeEmailTemplate(userName: string): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: "Welcome to SecureAuth!",
    html: `
      <h2>Welcome to SecureAuth, ${userName}!</h2>
      <p>Your account has been successfully created.</p>
      <h3>Account Security Tips:</h3>
      <ul>
        <li>Enable two-factor authentication in your security settings</li>
        <li>Use a strong, unique password</li>
        <li>Never share your password with anyone</li>
        <li>Review your account activity regularly</li>
      </ul>
      <p>If you have any questions, feel free to contact our support team.</p>
    `,
    text: `
      Welcome to SecureAuth, ${userName}!
      
      Your account has been successfully created.
      
      Account Security Tips:
      - Enable two-factor authentication in your security settings
      - Use a strong, unique password
      - Never share your password with anyone
      - Review your account activity regularly
      
      If you have any questions, feel free to contact our support team.
    `,
  };
}

/**
 * Security alert template
 */
export function getSecurityAlertEmailTemplate(
  userName: string,
  alertType: string,
  details: string
): { subject: string; html: string; text: string } {
  return {
    subject: "SecureAuth Security Alert",
    html: `
      <h2>Security Alert</h2>
      <p>Hi ${userName},</p>
      <p>We detected unusual activity on your SecureAuth account.</p>
      <p><strong>Alert Type:</strong> ${alertType}</p>
      <p><strong>Details:</strong> ${details}</p>
      <p>If this wasn't you, please change your password immediately and enable two-factor authentication.</p>
      <a href="https://secureauth.com/profile/security" style="
        display: inline-block;
        background-color: #dc2626;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 4px;
        margin: 20px 0;
      ">Review Security Settings</a>
    `,
    text: `
      Security Alert
      
      Hi ${userName},
      
      We detected unusual activity on your SecureAuth account.
      
      Alert Type: ${alertType}
      Details: ${details}
      
      If this wasn't you, please change your password immediately and enable two-factor authentication.
    `,
  };
}
