import {
  GoogleAnalyticsLineChart,
  GoogleAnalyticsPieChart,
  GoogleAnalyticsProvider,
  GoogleAnalyticsTable,
  ViewSelector
} from 'google-analytics-embed-react';
import * as React from 'react';

let client: google.accounts.oauth2.TokenClient | null = null;

function App(): React.ReactElement {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [ids, setIds] = React.useState<string | null>(null);

  React.useEffect(() => {
    const js = document.createElement('script');
    const fs = document.getElementsByTagName('script')[0];
    js.src = 'https://accounts.google.com/gsi/client';
    js.defer = true;
    js.async = true;
    fs.parentNode?.insertBefore(js, fs);
    js.onload = () => {
      const oauth2 = window.google.accounts.oauth2;
      window.google = undefined as any;
      client = oauth2.initTokenClient({
        client_id: process.env.REACT_APP_CLIENT_ID as string,
        scope: 'https://www.googleapis.com/auth/analytics.readonly',
        callback: (tokenResponse) => {
          setAccessToken(tokenResponse.access_token);
        }
      });
    };
  }, []);

  const getToken = (): void => {
    client?.requestAccessToken();
  };

  return (
    <div>
      <button onClick={getToken}> Get Access Token </button>
      <GoogleAnalyticsProvider accessToken={accessToken == null ? undefined : accessToken}>
        <div>
          My Analytics Component
          <hr />
          <ViewSelector onChange={setIds} />
          {ids != null ? (
            <>
              <GoogleAnalyticsLineChart
                query={{
                  ids, // <-- Replace with the ids value for your view.
                  'start-date': '90daysAgo',
                  'end-date': 'today',
                  metrics: 'ga:sessions,ga:users',
                  dimensions: 'ga:date'
                }}
                width={500}
                style={{ float: 'left' }}
              />
              <GoogleAnalyticsPieChart
                query={{
                  ids, // <-- Replace with the ids value for your view.
                  'start-date': '90daysAgo',
                  'end-date': 'today',
                  metrics:
                    'ga:pageviews,ga:uniquePageviews,ga:timeOnPage,ga:bounces,ga:entrances,ga:exits',
                  sort: '-ga:pageviews',
                  dimensions: 'ga:pagePath',
                  'max-results': 10
                }}
                width={500}
                style={{ float: 'left' }}
                pieHole={0.4}
              />
              <GoogleAnalyticsTable
                query={{
                  ids, // <-- Replace with the ids value for your view.
                  'start-date': '90daysAgo',
                  'end-date': 'today',
                  metrics: 'ga:sessions,ga:users',
                  dimensions: 'ga:date'
                }}
                width={500}
              />
            </>
          ) : null}
        </div>
      </GoogleAnalyticsProvider>
    </div>
  );
}

export default App;
