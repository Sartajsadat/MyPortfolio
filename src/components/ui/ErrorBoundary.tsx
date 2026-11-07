import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

/** Keeps one broken section from taking down the whole page. */
export class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.name ?? 'section'}]`, error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="container max-w-site py-16">
            <div className="card p-8 text-center text-sm text-muted">This section couldn't be displayed. Please refresh the page.</div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
