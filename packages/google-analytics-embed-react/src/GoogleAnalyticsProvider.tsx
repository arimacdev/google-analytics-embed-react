import * as React from "react";
import GoogleAnalyticsContext, {
    AuthenticationState,
    googleContext
} from "./GoogleAnalyticsContext";

export interface GoogleAnalyticsProviderProps {
  children: React.ReactNode;
  clientId?: string;
  accessToken?: string;
  onAuthError?: () => {};
  onAuthSuccess?: () => {};
  scopes?: string[];
  overwriteDefaultScopes?: boolean;
  userInfoLabel?: string;
}
const googleAnalyticsImport = () => {
  return new Promise((res, _rej) => {
    if (!document.getElementById("gaScript")) {
      const g = window.gapi || (window.gapi = {} as any);
      g.analytics = {
        q: [],
        ready(f: any) {
          this.q.push(f);
        },
      } as any;
      const js = document.createElement("script");
      const fs = document.getElementsByTagName("script")[0];
      js.src = "https://apis.google.com/js/platform.js";
      js.id = "gaScript";
      fs.parentNode?.insertBefore(js, fs);
      js.onload = () => {
        (g as any).load("analytics");
        window.gapi.analytics.ready(() => {
          res(null);
        });
      };
    } else {
      window.gapi.analytics.ready(() => {
        res(null);
      });
    }
  });
};

const GoogleAnalyticsProvider: React.FC<GoogleAnalyticsProviderProps> = (
  props: GoogleAnalyticsProviderProps
): React.ReactElement => {
  const [authStatus, setAuthStatus] =
    React.useState<AuthenticationState>("NOT_AUTHENTICATED");
  React.useEffect(() => {
    googleAnalyticsImport().then(() => {
      let auth = null;
      if (props.clientId) {
        auth = googleContext.authenticate({
          type: "button",
          clientId: props.clientId,
          scopes: props.scopes,
          overwriteDefaultScopes: props.overwriteDefaultScopes,
          userInfoLabel: props.userInfoLabel,
        });
      } else if (props.accessToken) {
        auth = googleContext.authenticate({
          type: "server",
          access_token: props.accessToken,
          scopes: props.scopes,
          overwriteDefaultScopes: props.overwriteDefaultScopes,
        });
      }

      if (auth) {
        setAuthStatus("AUTHENTICATING");
        auth
          .then(() => {
            console.log("Google authenticated");
            setAuthStatus("AUTH_SUCCESS");
          })
          .catch((res) => {
            console.error("Google auth error", res);
            setAuthStatus("AUTH_ERROR");
          });
      }
    });
  }, [props.accessToken, props.clientId]);
  return (
    <GoogleAnalyticsContext.Provider value={[authStatus]}>
      <div>{props.children}</div>
    </GoogleAnalyticsContext.Provider>
  );
};

export default GoogleAnalyticsProvider;
