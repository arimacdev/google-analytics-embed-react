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

| Name                     | Type                 | Default   | Optional | Description                                                                           |
| ------------------------ | -------------------- | --------- | -------- | ------------------------------------------------------------------------------------- |
| `accessToken`            | string               | undefined | No\*     | Access token to authroize the user                                                    |
| `onReady`                | callback, `()=>void` | undefined | Yes      | Fired once the Google platform script loaded and gapi is ready to use.                |
| `onAuthenticated`        | callback, `()=>void` | undefined | Yes      | Fired once the Google Analytics API authenticated the access token                    |
| `scopes`                 | array, `string[]`    | undefined | Yes      | Additional scopes to include                                                          |
| `overwriteDefaultScopes` | boolean              | false     | Yes      | Overwrite the scopes passed when generating the access token with the provided scopes |
| `children`               | `JSX.Element`        | N/A       | No       | Child elements of the application to render inside the provider                       |

### ViewSelector

This is the react implementation of the [View
Selector](https://developers.google.com/analytics/devguides/reporting/embed/v1/component-reference#viewselector).
Users can select their Google Analytics view from the select boxes. Then
you will be notified by the `onChange` callback.

#### Props

| Name        | Type                          | Default   | Optional | Description                                                                                                                       |
| ----------- | ----------------------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`  | callback, `(string)=>void`    | undefined | Yes      | Fired at the component initialization time and the user changed the view. The first argument is the view id in `ga:xxxxx` format. |
| `children`  | `JSX.Element`                 | undefined | Yes      | An optional placeholder to show until the gapi is being ready                                                                     |
| `style`     | object, `React.CSSProperties` | undefined | Yes      | CSS styles to pass to the container element.                                                                                      |
| `className` | string                        | undefined | Yes      | Class name to pass to the container element                                                                                       |

### DataChart

`GoogleAnalyticsLineChart`, `GoogleAnalyticsBarChart`,
`GoogleAnalyticsColumnChart`, `GoogleAnalyticsGeoChart`,
`GoogleAnalyticsPieChart` , `GoogleAnalyticsTable` components will help
you to visualize the Google Analytics Data by using the
`google.visualization` API. All of those components extended to the same
`DataChart` component and the props are common for all components.

#### Props

| Name        | Type                           | Default   | Optional | Description                                                                                                                                                                                                                                                                                               |
| ----------- | ------------------------------ | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query`     | object, `gapi.analytics.Query` | N/A       | No       | Refer the [Google Core Reporting API](https://developers.google.com/analytics/devguides/reporting/core/v3/reference#q_summary) for more details about the properties and filterations.                                                                                                                    |
| `children`  | `JSX.Element`                  | undefined | Yes      | An optional placeholder to show until the gapi is being ready                                                                                                                                                                                                                                             |
| `style`     | object, `React.CSSProperties`  | undefined | Yes      | CSS styles to pass to the container element.                                                                                                                                                                                                                                                              |
| `className` | string                         | undefined | Yes      | Class name to pass to the container element                                                                                                                                                                                                                                                               |
| `onSuccess` | callback, `(object)=>void`     | undefined | Yes      | Fired when the chart successfully rendered and the Reporting API call success. First argument is a response object that returning from Reporting API. Check this [page](https://developers.google.com/analytics/devguides/reporting/core/v3/reference#data_response) for more details.                    |
| `onError`   | callback, `(object)=>void`     | undefined | Yes      | Fired when an error occured during the rendering the chart or a error response received from the Reporting API. The first argument contains the error object. Refer this [page](https://developers.google.com/analytics/devguides/reporting/core/v3/errors) for more details about error response object. |
| . . .       | object                         | undefined | Yes      | Google Chart options depending on the chart type. Refer the [Google Charts Guides](https://developers.google.com/chart/interactive/docs) to get a knowledge about options needed for different chart types.                                                                                               |

### Data

This is the implementation for
[Data](https://developers.google.com/analytics/devguides/reporting/embed/v1/component-reference#data)
component. We implemented it as a helper method to fetch Reporting data
manually.

```
fetchData(query: Query): Promise<SuccessResponse>
```

This method will return a Promise which resolve when the Reporting API
returned a [success response](https://developers.google.com/analytics/devguides/reporting/core/v3/reference#data_response).
And it will be rejected if the Reporting API returned an [error
response](https://developers.google.com/analytics/devguides/reporting/core/v3/errors).
This method will take a [query](https://developers.google.com/analytics/devguides/reporting/core/v3/reference#q_summary) as the only argument.

