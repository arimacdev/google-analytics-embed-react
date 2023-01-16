import axios from "axios";
import {
  GoogleAnalyticsProvider,
  SignInButton,
} from "google-analytics-embed-react";
import { useEffect, useState } from "react";

function App() {
  const [accessToken, setAccessToken] = useState<null | string>(null);

  useEffect(() => {
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
          <SignInButton />
        </div>
      </GoogleAnalyticsProvider>
    </div>
  );
}

export default App;
