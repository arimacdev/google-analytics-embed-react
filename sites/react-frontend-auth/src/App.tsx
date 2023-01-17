import {
  GoogleAnalyticsLineChart,
  GoogleAnalyticsProvider,
  ViewSelector,
} from "google-analytics-embed-react";
import * as React from "react";

var client: google.accounts.oauth2.TokenClient | null = null;

function App() {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const js = document.createElement("script");
    const fs = document.getElementsByTagName("script")[0];
    js.src = "https://accounts.google.com/gsi/client";
    js.defer = true;
    js.async = true;
    fs.parentNode?.insertBefore(js, fs);
    js.onload = () => {
      const oauth2 = window.google.accounts.oauth2;
      window.google = undefined as any;
      client = oauth2.initTokenClient({
        client_id: process.env.REACT_APP_CLIENT_ID as string,
        scope: "https://www.googleapis.com/auth/analytics.readonly",
        callback: (tokenResponse) => {
          setAccessToken(tokenResponse.access_token);
        },
      });
    };
  }, []);

  const getToken = () => client && client.requestAccessToken();

  return (
    <div>
      <button onClick={getToken}> Get Access Token </button>
      <GoogleAnalyticsProvider accessToken={accessToken || undefined}>
        <div>
          My Analytics Component
          <hr />
          <GoogleAnalyticsLineChart
            query={{
              ids: "ga:213762800", // <-- Replace with the ids value for your view.
              "start-date": "90daysAgo",
              "end-date": "today",
              metrics: "ga:sessions,ga:users",
              dimensions: "ga:date",
            }}
            width={500}
          />
              <ViewSelector onChange={console.log} />
        </div>
      </GoogleAnalyticsProvider>
    </div>
  );
}

export default App;
