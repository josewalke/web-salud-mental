interface PerformanceMetrics {
  timestamp: number;
  url: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
  performance: {
    navigationStart: number;
    loadEventEnd: number;
    domContentLoadedEventEnd: number;
    firstPaint: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
    timeToInteractive: number;
    totalBlockingTime: number;
  };
  resources: {
    totalSize: number;
    totalRequests: number;
    byType: {
      [key: string]: {
        count: number;
        size: number;
      };
    };
  };
  memory: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
  errors: Array<{
    message: string;
    filename: string;
    lineno: number;
    colno: number;
    timestamp: number;
  }>;
  userInteractions: Array<{
    type: string;
    target: string;
    timestamp: number;
    duration?: number;
  }>;
  pageVisibility: {
    isVisible: boolean;
    timeVisible: number;
    timeHidden: number;
  };
  network: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  };
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics;
  private startTime: number;
  private isMonitoring: boolean = false;
  private errorListener?: (event: ErrorEvent) => void;
  private visibilityListener?: () => void;
  private interactionListener?: (event: Event) => void;

  constructor() {
    this.startTime = performance.now();
    this.metrics = this.initializeMetrics();
  }

  private initializeMetrics(): PerformanceMetrics {
    return {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      performance: {
        navigationStart: 0,
        loadEventEnd: 0,
        domContentLoadedEventEnd: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        firstInputDelay: 0,
        cumulativeLayoutShift: 0,
        timeToInteractive: 0,
        totalBlockingTime: 0,
      },
      resources: {
        totalSize: 0,
        totalRequests: 0,
        byType: {},
      },
      memory: {
        usedJSHeapSize: 0,
        totalJSHeapSize: 0,
        jsHeapSizeLimit: 0,
      },
      errors: [],
      userInteractions: [],
      pageVisibility: {
        isVisible: !document.hidden,
        timeVisible: 0,
        timeHidden: 0,
      },
      network: {
        effectiveType: 'unknown',
        downlink: 0,
        rtt: 0,
      },
    };
  }

  public startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.startTime = performance.now();
    
    // Capturar métricas de performance
    this.capturePerformanceMetrics();
    
    // Capturar métricas de recursos
    this.captureResourceMetrics();
    
    // Capturar métricas de memoria
    this.captureMemoryMetrics();
    
    // Capturar métricas de red
    this.captureNetworkMetrics();
    
    // Configurar listeners
    this.setupErrorListener();
    this.setupVisibilityListener();
    this.setupInteractionListener();
    
    // Web Vitals
    this.captureWebVitals();
    
    console.log('🚀 Performance monitoring started');
  }

  private capturePerformanceMetrics(): void {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.performance.navigationStart = navigation.startTime;
      this.metrics.performance.loadEventEnd = navigation.loadEventEnd;
      this.metrics.performance.domContentLoadedEventEnd = navigation.domContentLoadedEventEnd;
    }

    // First Paint y First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach(entry => {
      if (entry.name === 'first-paint') {
        this.metrics.performance.firstPaint = entry.startTime;
      }
      if (entry.name === 'first-contentful-paint') {
        this.metrics.performance.firstContentfulPaint = entry.startTime;
      }
    });
  }

  private captureResourceMetrics(): void {
    const resources = performance.getEntriesByType('resource');
    let totalSize = 0;
    const byType: { [key: string]: { count: number; size: number } } = {};

    resources.forEach(resource => {
      const resourceEntry = resource as PerformanceResourceTiming;
      const size = resourceEntry.transferSize || 0;
      totalSize += size;

      const type = this.getResourceType(resourceEntry.name);
      if (!byType[type]) {
        byType[type] = { count: 0, size: 0 };
      }
      byType[type].count++;
      byType[type].size += size;
    });

    this.metrics.resources.totalSize = totalSize;
    this.metrics.resources.totalRequests = resources.length;
    this.metrics.resources.byType = byType;
  }

  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'css':
        return 'stylesheet';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'webp':
      case 'svg':
        return 'image';
      case 'woff':
      case 'woff2':
      case 'ttf':
      case 'eot':
        return 'font';
      default:
        return 'other';
    }
  }

  private captureMemoryMetrics(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memory.usedJSHeapSize = memory.usedJSHeapSize;
      this.metrics.memory.totalJSHeapSize = memory.totalJSHeapSize;
      this.metrics.memory.jsHeapSizeLimit = memory.jsHeapSizeLimit;
    }
  }

  private captureNetworkMetrics(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        this.metrics.network.effectiveType = connection.effectiveType || 'unknown';
        this.metrics.network.downlink = connection.downlink || 0;
        this.metrics.network.rtt = connection.rtt || 0;
      }
    }
  }

  private setupErrorListener(): void {
    this.errorListener = (event: ErrorEvent) => {
      this.metrics.errors.push({
        message: event.message,
        filename: event.filename || 'unknown',
        lineno: event.lineno || 0,
        colno: event.colno || 0,
        timestamp: Date.now(),
      });
    };
    window.addEventListener('error', this.errorListener);
  }

  private setupVisibilityListener(): void {
    this.visibilityListener = () => {
      this.metrics.pageVisibility.isVisible = !document.hidden;
      if (document.hidden) {
        this.metrics.pageVisibility.timeHidden = Date.now();
      } else {
        this.metrics.pageVisibility.timeVisible = Date.now();
      }
    };
    document.addEventListener('visibilitychange', this.visibilityListener);
  }

  private setupInteractionListener(): void {
    this.interactionListener = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target) {
        this.metrics.userInteractions.push({
          type: event.type,
          target: target.tagName.toLowerCase() + (target.id ? `#${target.id}` : '') + (target.className ? `.${target.className.split(' ')[0]}` : ''),
          timestamp: Date.now(),
        });
      }
    };
    
    // Capturar interacciones principales
    ['click', 'scroll', 'input', 'focus', 'blur'].forEach(eventType => {
      document.addEventListener(eventType, this.interactionListener, true);
    });
  }

  private async captureWebVitals(): Promise<void> {
    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      
      getCLS((metric) => {
        this.metrics.performance.cumulativeLayoutShift = metric.value;
      });
      
      getFID((metric) => {
        this.metrics.performance.firstInputDelay = metric.value;
      });
      
      getFCP((metric) => {
        this.metrics.performance.firstContentfulPaint = metric.value;
      });
      
      getLCP((metric) => {
        this.metrics.performance.largestContentfulPaint = metric.value;
      });
      
      getTTFB((metric) => {
        this.metrics.performance.timeToInteractive = metric.value;
      });
    } catch (error) {
      console.warn('Web Vitals not available:', error);
    }
  }

  public stopMonitoring(): void {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    
    // Remover listeners
    if (this.errorListener) {
      window.removeEventListener('error', this.errorListener);
    }
    if (this.visibilityListener) {
      document.removeEventListener('visibilitychange', this.visibilityListener);
    }
    if (this.interactionListener) {
      ['click', 'scroll', 'input', 'focus', 'blur'].forEach(eventType => {
        document.removeEventListener(eventType, this.interactionListener!, true);
      });
    }
    
    console.log('🛑 Performance monitoring stopped');
  }

  public getMetrics(): PerformanceMetrics {
    // Actualizar timestamp
    this.metrics.timestamp = Date.now();
    
    // Actualizar métricas de performance
    this.capturePerformanceMetrics();
    this.captureResourceMetrics();
    this.captureMemoryMetrics();
    this.captureNetworkMetrics();
    
    return { ...this.metrics };
  }

  public exportToJSON(): string {
    const metrics = this.getMetrics();
    return JSON.stringify(metrics, null, 2);
  }

  public downloadMetrics(filename: string = 'performance-metrics.json'): void {
    const json = this.exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public logMetrics(): void {
    const metrics = this.getMetrics();
    console.log('📊 Performance Metrics:', metrics);
  }
}

// Instancia global
export const performanceMonitor = new PerformanceMonitor();

// Función de utilidad para iniciar el monitoreo automáticamente
export const startPerformanceMonitoring = (): void => {
  performanceMonitor.startMonitoring();
};

// Función de utilidad para obtener métricas
export const getPerformanceMetrics = (): PerformanceMetrics => {
  return performanceMonitor.getMetrics();
};

// Función de utilidad para exportar a JSON
export const exportPerformanceMetrics = (): string => {
  return performanceMonitor.exportToJSON();
};

// Función de utilidad para descargar métricas
export const downloadPerformanceMetrics = (filename?: string): void => {
  performanceMonitor.downloadMetrics(filename);
};

export type { PerformanceMetrics }; 