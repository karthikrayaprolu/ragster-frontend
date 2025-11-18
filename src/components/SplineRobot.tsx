'use client';


import { useEffect, useRef, useState } from 'react';

export default function SplineRobot() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const [hasError, setHasError] = useState(false);

  // Error boundary logic
  function ErrorBoundary({ children }: { children: React.ReactNode }) {
    const [error, setError] = useState<Error | null>(null);
    // Only works for errors in children components
    // For errors in external scripts, fallback to try/catch in effect
    // This is a simple boundary for runtime errors
    // eslint-disable-next-line react/display-name
    return error ? (
      <div className="flex flex-col items-center justify-center h-full text-red-500 bg-red-50 rounded-lg p-4">
        <span className="text-lg font-semibold mb-2">3D Viewer failed to load</span>
        <span className="text-sm">Please try refreshing the page or check your network connection.</span>
      </div>
    ) : (
      <ErrorCatcher onError={setError}>{children}</ErrorCatcher>
    );
  }

  // Helper component to catch errors in children
  function ErrorCatcher({ children, onError }: { children: React.ReactNode; onError: (e: Error) => void }) {
    try {
      return <>{children}</>;
    } catch (e: any) {
      onError(e);
      return null;
    }
  }

  useEffect(() => {
    if (!scriptLoaded.current) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.11.6/build/spline-viewer.js';
      script.onerror = () => setHasError(true);
      document.head.appendChild(script);
      scriptLoaded.current = true;

      script.onload = () => {
        try {
          if (viewerRef.current) {
            // Remove any previous viewer if reloading
            viewerRef.current.innerHTML = '';
            const viewer = document.createElement('spline-viewer');
            viewer.setAttribute('url', 'https://prod.spline.design/0LsgVd1AfB9ZbPti/scene.splinecode');
            viewerRef.current.appendChild(viewer);
          }
        } catch (e) {
          setHasError(true);
        }
      };
    }
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[500px] md:h-[650px] lg:h-[700px] rounded-lg bg-red-50 text-red-500">
        <span className="text-lg font-semibold mb-2">3D Viewer failed to load</span>
        <span className="text-sm">Please try refreshing the page or check your network connection.</span>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div
        ref={viewerRef}
        className="w-full h-[500px] md:h-[650px] lg:h-[700px] rounded-lg"
        style={{ minWidth: '100%' }}
      />
    </ErrorBoundary>
  );
}
