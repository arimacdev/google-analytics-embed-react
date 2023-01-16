import { createContext } from "react";

interface AuthenticateUsingButton {
  type: "button";
  clientId: string;
  userInfoLabel?: string;
  scopes?: string[];
  overwriteDefaultScopes?: boolean;
}

interface AuthenticateUsingServer {
  type: "server";
  access_token: string;
  scopes?: string[];
  overwriteDefaultScopes?: boolean;
}

type AuthenticateMethod = AuthenticateUsingButton | AuthenticateUsingServer;

export type AuthenticationState =
  | "AUTHENTICATING"
  | "AUTH_ERROR"
  | "AUTH_SUCCESS"
  | "NOT_AUTHENTICATED";

export class GoogleContext {
  protected authButton?: string | HTMLElement = undefined;

  setAuthButton(button: HTMLElement) {
    this.authButton = button;
  }

  authenticate(method: AuthenticateMethod): Promise<null> {
    const authContainer = this.authButton;
    return new Promise((res, rej) => {
      window.gapi.analytics.auth.once("error", (res) => {
        rej(res);
      });
      window.gapi.analytics.auth.once("signIn", () => {
        res(null);
      });
      if (method.type === "server") {
        const rest = window.gapi.analytics.auth.authorize({
          scopes: method.scopes,
          overwriteDefaultScopes: method.overwriteDefaultScopes,
          serverAuth: {
            access_token: method.access_token,
          },
        });
        console.log(rest);
        res(null);
      } else {
          console.log(method.clientId);
        window.gapi.analytics.auth.authorize({
          container: authContainer,
          clientid: method.clientId,
          scopes: method.scopes,
          overwriteDefaultScopes: method.overwriteDefaultScopes,
          userInfoLabel: method.userInfoLabel,
        });
      }
    });
  }
}

export const googleContext = new GoogleContext();

export type GoogleAnalyticsContextContent = [AuthenticationState];
const GoogleAnalyticsContext =
  createContext<GoogleAnalyticsContextContent | null>(null);
export default GoogleAnalyticsContext;
