import { type FC, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./notificationsStyles.css";
import { useClickOutside } from "@/hooks/useClickOutside";
interface NotificationProps {
  isOpen?: boolean;
  onMouseLeave: () => void;
  onMouseEnter: () => void;
  onClose: () => void;
}

const Notifications: FC<NotificationProps> = ({
  isOpen,
  onMouseLeave,
  onMouseEnter,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery({ maxWidth: 895 });
  const iconRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useClickOutside(dropdownRef, onClose);
  useEffect(() => {
    iconRef.current = document.getElementById("bell-icon");

    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 40,
        left: rect.left + window.scrollX - 150,
      });
    }
  }, [isOpen]);
  return (
    <div
      className={`notificationsDropdownContainer ${isOpen ? "active" : ""}`}
      onMouseLeave={!isSmallScreen ? onMouseLeave : undefined}
      onMouseEnter={!isSmallScreen ? onMouseEnter : undefined}
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
      }}
    >
      <span>No Notifications Available</span>
    </div>
  );
};

export default Notifications;
