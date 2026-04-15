import { useEffect, useState } from 'react';
import { useToast } from '../../context';

const ToastIcon = ({ type }) => {
  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };
  return icons[type] || icons.info;
};

const ToastItem = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      icon: 'text-green-500',
      text: 'text-green-800',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      icon: 'text-red-500',
      text: 'text-red-800',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      icon: 'text-yellow-500',
      text: 'text-yellow-800',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      icon: 'text-blue-500',
      text: 'text-blue-800',
    },
  };

  const style = styles[toast.type] || styles.info;

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl shadow-soft-lg
        border-l-4 ${style.bg} ${style.border}
        transform transition-all duration-300 ease-out
        ${isExiting ? 'opacity-0 translate-x-full' : 'animate-slide-in-left'}
      `}
    >
      <div className={`${style.icon}`}>
        <ToastIcon type={toast.type} />
      </div>
      <p className={`text-sm font-medium ${style.text}`}>{toast.message}</p>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors hover:scale-110"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

export default Toast;
