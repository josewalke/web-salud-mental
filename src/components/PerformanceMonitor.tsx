import React, { useState, useEffect, useCallback } from 'react';
import { 
  performanceMonitor, 
  startPerformanceMonitoring, 
  getPerformanceMetrics, 
  exportPerformanceMetrics, 
  downloadPerformanceMetrics,
  type PerformanceMetrics 
} from '../utils/performanceMonitor';

interface PerformanceMonitorProps {
  isVisible?: boolean;
  onClose?: () => void;
}

export function PerformanceMonitor({ isVisible = false, onClose }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Iniciar monitoreo al montar el componente
  useEffect(() => {
    if (isVisible && !isMonitoring) {
      startPerformanceMonitoring();
      setIsMonitoring(true);
    }
  }, [isVisible, isMonitoring]);

  // Actualizar métricas cada 5 segundos si autoRefresh está activado
  useEffect(() => {
    if (!autoRefresh || !isVisible) return;

    const interval = setInterval(() => {
      const currentMetrics = getPerformanceMetrics();
      setMetrics(currentMetrics);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh, isVisible]);

  // Capturar métricas iniciales
  const captureMetrics = useCallback(() => {
    const currentMetrics = getPerformanceMetrics();
    setMetrics(currentMetrics);
  }, []);

  // Exportar métricas a JSON
  const handleExport = useCallback(() => {
    const json = exportPerformanceMetrics();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-metrics-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  // Formatear bytes a formato legible
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Formatear tiempo en milisegundos
  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 w-96 max-h-[80vh] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">📊 Monitor de Performance</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                autoRefresh 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-blue-700 hover:bg-blue-800'
              }`}
            >
              {autoRefresh ? '🔄 Auto' : '⏸️ Manual'}
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[calc(80vh-80px)] overflow-y-auto">
        {!metrics ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Iniciando monitoreo...</p>
            <button
              onClick={captureMetrics}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Capturar Métricas
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Métricas Generales */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-2">📈 Métricas Generales</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">URL:</span>
                  <p className="font-mono text-xs truncate">{metrics.url}</p>
                </div>
                <div>
                  <span className="text-gray-600">Timestamp:</span>
                  <p className="font-mono text-xs">{new Date(metrics.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Viewport:</span>
                  <p>{metrics.viewport.width} × {metrics.viewport.height}</p>
                </div>
                <div>
                  <span className="text-gray-600">User Agent:</span>
                  <p className="font-mono text-xs truncate">{metrics.userAgent}</p>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-2">⚡ Performance</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">First Paint:</span>
                  <p className="font-semibold">{formatTime(metrics.performance.firstPaint)}</p>
                </div>
                <div>
                  <span className="text-gray-600">First Contentful Paint:</span>
                  <p className="font-semibold">{formatTime(metrics.performance.firstContentfulPaint)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Largest Contentful Paint:</span>
                  <p className="font-semibold">{formatTime(metrics.performance.largestContentfulPaint)}</p>
                </div>
                <div>
                  <span className="text-gray-600">First Input Delay:</span>
                  <p className="font-semibold">{formatTime(metrics.performance.firstInputDelay)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Cumulative Layout Shift:</span>
                  <p className="font-semibold">{metrics.performance.cumulativeLayoutShift.toFixed(3)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Time to Interactive:</span>
                  <p className="font-semibold">{formatTime(metrics.performance.timeToInteractive)}</p>
                </div>
              </div>
            </div>

            {/* Recursos */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-2">📦 Recursos</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Size:</span>
                  <span className="font-semibold">{formatBytes(metrics.resources.totalSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Requests:</span>
                  <span className="font-semibold">{metrics.resources.totalRequests}</span>
                </div>
                {Object.entries(metrics.resources.byType).map(([type, data]) => (
                  <div key={type} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{type}:</span>
                    <span className="font-semibold">{data.count} ({formatBytes(data.size)})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Memoria */}
            {metrics.memory.usedJSHeapSize > 0 && (
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-2">🧠 Memoria</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Used JS Heap:</span>
                    <p className="font-semibold">{formatBytes(metrics.memory.usedJSHeapSize)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total JS Heap:</span>
                    <p className="font-semibold">{formatBytes(metrics.memory.totalJSHeapSize)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">JS Heap Limit:</span>
                    <p className="font-semibold">{formatBytes(metrics.memory.jsHeapSizeLimit)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Usage %:</span>
                    <p className="font-semibold">
                      {((metrics.memory.usedJSHeapSize / metrics.memory.jsHeapSizeLimit) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Red */}
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-2">🌐 Red</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Effective Type:</span>
                  <p className="font-semibold capitalize">{metrics.network.effectiveType}</p>
                </div>
                <div>
                  <span className="text-gray-600">Downlink:</span>
                  <p className="font-semibold">{metrics.network.downlink} Mbps</p>
                </div>
                <div>
                  <span className="text-gray-600">RTT:</span>
                  <p className="font-semibold">{metrics.network.rtt}ms</p>
                </div>
              </div>
            </div>

            {/* Errores */}
            {metrics.errors.length > 0 && (
              <div className="bg-red-50 rounded-lg p-3">
                <h4 className="font-semibold text-red-800 mb-2">❌ Errores ({metrics.errors.length})</h4>
                <div className="space-y-1 text-sm">
                  {metrics.errors.slice(0, 3).map((error, index) => (
                    <div key={index} className="text-red-700">
                      <p className="font-medium">{error.message}</p>
                      <p className="text-xs text-red-600">{error.filename}:{error.lineno}</p>
                    </div>
                  ))}
                  {metrics.errors.length > 3 && (
                    <p className="text-xs text-red-600">... y {metrics.errors.length - 3} más</p>
                  )}
                </div>
              </div>
            )}

            {/* Interacciones del Usuario */}
            {metrics.userInteractions.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-2">👆 Interacciones ({metrics.userInteractions.length})</h4>
                <div className="space-y-1 text-sm">
                  {metrics.userInteractions.slice(-5).map((interaction, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{interaction.type}</span>
                      <span className="font-mono text-xs">{interaction.target}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={captureMetrics}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                🔄 Actualizar
              </button>
              <button
                onClick={handleExport}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm font-medium"
              >
                📥 Exportar JSON
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 