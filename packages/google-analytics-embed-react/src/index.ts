import DataChart, { DataChartProps } from './DataChart';
export {
  default as GoogleAnalyticsProvider,
  GoogleAnalyticsProviderProps
} from './GoogleAnalyticsProvider';
export { DataChartProps } from './DataChart';
export { default as ViewSelector, ViewSelectorProps } from './ViewSelector';

export type LineChartOptions = google.visualization.LineChartOptions;
export class GoogleAnalyticsLineChart extends DataChart<LineChartOptions> {
  constructor(props: DataChartProps<LineChartOptions>) {
    super('LINE', props);
  }
}

export type BarChartOptions = google.visualization.BarChartOptions;
export class GoogleAnalyticsBarChart extends DataChart<BarChartOptions> {
  constructor(props: DataChartProps<BarChartOptions>) {
    super('BAR', props);
  }
}

export type ColumnChartOptions = google.visualization.ColumnChartOptions;
export class GoogleAnalyticsColumnChart extends DataChart<ColumnChartOptions> {
  constructor(props: DataChartProps<ColumnChartOptions>) {
    super('COLUMN', props);
  }
}

export type GeoChartOptions = google.visualization.GeoChartOptions;
export class GoogleAnalyticsGeoChart extends DataChart<GeoChartOptions> {
  constructor(props: DataChartProps<GeoChartOptions>) {
    super('GEO', props);
  }
}

export type PieChartOptions = google.visualization.PieChartOptions;
export class GoogleAnalyticsPieChart extends DataChart<PieChartOptions> {
  constructor(props: DataChartProps<PieChartOptions>) {
    super('PIE', props);
  }
}

export type TableOptions = google.visualization.TableOptions;
export class GoogleAnalyticsTable extends DataChart<TableOptions> {
  constructor(props: DataChartProps<TableOptions>) {
    super('TABLE', props);
  }
}

export type DataChartSuccessResult = gapi.analytics.googleCharts.DataChartSuccessResult;

export type Query = gapi.analytics.Query;
export type SuccessResponse = gapi.analytics.SuccessResponse;
export type ErrorResponse = gapi.analytics.ErrorResponse;

/**
 * Manually fetching a data by using a query. This function will return a promise.
 * Once it resolved you can get a SuccessResponse. Otherwise you will get
 * an ErrorResponse. This method will not guarantee that the gapi API is loaded
 * when you are calling the API. So do not use this until the entire site loaded.
 */
export const fetchData = async (query: Query): Promise<SuccessResponse> => {
  return await new Promise(function (resolve, reject) {
    gapi.analytics.ready(() => {
      let data: gapi.analytics.report.Data | null = new gapi.analytics.report.Data({ query });
      data.once('success', (res) => {
        data = null;
        resolve(res);
      });
      data.once('error', (res) => {
        data = null;
        reject(res);
      });
      data.execute();
    });
  });
};
