import {
  GoogleAnalyticsProvider,
  SignInButton,
} from "google-analytics-embed-react";
import * as React from "react";

function App() {
  console.log(process.env.REACT_APP_CLIENT_ID);
  return (
    <div>
      <GoogleAnalyticsProvider clientId={process.env.REACT_APP_CLIENT_ID}>
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
