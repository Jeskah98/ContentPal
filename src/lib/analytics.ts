import { analytics } from '@/lib/firebase'
import { logEvent } from 'firebase/analytics'

export const trackEvent = (eventName: string, params?: object) => {
  if (typeof window !== 'undefined' && analytics) {
    logEvent(analytics, eventName, params)
  }
}

// Common Events
export const Events = {
  SIGN_UP: 'sign_up',
  CONTENT_GENERATED: 'content_generated',
  SUBSCRIPTION_STARTED: 'subscription_started'
}