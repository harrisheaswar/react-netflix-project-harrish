import { type FC, useEffect, useRef, useState } from "react";
import "./browseDropdownStyles.css";
import { navbarLinks } from "../../../navbarLinks";
import { Link } from "react-router-dom";
import { type DropdownMenuProps } from "@/types/types";
import { useClickOutside } from "@/hooks/useClickOutside";

const BrowseDropdown: FC<DropdownMenuProps> = ({ triggerLabel, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, onClose);
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
  }, [triggerLabel]);
  return (
    <>
      <div
        className={`navbarDropdown ${
          triggerLabel === "Browse" ? "browse" : ""
        }`}
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
            <Link key={linkItem.name} to={linkItem.url} className="optionTabs">
              {linkItem.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrowseDropdown;
