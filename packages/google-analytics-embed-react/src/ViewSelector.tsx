import * as React from 'react';
import GoogleAnalyticsContext, { GoogleAnalyticsState } from './GoogleAnalyticsContext';

export interface ViewSelectorProps {
  /** Callback to fire after user changed the view */
  onChange?: (ids: string) => void;
  /** Placeholder to show until a user authenticating */
  children?: React.ReactNode;
  /** Styles for the container element */
  style?: React.CSSProperties;
  /** Class name for the container element */
  className?: string;
}

/**
 * ViewSelector component will allow users to select their GA views.
 * onChange method will fire after a user changed the view
 */
export default class ViewSelector extends React.Component<ViewSelectorProps> {
  public static contextType = GoogleAnalyticsContext;
  private readonly elementRef: React.RefObject<HTMLDivElement>;
  private googleViewSelector: gapi.analytics.ViewSelector | null;

  constructor(props: ViewSelectorProps) {
    super(props);

    this.elementRef = React.createRef();
    this.googleViewSelector = null;
  }

  componentDidUpdate() {
    const gaState = this.context as GoogleAnalyticsState;
    if (gaState == 'AUTH_SUCCESS') {
      if (this.googleViewSelector == null) {
        this.googleViewSelector = new gapi.analytics.ViewSelector({
          container: this.elementRef.current as HTMLElement
        });
        this.googleViewSelector.execute();
        if (this.props.onChange != null) {
          this.googleViewSelector.on('change', this.props.onChange);
        }
      }
    } else if (this.googleViewSelector != null) {
      this.googleViewSelector = null;
    }
  }

  render(): React.ReactNode {
    return (
      <div style={this.props.style} className={this.props.className} ref={this.elementRef}>
        {this.googleViewSelector == null ? this.props.children : undefined}
      </div>
    );
  }
}
