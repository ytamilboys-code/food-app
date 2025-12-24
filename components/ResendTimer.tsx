
import React, { useState, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

interface ResendTimerProps {
  initialSeconds: number;
  onResend: () => void;
  color: string;
}

const ResendTimer: React.FC<ResendTimerProps> = ({ initialSeconds, onResend, color }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [seconds]);

  const handleResend = () => {
    setSeconds(initialSeconds);
    setCanResend(false);
    onResend();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {canResend ? (
        <button
          type="button"
          onClick={handleResend}
          className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest text-${color}-600 hover:text-${color}-700 transition-colors animate-in fade-in zoom-in`}
        >
          <RefreshCcw className="w-3 h-3" />
          Resend OTP
        </button>
      ) : (
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">
          Resend OTP in 0:{seconds.toString().padStart(2, '0')}
        </p>
      )}
    </div>
  );
};

export default ResendTimer;
