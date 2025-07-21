import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log error to an error reporting service here
    if (typeof window !== 'undefined') {
      // Optionally send error to Sentry or another service
      // Sentry.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto py-16 px-6 text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Something went wrong.</h1>
          <p className="text-lg text-gray-700 mb-6">An unexpected error occurred. Please refresh the page or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
} 