import { googleContext } from "./GoogleAnalyticsContext";
import * as React from "react";

class SignInButton extends React.Component {
  protected container: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.container = React.createRef();
  }

  componentDidMount() {
    googleContext.setAuthButton(this.container.current as HTMLElement);
  }

  render(): React.ReactNode {
    return <div ref={this.container}></div>;
  }
}

export default SignInButton;
