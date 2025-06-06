import { analytics } from '@/lib/firebase'
import { logEvent } from 'firebase/analytics'

/**
 * Tracks a user event using Firebase Analytics.
 * @param eventName The name of the event to track.
 * @param params Optional parameters to include with the event.
 */
export const trackEvent = (eventName: string, params?: object) => {
  if (typeof window !== 'undefined' && analytics) {
    logEvent(analytics, eventName, params)
  }
}

/**
 * Initializes the analytics tracking.
 */
export const initAnalytics = () => {
  // Firebase analytics is initialized in src/lib/firebase.ts
}
// Common Events
export const Events = {
  SIGN_UP: 'sign_up',
  CONTENT_GENERATED: 'content_generated',
  SUBSCRIPTION_STARTED: 'subscription_started'
}