import {
  GoogleAnalyticsLineChart,
  GoogleAnalyticsProvider,
} from "google-analytics-embed-react";
import * as React from "react";
import axios from "axios";

function App() {
  const [accessToken, setAccessToken] = React.useState<null | string>(null);

  React.useEffect(() => {
    axios.get("http://localhost:8001/obtain-access-token").then((res) => {
      setAccessToken(res.data.access_token);
    });
  }, []);

  return (
    <div>
      <GoogleAnalyticsProvider accessToken={accessToken || undefined}>
        <div>
          My Analytics Component
          <hr />
          <GoogleAnalyticsLineChart
            query={{
              ids: "ga:283101882", // <-- Replace with the ids value for your view.
              "start-date": "90daysAgo",
              "end-date": "today",
              metrics: "ga:sessions,ga:users",
              dimensions: "ga:date",
            }}
            width={500}
          />
        </div>
      </GoogleAnalyticsProvider>
    </div>
  );
}

export default App;
