import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.error("Application error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-page">
          <h1>Something went wrong.</h1>

          <p>
            Sorry, Addis Eats couldn't load this part of
            the application.
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="primary-button"
          >
            Try again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;