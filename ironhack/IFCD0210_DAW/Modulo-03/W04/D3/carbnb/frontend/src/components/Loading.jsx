export function LoadingSpinner({ size = 'md', text = 'Cargando...' }) {
  const sizeClass = {
    sm: { width: '1rem', height: '1rem' },
    md: { width: '2rem', height: '2rem' },
    lg: { width: '3rem', height: '3rem' }
  };

  return (
    <div className="loading" role="status" aria-label={text}>
      <div 
        className="spinner"
        style={sizeClass[size]}
      />
      {text && (
        <span className="text-sm" style={{ marginLeft: '0.5rem' }}>
          {text}
        </span>
      )}
    </div>
  );
}

export function LoadingSkeleton({ lines = 3, title = false }) {
  return (
    <div className="skeleton-container" style={{ padding: '1rem' }}>
      {title && <div className="skeleton skeleton-title" />}
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="skeleton skeleton-text" />
      ))}
    </div>
  );
}

export function ItemCardSkeleton() {
  return (
    <div className="card">
      <div className="card-content">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text" />
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          marginTop: '1rem' 
        }}>
          <div className="skeleton" style={{ 
            width: '60px', 
            height: '24px', 
            borderRadius: '12px' 
          }} />
          <div className="skeleton" style={{ 
            width: '80px', 
            height: '24px', 
            borderRadius: '12px' 
          }} />
          <div className="skeleton" style={{ 
            width: '50px', 
            height: '24px', 
            borderRadius: '12px' 
          }} />
        </div>
      </div>
    </div>
  );
}