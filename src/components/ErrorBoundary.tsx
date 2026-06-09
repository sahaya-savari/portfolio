import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/60 font-body text-lg mb-4">Something went wrong loading this component.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="liquid-glass px-6 py-3 rounded-full font-body font-medium text-sm text-white/80 hover:text-white transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
