import * as React from 'react';
import GoogleAnalyticsContext, { GoogleAnalyticsContextContent } from './GoogleAnalyticsContext';

export type DataChartProps<T> = {
  /** Query */
  query: gapi.analytics.Query;
  /** Placeholder if a user not authenticated yet */
  children?: React.ReactNode;
  /** Styles to the container element */
  style?: React.CSSProperties;
} & T;

export default class DataChart<O> extends React.Component<DataChartProps<O>> {
  public static contextType = GoogleAnalyticsContext;
  private readonly elementRef: React.RefObject<HTMLDivElement>;
  private googleDataChart: gapi.analytics.googleCharts.DataChart | null;
  private readonly chartType: string;

  constructor(type: string, props: DataChartProps<O>) {
    super(props);
    this.elementRef = React.createRef();
    this.googleDataChart = null;
    this.chartType = type;
  }

  componentDidUpdate() {
    const [gaState, _] = this.context as GoogleAnalyticsContextContent;
    const { query, children, style, ...chartOptions } = this.props;
    // Rendering the component only if a user authenticated
    if (gaState == 'AUTH_SUCCESS') {
      // Updating the existing chart with new options if already rendered
      if (this.googleDataChart) {
        this.googleDataChart.set({
          query,
          chart: {
            container: this.elementRef.current as HTMLElement,
            type: this.chartType as any,
            options: chartOptions as any
          }
        });
      } else {
        // Creating a chart if a chart instance not created
        this.googleDataChart = new gapi.analytics.googleCharts.DataChart({
          query,
          chart: {
            container: this.elementRef.current as HTMLElement,
            type: this.chartType as any,
            options: chartOptions as any
          }
        });
        this.googleDataChart.execute();
      }
    } else if (this.googleDataChart) {
      // Destroying the chart if the authentication method changed
      this.googleDataChart = null;
    }
  }

  render(): React.ReactNode {
    return (
      <div ref={this.elementRef}>{!this.googleDataChart ? this.props.children : undefined}</div>
    );
  }
}
