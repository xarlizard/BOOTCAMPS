import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="container">
            <div className="card">
              <div className="card-content">
                <h1 className="heading-2">¡Oops! Algo salió mal</h1>
                <p className="text-lg mb-4">
                  Ha ocurrido un error inesperado en la aplicación.
                </p>
                <div className="error-details">
                  <details>
                    <summary className="btn btn-secondary btn-sm">
                      Ver detalles del error
                    </summary>
                    <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
                      {this.state.error?.toString()}
                    </pre>
                  </details>
                </div>
                <div className="mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => window.location.reload()}
                  >
                    Recargar página
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}