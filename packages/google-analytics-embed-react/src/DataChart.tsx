import * as React from 'react';
import GoogleAnalyticsContext, { GoogleAnalyticsState } from './GoogleAnalyticsContext';

export type DataChartProps<T> = {
  /** Query */
  query: gapi.analytics.Query;
  /** Placeholder if a user not authenticated yet */
  children?: React.ReactNode;
  /** Styles to the container element */
  style?: React.CSSProperties;
  /** Class name to use on the container element */
  className?: string;
  /** Firing after the data chart successfully rendered */
  onSuccess?: (result: gapi.analytics.googleCharts.DataChartSuccessResult) => void;
  /**
   * Fired when an error occurs during the query or rendering process. If you
   * want to get the error message from the response object it will be at
   * response.error.message.
   */
  onError?: (response: gapi.analytics.ErrorResponse) => void;
} & T;

class DataChart<O> extends React.Component<DataChartProps<O>> {
  private readonly elementRef: React.RefObject<HTMLDivElement>;
  private googleDataChart: gapi.analytics.googleCharts.DataChart | null;
  private readonly chartType: string;

  constructor(type: string, props: DataChartProps<O>) {
    super(props);
    this.elementRef = React.createRef();
    this.googleDataChart = null;
    this.chartType = type;
  }

  componentDidMount(): void {
    this.componentDidUpdate();
  }

  componentDidUpdate(): void {
    const gaState = this.context as GoogleAnalyticsState;
    const { query, children, style, className, onSuccess, onError, ...chartOptions } = this.props;
    // Rendering the component only if a user authenticated
    if (gaState === 'AUTH_SUCCESS') {
      // Updating the existing chart with new options if already rendered
      if (this.googleDataChart != null) {
        this.googleDataChart.set({
          query,
          chart: {
            container: this.elementRef.current as HTMLElement,
            type: this.chartType as any,
            options: chartOptions as any
          }
        });
        this.googleDataChart.execute();
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

        if (onSuccess != null) {
          this.googleDataChart.on('success', onSuccess);
        }

        if (onError != null) {
          this.googleDataChart.on('error', onError);
        }

        this.googleDataChart.execute();
      }
    } else if (this.googleDataChart != null) {
      // Destroying the chart if the authentication method changed
      this.googleDataChart = null;
    }
  }

  render(): React.ReactNode {
    return (
      <div style={this.props.style} className={this.props.className} ref={this.elementRef}>
        {this.googleDataChart == null ? this.props.children : undefined}
      </div>
    );
  }
}

DataChart.contextType = GoogleAnalyticsContext;
export default DataChart;
