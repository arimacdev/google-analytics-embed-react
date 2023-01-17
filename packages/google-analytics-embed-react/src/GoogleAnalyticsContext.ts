import { createContext } from 'react';

// INITIALIZED -> LOADING -> PROCESSING -> READY
// -> AUTHENTICATING ->AUTH_SUCCESS
export type GoogleAnalyticsState =
  | 'INITIALIZED'
  | 'LOADING'
  | 'PROCESSING'
  | 'READY'
  | 'AUTHENTICATING'
  | 'AUTH_SUCCESS';

const GoogleAnalyticsContext = createContext<GoogleAnalyticsState | null>(null);
export default GoogleAnalyticsContext;
