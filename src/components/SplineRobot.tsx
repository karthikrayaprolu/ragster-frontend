'use client';

import { useEffect, useRef } from 'react';

export default function SplineRobot() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!scriptLoaded.current) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.97/build/spline-viewer.js';
      document.head.appendChild(script);
      scriptLoaded.current = true;

      // Create spline-viewer element after script loads
      script.onload = () => {
        if (viewerRef.current) {
          const viewer = document.createElement('spline-viewer');
          viewer.setAttribute('url', 'https://prod.spline.design/0LsgVd1AfB9ZbPti/scene.splinecode');
          viewerRef.current.appendChild(viewer);
        }
      };
    }
  }, []);

  return (
    <div 
      ref={viewerRef}
      className="w-full h-[500px] md:h-[650px] lg:h-[700px] rounded-lg"
      style={{ minWidth: '100%' }}
    />
  );
}
