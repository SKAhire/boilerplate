"use server";

import type { SignupFormData, LoginFormData } from "@/lib/types";

// Signup server action
export async function signupAction(data: SignupFormData) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Signup failed");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An error occurred during signup");
  }
}

// Login server action
export async function loginAction(data: LoginFormData) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An error occurred during login");
  }
}

// Logout server action
export async function logoutAction() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/auth/logout`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An error occurred during logout");
  }
}

// Forgot password server action
export async function forgotPasswordAction(email: string) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to send reset email");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error("An error occurred");
  }
}

// Verify OTP server action
export async function verifyOTPAction(email: string, otp_code: string) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/auth/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp_code }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "OTP verification failed");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An error occurred during OTP verification");
  }
}

// Update profile server action
export async function updateProfileAction(data: {
  full_name: string;
  username: string;
  email: string;
}) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Profile update failed");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An error occurred during profile update");
  }
}

// Change password server action
export async function changePasswordAction(data: {
  current_password: string;
  new_password: string;
}) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/profile/password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Password change failed");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An error occurred during password change");
  }
}

// Get security settings server action
export async function getSecuritySettingsAction() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/profile/security`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch security settings");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An error occurred fetching security settings");
  }
}

// Update security settings server action
export async function updateSecuritySettingsAction(data: {
  totp_enabled: boolean;
  email_otp_enabled: boolean;
}) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/profile/security`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Security settings update failed");
    }

    return await response.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("An error occurred updating security settings");
  }
}
