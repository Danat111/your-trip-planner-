/**
 * Performance Optimization Module
 * 
 * This module provides utilities for optimizing performance in the Your Trip Planner application,
 * including memoization, lazy loading, and resource management.
 */

import React, { lazy, Suspense, useCallback, useMemo, useState, useEffect } from 'react';

// Type definitions
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  apiCallTime: number;
  totalTime: number;
}

interface LazyComponentProps {
  importFunc: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: React.ReactNode;
  [key: string]: any;
}

// Default loading component
const DefaultLoading = () => (
  <div className="w-full h-full flex items-center justify-center">
    Loading...
  </div>
);

// Component for lazy loading with fallback
export function LazyComponent(props: LazyComponentProps) {
  const { importFunc, fallback, ...rest } = props;
  
  // Use the provided fallback or default loading component
  const fallbackElement = fallback || <DefaultLoading />;
  
  const LazyLoadedComponent = useMemo(() => lazy(importFunc), [importFunc]);
  
  return (
    <Suspense fallback={fallbackElement}>
      <LazyLoadedComponent {...rest} />
    </Suspense>
  );
}

// Hook for measuring performance
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    apiCallTime: 0,
    totalTime: 0
  });
  
  const startMeasurement = useCallback((label: string) => {
    performance.mark(`${label}-start`);
    return () => {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
      const entries = performance.getEntriesByName(label, 'measure');
      const duration = entries.length > 0 ? entries[0].duration : 0;
      
      setMetrics(prev => ({
        ...prev,
        [label + 'Time']: duration,
        totalTime: prev.totalTime + duration
      }));
      
      // Clean up marks
      performance.clearMarks(`${label}-start`);
      performance.clearMarks(`${label}-end`);
      performance.clearMeasures(label);
    };
  }, []);
  
  return {
    metrics,
    startMeasurement
  };
}

// Image optimization utility
export function getOptimizedImageUrl(url: string, width?: number, height?: number, format?: 'webp' | 'jpeg' | 'png'): string {
  if (!url) return '';
  
  // If it's already an optimized URL, return as is
  if (url.includes('image-optimizer')) {
    return url;
  }
  
  // For external URLs, we can't optimize
  if (url.startsWith('http') && !url.includes(window.location.hostname)) {
    return url;
  }
  
  // For local images, add optimization parameters
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (format) params.append('f', format);
  
  // Add image optimization path
  const urlObj = new URL(url, window.location.origin);
  urlObj.pathname = `/image-optimizer${urlObj.pathname}`;
  urlObj.search = params.toString();
  
  return urlObj.toString();
}

// Resource preloading utility
export function preloadResources(resources: Array<{ type: 'image' | 'script' | 'style' | 'font', url: string }>) {
  resources.forEach(resource => {
    switch (resource.type) {
      case 'image':
        const img = new Image();
        img.src = resource.url;
        break;
      case 'script':
        const script = document.createElement('link');
        script.rel = 'preload';
        script.as = 'script';
        script.href = resource.url;
        document.head.appendChild(script);
        break;
      case 'style':
        const style = document.createElement('link');
        style.rel = 'preload';
        style.as = 'style';
        style.href = resource.url;
        document.head.appendChild(style);
        break;
      case 'font':
        const font = document.createElement('link');
        font.rel = 'preload';
        font.as = 'font';
        font.href = resource.url;
        font.crossOrigin = 'anonymous';
        document.head.appendChild(font);
        break;
    }
  });
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Memory management utility
export function useMemoryManagement<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  
  // Clean up large objects when component unmounts
  useEffect(() => {
    return () => {
      setValue(null as unknown as T);
    };
  }, []);
  
  return [value, setValue] as const;
}

// Export all utilities
export default {
  LazyComponent,
  usePerformanceMonitor,
  getOptimizedImageUrl,
  preloadResources,
  debounce,
  throttle,
  useMemoryManagement
};
