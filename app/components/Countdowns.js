"use client";

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function Countdown({ endDate, onExpire, className = 'text-gray-900', size = 'default' }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate) - new Date();
      
      if (difference <= 0) {
        if (onExpire) onExpire();
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onExpire]);

  if (!timeLeft) {
    return null;
  }

  const isLarge = size === 'lg';

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${isLarge ? 'text-xl sm:text-3xl' : 'text-sm'} ${className}`}>
      <Clock size={isLarge ? 24 : 16} className={isLarge ? 'w-6 h-6 sm:w-8 sm:h-8' : ''} />
      <span className="font-medium tabular-nums">
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
}