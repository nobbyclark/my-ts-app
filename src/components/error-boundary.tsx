import React, { Component, ErrorInfo, ReactNode } from "react";
import { reportError } from "../api/api";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public constructor(props: Props) {
    super(props);

    this.tryAgain = this.tryAgain.bind(this);
  }

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    reportError(error, errorInfo);
  }

  public tryAgain() {
    this.setState({ hasError: false });
  }

  public render() {
    return this.state.hasError ? (
      <div>
        <div role="alert">There was a problem.</div>
        <button onClick={this.tryAgain}>Try again?</button>
      </div>
    ) : (
      this.props.children
    );
  }
}

export { ErrorBoundary };
