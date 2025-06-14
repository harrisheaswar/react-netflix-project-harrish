import { useClickOutside } from "@/hooks/useClickOutside";
import type { DropdownMenuProps } from "@/types/types";
import { type FC, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./profileDropdownStyles.css";
import { CircleHelp, LogOut, UserCircle2 } from "lucide-react";
import toast from "react-hot-toast";
interface ProfileDropdownProps extends DropdownMenuProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({
  triggerLabel,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery({ maxWidth: 895 });
  const iconRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useClickOutside(dropdownRef, onClose);
  useEffect(() => {
    iconRef.current = document.getElementById("profile-icon");

    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 40,
        left: rect.left + window.scrollX - 120,
      });
    }
  }, [triggerLabel]);
  return (
    <div
      className={`profileDropdownContainer ${
        triggerLabel === "profile" ? "active" : ""
      }`}
      onMouseEnter={!isSmallScreen ? onMouseEnter : undefined}
      onMouseLeave={!isSmallScreen ? onMouseLeave : undefined}
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
      }}
    >
      <div
        className="profileContent"
        onClick={() => toast.success("Please login to Netflix")}
      >
        <UserCircle2 size={20} />
        <span>Account</span>
      </div>
      <div
        className="profileContent"
        onClick={() => toast.success("Please login to Netflix")}
      >
        <CircleHelp size={20} />
        <span>Help</span>
      </div>
      <div
        className="profileContent"
        onClick={() => toast.success("Sign Out Successful")}
      >
        <LogOut size={20} />
        <span>Sign Out</span>
      </div>
      <span className="dropdownArrow">&#9660;</span>
    </div>
  );
};

export default ProfileDropdown;
