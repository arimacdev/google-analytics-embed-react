import {
  GoogleAnalyticsLineChart,
  GoogleAnalyticsPieChart,
  GoogleAnalyticsProvider,
  GoogleAnalyticsTable,
  ViewSelector
} from 'google-analytics-embed-react';
import * as React from 'react';
import axios from 'axios';

function App(): React.ReactElement {
  const [accessToken, setAccessToken] = React.useState<null | string>(null);
  const [ids, setIds] = React.useState<string | null>(null);

  React.useEffect(() => {
    axios
      .get('http://localhost:8001/obtain-access-token')
      .then((res) => {
        setAccessToken(res.data.access_token);
      })
      .catch(() => {
        console.error('Error occured while retrieving the access token');
      });
  }, []);

  return (
    <div>
      <GoogleAnalyticsProvider accessToken={accessToken != null ? accessToken : undefined}>
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
