import type { User } from "@/lib/types"

/**
 * Session payload structure
 */
export interface SessionPayload {
  userId: string
  email: string
  username: string
  iat: number
  exp: number
}

/**
 * Create session from user data
 */
export function createSessionPayload(user: User, expiresIn = 86400): SessionPayload {
  const now = Math.floor(Date.now() / 1000)
  return {
    userId: user.id,
    email: user.email,
    username: user.username,
    iat: now,
    exp: now + expiresIn,
  }
}

/**
 * Check if session is valid (not expired)
 */
export function isSessionValid(payload: SessionPayload): boolean {
  const now = Math.floor(Date.now() / 1000)
  return payload.exp > now
}

/**
 * Get session remaining time in seconds
 */
export function getSessionRemainingTime(payload: SessionPayload): number {
  const now = Math.floor(Date.now() / 1000)
  return Math.max(0, payload.exp - now)
}

/**
 * Refresh session expiration
 */
export function refreshSession(payload: SessionPayload, expiresIn = 86400): SessionPayload {
  const now = Math.floor(Date.now() / 1000)
  return {
    ...payload,
    iat: now,
    exp: now + expiresIn,
  }
}
