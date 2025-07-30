import React from "react";
import { NotificationProps } from "../types";

const Notification: React.FC<NotificationProps> = ({ isVisible, message, type }) => {
  if (!isVisible) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-out transform
    ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
    top-4 left-1/2 -translate-x-1/2
    md:top-auto md:left-auto md:bottom-4 md:right-4 md:translate-x-0
    ${bgColor} text-white px-4 py-2 rounded-full shadow-lg`}
    >
      {message}
    </div>
  );
};

export default Notification;
