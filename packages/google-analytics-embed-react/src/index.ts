export {
  default as GoogleAnalyticsProvider,
  GoogleAnalyticsProviderProps
} from './GoogleAnalyticsProvider';
export { default as SignInButton } from './SignInButton';
import { default as DataChart, DataChartProps } from './DataChart';
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

export type TableOptions = google.visualization.TableOptions;
export class GoogleAnalyticsTable extends DataChart<TableOptions> {
  constructor(props: DataChartProps<TableOptions>) {
    super('TABLE', props);
  }
}
