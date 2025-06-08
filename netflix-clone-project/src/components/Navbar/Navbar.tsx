import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import netflixLogo from "@/assets/netflix-logo.png";
import { navbarLinks } from "./navbarLinks";
import { Link, useNavigate } from "react-router-dom";
import "./navbarStyles.css";
import { Bell, Search } from "lucide-react";
import profileIcon from "@/assets/profile.jpg";
import { useMediaQuery } from "react-responsive";
import BrowseDropdown from "./components/dropdowns/BrowseDropdown/BrowseDropdown";
import ProfileDropdown from "./components/dropdowns/ProfileDropdown/ProfileDropdown";
import Notifications from "./components/dropdowns/Notifications/Notification";
const Navbar: FC = () => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 895 });
  const [activeNavDropdown, setActiveNavDropdown] = useState<String>("");
  const [isSticky, setIsSticky] = useState<boolean | null>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [notificationsActive, setNotificationsActive] =
    useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false);
      }
    }
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
      setActiveNavDropdown("");
      setOpen(false);
      setIsMenuOpen(false);
      setNotificationsActive(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleProfileMenuHover = (value: boolean) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (value) {
      setIsMenuOpen(true);
      setActiveNavDropdown("profile");
    } else {
      // Delayed close
      hoverTimeoutRef.current = setTimeout(() => {
        setIsMenuOpen(false);
        setActiveNavDropdown("");
      }, 200); // adjust delay to taste
    }
  };
  const handleBrowseOrProfileClick = (navType: String) => {
    setActiveNavDropdown(navType);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) {
      navigate(`/`);
      return;
    }
    navigate(`/search/${e.target.value}`);
  };

  return (
    <>
      <header className={`container ${isSticky ? "scrollActive" : ""}`}>
        <div className="leftSubContainer">
          <Link to={`/`}>
            <img
              src={netflixLogo}
              alt="Netflix Logo"
              style={{
                width: isSmallScreen ? "4rem" : "7.3rem",
                marginRight: isSmallScreen ? "15px" : "30px",
              }}
            />
          </Link>

          {!isSmallScreen ? (
            <div style={{ display: "flex", gap: "20px" }}>
              {navbarLinks.map((linkItem) => (
                <Link
                  key={linkItem.name}
                  to={linkItem.url}
                  className="optionTabs"
                >
                  {linkItem.name}
                </Link>
              ))}
            </div>
          ) : (
            <div
              id="browse-icon"
              onClick={() => {
                handleBrowseOrProfileClick("Browse");
                setOpen(true);
              }}
            >
              <span className="optionTabs">Browse</span>
              {"  "}
              <span
                className={`chevronIconCustom ${isMenuOpen ? "active" : ""}`}
              >
                &#9660;
              </span>
            </div>
          )}
        </div>

        <div className="rightSubContainer">
          <div className="searchMainContainer" ref={searchRef}>
            <button
              aria-label="Toggle Search"
              className="searchButton"
              onClick={() => setIsSearchActive(true)}
            >
              {!isSearchActive && (
                <Search size={24} color="white" cursor="pointer" />
              )}
            </button>

            <div
              className={`searchBarContainer ${isSearchActive ? "active" : ""}`}
            >
              {isSearchActive && (
                <Search
                  size={24}
                  color="white"
                  cursor="pointer"
                  style={{ marginRight: "10px" }}
                  className="searchIcon"
                />
              )}
              <input
                type="text"
                placeholder="Titles, people, genre"
                aria-label="Search"
                className={`searchInput ${isSearchActive ? "active" : ""}`}
                value={query}
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </div>

          <Bell
            size={20}
            color="white"
            cursor="pointer"
            id="bell-icon"
            onMouseEnter={() => setNotificationsActive(true)}
            onMouseLeave={() => setNotificationsActive(false)}
            onClick={() => setNotificationsActive(true)}
          />
          <div
            className="profileIcon"
            id="profile-icon"
            onMouseEnter={
              !isSmallScreen ? () => handleProfileMenuHover(true) : undefined
            }
            onMouseLeave={
              !isSmallScreen ? () => handleProfileMenuHover(false) : undefined
            }
            onClick={() => handleBrowseOrProfileClick("profile")}
          >
            <img
              src={profileIcon}
              style={{
                width: "26px",
                marginRight: "10px",
                borderRadius: "5px",
              }}
            />
            <span className={`chevronIconCustom ${isMenuOpen ? "active" : ""}`}>
              &#9660;
            </span>
          </div>
        </div>
      </header>
      <BrowseDropdown
        triggerLabel={activeNavDropdown}
        onClose={() => {
          setActiveNavDropdown("");
          setOpen(false);
        }}
        isOpen={isOpen}
      />
      <ProfileDropdown
        triggerLabel={activeNavDropdown}
        onClose={() => {
          setActiveNavDropdown("");
        }}
        onMouseEnter={() => {
          handleProfileMenuHover(true);
        }}
        onMouseLeave={() => handleProfileMenuHover(false)}
      />
      <Notifications
        isOpen={notificationsActive}
        onMouseLeave={() => setNotificationsActive(false)}
        onMouseEnter={() => setNotificationsActive(true)}
        onClose={() => {
          setNotificationsActive(false);
        }}
      />
    </>
  );
};

export default Navbar;
