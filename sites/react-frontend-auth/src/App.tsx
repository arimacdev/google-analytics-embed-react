import {
  GoogleAnalyticsProvider,
  SignInButton,
} from "google-analytics-embed-react";

function App() {
  return (
    <div>
      <GoogleAnalyticsProvider clientId={__GAPI_CLIENT_ID__}>
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
