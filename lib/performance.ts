// Performance monitoring utilities

export interface PerformanceMetric {
  name: string
  value: number
  unit: string
  timestamp: number
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []

  // Measure page load performance
  measurePageLoad() {
    if (typeof window !== 'undefined') {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        this.addMetric('DOMContentLoaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms')
        this.addMetric('LoadComplete', navigation.loadEventEnd - navigation.loadEventStart, 'ms')
        this.addMetric('FirstPaint', performance.getEntriesByName('first-paint')[0]?.startTime || 0, 'ms')
        this.addMetric('FirstContentfulPaint', performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0, 'ms')
      }
    }
  }

  // Measure custom performance metrics
  measureCustom(name: string, startTime: number, endTime: number) {
    const duration = endTime - startTime
    this.addMetric(name, duration, 'ms')
  }

  // Measure API call performance
  measureApiCall(url: string, startTime: number, endTime: number) {
    const duration = endTime - startTime
    this.addMetric(`API_${url}`, duration, 'ms')
  }

  // Add metric to the list
  addMetric(name: string, value: number, unit: string) {
    this.metrics.push({
      name,
      value,
      unit,
      timestamp: Date.now()
    })

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Performance: ${name} = ${value}${unit}`)
    }
  }

  // Get all metrics
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  // Get metrics by name
  getMetric(name: string): PerformanceMetric | undefined {
    return this.metrics.find(metric => metric.name === name)
  }

  // Clear metrics
  clearMetrics() {
    this.metrics = []
  }

  // Export metrics for analytics
  exportMetrics() {
    return {
      metrics: this.metrics,
      summary: this.getSummary()
    }
  }

  // Get performance summary
  private getSummary() {
    const apiMetrics = this.metrics.filter(m => m.name.startsWith('API_'))
    const pageMetrics = this.metrics.filter(m => !m.name.startsWith('API_'))

    return {
      totalMetrics: this.metrics.length,
      averageApiResponseTime: apiMetrics.length > 0 
        ? apiMetrics.reduce((sum, m) => sum + m.value, 0) / apiMetrics.length 
        : 0,
      averagePageLoadTime: pageMetrics.length > 0
        ? pageMetrics.reduce((sum, m) => sum + m.value, 0) / pageMetrics.length
        : 0
    }
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Utility functions
export function measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const startTime = performance.now()
  return fn().finally(() => {
    const endTime = performance.now()
    performanceMonitor.measureCustom(name, startTime, endTime)
  })
}

export function measureSync<T>(name: string, fn: () => T): T {
  const startTime = performance.now()
  const result = fn()
  const endTime = performance.now()
  performanceMonitor.measureCustom(name, startTime, endTime)
  return result
}

// Web Vitals monitoring
export function monitorWebVitals() {
  if (typeof window !== 'undefined') {
    // Monitor Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      performanceMonitor.addMetric('LCP', lastEntry.startTime, 'ms')
    })
    observer.observe({ entryTypes: ['largest-contentful-paint'] })

    // Monitor First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        performanceMonitor.addMetric('FID', (entry as PerformanceEventTiming).processingStart - entry.startTime, 'ms')
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      performanceMonitor.addMetric('CLS', clsValue, '')
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })
  }
} 