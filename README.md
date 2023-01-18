# google-analytics-embed-react

Bringing the Google Analytics Embed Components for your ReactJS admin
panels.

## Installation

```
npm install google-analytics-embed-react
```

## Examples

We implemented two examples to show you the usage of this library. One
example is using Google Identity Service to authenticate users on
frontend. Other Example is using google API client to authenticate your
service account. You need to have at-least one Google Analytics view
in your account to run those examples.

### Frontend Authentication Example

This example is using the latest Google Identity Service to
authenticate. Because recommended way is deprecated by Google ([Migrate
to Google Identity
Services](https://developers.google.com/identity/oauth2/web/guides/migration-to-gis)).
You can find the source files for this example in the
`sites/react-frontend-auth` folder.

Steps to run the example:-

1. Create a project on Google API Console and create a OAuth2 client id.
   Download and save the JSON key file to the root folder of this project
   as `oauth_key.json`.

2. Install all dependencies from the root folder of the project.

```
npm install --save-dev
```

3. Build the React library.

```
npm run reactlib:build
```

4. Run the project

```
npm run frontend_auth:start
```

### Backend Authentication Example

In this example we are using the `googleapis` client library to
authenticate from backend and sending the access token to frontend. You
need a Google Service Account to run this example. You can find the
source files for the backend example in the `sites/express-backend` and
the frontend example in the `sites/react-backend-auth` folder.

Steps to run the example:-

1. Create a project on Google API Console and create a Service Account
   for the project. You need to add the email of that service account as
   a Viewer for your Google Analytics view. Download and save the JSON
   key file to the root folder of the project as
   `service_account_key.json`.

2. Install all dependencies from the root folder of the project.

```
npm install --save-dev
```

3. Build the React library.

```
npm run reactlib:build
```

4. Run the backend ExpressJS project

```
npm run backend:start
```

5. Open another terminal and run the frontend parallely.

```
npm run backend_auth:start
```

## Usage

You need to wrap your entire app with the `GoogleAnalyitcsProvider`
component as the first step to use this library. This component will
take the `accessToken` as the only mandatory prop. But it is also
optional :smiley:. It means you do not need the accessToken in first
rendering time. But you have to pass it later to display your graphs.

```jsx
<GoogleAnalyticsProvider accessToken={myAccessToken}>
  {/* Your application components */}
</GoogleAnalyticsProvider>
```

Then render any chart component in your application.

```
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
```

## Component Reference

### GoogleAnalyticsProvider

This component will load the Google platform script and authenticate
yourself with the `gapi.analytics` namespace.

#### Props

| Name               | Type   | Default   | Optional | Description     |
| ------------------ | ------ | --------- | -------- | --------------- |
| `accessToken`      | string | undefined | No\*     | Access token to |
| authroize the user |

