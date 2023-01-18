import * as React from 'react';
import GoogleAnalyticsContext, { GoogleAnalyticsState } from './GoogleAnalyticsContext';

export interface GoogleAnalyticsProviderProps {
  children: React.ReactNode;
  /**
   * Access token to authorize to the analytics service.
   */
  accessToken?: string;
  /** Firing after the gapi script loaded and ready to use **/
  onReady?: () => void;
  /** Firing after the authenitcated to analytics service using access token **/
  onAuthenticated?: () => void;
  /** A list of Google API auth scopes that your application is requesting **/
  scopes?: string[];
  /**
   * Indicates whether the scopes option replaces the default Embed API
   * scopes or adds to them. Specifying false (the default) will add to
   * the default scopes, and specifying true will replace them with the
   * ones specified by the scopes option.
   */
  overwriteDefaultScopes?: boolean;
}

/**
 * Wrap your application logics with this provider. This provider will
 * load the google platform script and notify the child components about
 * authentication events
 */
const GoogleAnalyticsProvider: React.FC<GoogleAnalyticsProviderProps> = (
  props: GoogleAnalyticsProviderProps
): React.ReactElement => {
  // Internal state
  const [gaState, setGaState] = React.useState<GoogleAnalyticsState>('INITIALIZED');

  const { onReady, onAuthenticated } = props;
  // Importing the google platform script and
  React.useEffect(() => {
    if (document.getElementById('gaScript') == null) {
      setGaState('LOADING');
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
      js.addEventListener('load', () => {
        (g as any).load('analytics');
        setGaState('PROCESSING');
      });
    } else {
      setGaState('PROCESSING');
    }
  }, []);

  // Waiting until the google script is ready
  React.useEffect(() => {
    if (gaState === 'PROCESSING') {
      window.gapi.analytics.ready(() => {
        setGaState('READY');
        onReady?.();
      });
    }
  }, [gaState]);

  React.useEffect(() => {
    if (gaState === 'READY') {
      if (props.accessToken != null) {
        // server authorization
        setGaState('AUTHENTICATING');

        gapi.analytics.auth.authorize({
          serverAuth: {
            access_token: props.accessToken
          },
          scopes: props.scopes,
          overwriteDefaultScopes: props.overwriteDefaultScopes
        });
        setGaState('AUTH_SUCCESS');
        onAuthenticated?.();
      }
    }
  }, [props.accessToken, gaState]);
  return (
    <GoogleAnalyticsContext.Provider value={gaState}>
      <div>{props.children}</div>
    </GoogleAnalyticsContext.Provider>
  );
};

export default GoogleAnalyticsProvider;
