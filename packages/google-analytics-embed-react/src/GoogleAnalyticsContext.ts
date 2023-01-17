import { createContext } from 'react';

// INITIALIZED -> LOADING -> PROCESSING -> READY
// -> AUTHENTICATING -> AUTH_ERROR/AUTH_SUCCESS
export type GoogleAnalyticsState =
  | 'INITIALIZED'
  | 'LOADING'
  | 'PROCESSING'
  | 'READY'
  | 'AUTHENTICATING'
  | 'SIGNOUT'
  | 'AUTH_ERROR'
  | 'AUTH_SUCCESS';

export type GoogleAnalyticsContextContent = [GoogleAnalyticsState, (el: HTMLElement | null) => void];
const GoogleAnalyticsContext = createContext<GoogleAnalyticsContextContent | null>(null);
export default GoogleAnalyticsContext;
