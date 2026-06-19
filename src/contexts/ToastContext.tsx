import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Toast { id: string; message: string; type: 'success' | 'error' | 'info'; }

interface ToastContextType { showToast: (message: string, type: 'success' | 'error' | 'info') => void; }

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => { setToasts(prev => prev.filter(t => t.id !== id)); }, 4000);
  }, []);

  const removeToast = (id: string) => { setToasts(prev => prev.filter(t => t.id !== id)); };
  const getIcon = (type: 'success' | 'error' | 'info') => type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500" /> : type === 'error' ? <AlertCircle className="w-5 h-5 text-red-500" /> : <Info className="w-5 h-5 text-blue-500" />;
  const getBg = (type: 'success' | 'error' | 'info') => type === 'success' ? 'bg-green-50 border-green-200' : type === 'error' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200';

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div key={toast.id} className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-in slide-in-from-right ${getBg(toast.type)}`}>
            {getIcon(toast.type)}
            <p className="text-sm font-medium text-gray-900">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="ml-2"><X className="w-4 h-4 text-gray-500 hover:text-gray-700" /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) throw new Error('useToast must be used within a ToastProvider');
  return context;
}
