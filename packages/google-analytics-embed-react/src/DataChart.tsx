import * as React from 'react';
import GoogleAnalyticsContext, { GoogleAnalyticsContextContent } from './GoogleAnalyticsContext';

export type DataChartProps<T> = {
  query: any;
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
    const { query, ...chartOptions } = this.props;
    if (gaState == 'AUTH_SUCCESS') {
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
      this.googleDataChart = null;
    }
  }

  render(): React.ReactNode {
    return <div ref={this.elementRef}></div>;
  }
}
