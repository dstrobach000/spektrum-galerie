"use client";

import { useEffect, useState } from "react";

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<{
    fps: number;
    memory: number;
    longTasks: number;
  }>({ fps: 0, memory: 0, longTasks: 0 });

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let frameCount = 0;
    let lastTime = performance.now();
    let longTaskCount = 0;

    // Monitor FPS
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({ ...prev, fps: Math.round((frameCount * 1000) / (currentTime - lastTime)) }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'longtask') {
            longTaskCount++;
            setMetrics(prev => ({ ...prev, longTasks: longTaskCount }));
          }
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    }

    // Monitor memory
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as { memory?: { usedJSHeapSize: number } }).memory;
        if (memory) {
          setMetrics(prev => ({ 
            ...prev, 
            memory: Math.round(memory.usedJSHeapSize / 1024 / 1024) 
          }));
        }
      }
    };

    measureFPS();
    measureMemory();
    
    const interval = setInterval(measureMemory, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-2 text-xs font-mono z-50 rounded">
      <div>FPS: {metrics.fps}</div>
      <div>Memory: {metrics.memory}MB</div>
      <div>Long Tasks: {metrics.longTasks}</div>
    </div>
  );
}
