"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning";
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  }[type];

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 rounded-lg ${bgColor} px-6 py-3 text-white shadow-lg`}
    >
      {message}
    </div>
  );
}
