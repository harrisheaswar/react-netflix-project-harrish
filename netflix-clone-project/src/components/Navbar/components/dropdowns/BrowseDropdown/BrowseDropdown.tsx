import { type FC, useEffect, useRef, useState } from "react";
import "./browseDropdownStyles.css";
import { navbarLinks } from "../../../navbarLinks";
import { Link, useNavigate } from "react-router-dom";
import { type DropdownMenuProps } from "@/types/types";
import { useClickOutside } from "@/hooks/useClickOutside";

const BrowseDropdown: FC<DropdownMenuProps> = ({
  triggerLabel,
  onClose,
  isOpen,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      onClose();
    }
  });
  const iconRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    iconRef.current = document.getElementById("browse-icon");

    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 40,
        left: rect.left + window.scrollX - 90,
      });
    }
    console.log(triggerLabel);
  }, [triggerLabel, isOpen]);
  return (
    <>
      <div
        className={`navbarDropdown ${isOpen ? "browse" : ""}`}
        id="browse-dropdown"
        ref={dropdownRef}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
        }}
      >
        <span className="dropdownArrows">&#9660;</span>
        <div className="navDropdownContent">
          {navbarLinks.map((linkItem) => (
            <Link
              key={linkItem.name}
              to={`/movies`}
              className="optionTabs"
              onClick={(e) => {
                e.preventDefault(); // Stop default routing
                e.stopPropagation();
                console.log(linkItem.url, "==>");
                onClose(); // Close dropdown
                navigate(linkItem.url);
              }}
            >
              {linkItem.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrowseDropdown;
