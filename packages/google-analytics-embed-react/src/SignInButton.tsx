import * as React from 'react';
import GoogleAnalyticsContext, { GoogleAnalyticsContextContent } from './GoogleAnalyticsContext';

/**
 * Put this component where you want to render the sign in button
 * when using the frontend authentication
 */
class SignInButton extends React.Component {
  static contextType = GoogleAnalyticsContext;
  protected container: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.container = React.createRef();
  }

  componentDidMount() {
    const [_, setAuthButton] = this.context as GoogleAnalyticsContextContent;
    setAuthButton(this.container.current as HTMLElement);
  }

  render(): React.ReactNode {
    return <div ref={this.container}></div>;
  }
}

export default SignInButton;
