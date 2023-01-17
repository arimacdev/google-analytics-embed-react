import * as React from 'react';
import GoogleAnalyticsContext, { GoogleAnalyticsState } from './GoogleAnalyticsContext';

export interface GoogleAnalyticsProviderProps {
  children: React.ReactNode;
  /** The client ID of your project in the developers console. */
  clientId?: string;
  /**
   * If you already have a valid access token, you can pass it
   * to the authorize method directly and the user will not be
   * prompted to authorize.
   */
  accessToken?: string;
  /** Firing when a user failed to authenticate using the sign in button */
  onAuthError?: () => {};
  /** Firing when a user authenticated using the sign in button */
  onAuthSuccess?: () => {};
  /** Firing after the gapi script loaded and ready to use **/
  onReady?: () => {};
  /** A list of Google API auth scopes that your application is requesting **/
  scopes?: string[];
  /**
   * Indicates whether the scopes option replaces the default Embed API
   * scopes or adds to them. Specifying false (the default) will add to
   * the default scopes, and specifying true will replace them with the
   * ones specified by the scopes option.
   */
  overwriteDefaultScopes?: boolean;
  /**
   * The text to display before a logged in user's email address.
   * Defaults to 'You are logged in as: '.
   */
  userInfoLabel?: string;
}

const GoogleAnalyticsProvider: React.FC<GoogleAnalyticsProviderProps> = (
  props: GoogleAnalyticsProviderProps
): React.ReactElement => {
  // For frontend authentication
  const [authButton, setAuthButton] = React.useState<null | HTMLElement>(null);
  // Internal state
  const [gaState, setGaState] = React.useState<GoogleAnalyticsState>('INITIALIZED');
  // Importing the google platform script and
  React.useEffect(() => {
    if (document.getElementById('gaScript') == null) {
      setGaState('LOADING');
      const g = window.gapi || (window.gapi = {} as any);
      g.analytics = {
        q: [],
        ready(f: any) {
          this.q.push(f);
        }
      } as any;
      const js = document.createElement('script');
      const fs = document.getElementsByTagName('script')[0];
      js.src = 'https://apis.google.com/js/platform.js';
      js.id = 'gaScript';
      fs.parentNode?.insertBefore(js, fs);
      js.onload = () => {
        (g as any).load('analytics');
        setGaState('PROCESSING');
      };
    } else {
      setGaState('PROCESSING');
    }
  }, []);

  // Waiting until the google script is ready
  React.useEffect(() => {
    if (gaState == 'PROCESSING') {
      window.gapi.analytics.ready(() => {
        setGaState('READY');
      });
    }
  }, [gaState]);

  React.useEffect(() => {
    if (gaState == 'READY') {
      if (props.accessToken) {
        // server authorization
        setGaState('AUTHENTICATING');

        gapi.analytics.auth.authorize({
          serverAuth: {
            access_token: props.accessToken
          },
          scopes: props.scopes,
          overwriteDefaultScopes: props.overwriteDefaultScopes
        });
        // TODO: Currently google not returning any error if the server access token is invalid.
        // Need to do a little research to handle it.
        setGaState('AUTH_SUCCESS');
      } else if (props.clientId && authButton) {
        // button authorization
        setGaState('AUTHENTICATING');
        gapi.analytics.auth.authorize({
          clientid: props.clientId,
          container: authButton,
          userInfoLabel: props.userInfoLabel,
          scopes: props.scopes,
          overwriteDefaultScopes: props.overwriteDefaultScopes
        });

        gapi.analytics.auth.on('signIn', () => {
          setGaState('AUTH_SUCCESS');
        });

        gapi.analytics.auth.on('signOut', () => {
          setGaState('SIGNOUT');
        });

        gapi.analytics.auth.on('error', () => {
          setGaState('AUTH_ERROR');
        });
      }
    }
  }, [props.accessToken, props.clientId, gaState, authButton]);
  return (
    <GoogleAnalyticsContext.Provider value={[gaState, setAuthButton]}>
      <div>{props.children}</div>
    </GoogleAnalyticsContext.Provider>
  );
};

export default GoogleAnalyticsProvider;
