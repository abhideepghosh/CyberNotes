import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../context/users/userContext";

const Navbar = () => {
  const userData = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/") {
      userData.update({});
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/home") setIsActive(true);
    handleClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Nav Item
  function NavItem({ navItem }) {
    return (
      <li className="nav__item">
        <Link
          className={`nav__link ${
            location.pathname === navItem.url ? "nav__link--active" : ""
          }`}
          to={navItem.url}
        >
          <span className="nav__link">{navItem.text}</span>
          {navItem.notificationCount > 0 && (
            <span className="nav__link">
              <Badge>{navItem.notificationCount}</Badge>
            </span>
          )}
        </Link>
      </li>
    );
  }

  function Badge({ children }) {
    return <span className="badge">{children}</span>;
  }

  const FIXTURES = {
    headerMenu: [
      { notificationCount: 0, text: "Create Note", url: "/home/createNote" },
      { notificationCount: 0, text: "All Notes", url: "/home" },
      { notificationCount: 0, text: "Settings", url: "/home/settings" },
      { notificationCount: 0, text: "Logout", url: "/" },
    ],
  };

  return (
    <header className="app-header">
      <div className="app-header__anchor">
        <span className="app-header__anchor__text">Cyber Notes</span>
      </div>
      <nav>
        <ul className="nav">
          {isActive &&
            FIXTURES.headerMenu.map((navItem, navItemIndex) => (
              <NavItem key={navItemIndex} navItem={navItem} />
            ))}
        </ul>
      </nav>
      <div />
    </header>
  );
};

export default Navbar;
