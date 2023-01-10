import React from "react";

const Navbar = () => {
  function NavItem({ navItem }) {
    return (
      <li className="nav__item">
        <a
          className={`nav__link ${navItem.isActive ? "nav__link--active" : ""}`}
          href="#"
        >
          <span className="nav__link__element">{navItem.text}</span>
          {navItem.notificationCount > 0 && (
            <span className="nav__link__element">
              <Badge>{navItem.notificationCount}</Badge>
            </span>
          )}
        </a>
      </li>
    );
  }

  function Badge({ children }) {
    return <span className="badge">{children}</span>;
  }

  const FIXTURES = {
    headerMenu: [
      { notificationCount: 11, text: "All Notes" },
      { isActive: true, notificationCount: 0, text: "Workspace" },
      { notificationCount: 0, text: "Settings" },
      { notificationCount: 0, text: "Logout" },
    ],
  };

  return (
    <header className="app-header">
      <div className="app-header__anchor">
        <span className="app-header__anchor__text">Cyber Notes</span>
      </div>
      <nav>
        <ul className="nav">
          {FIXTURES.headerMenu.map((navItem, navItemIndex) => (
            <NavItem key={navItemIndex} navItem={navItem} />
          ))}
        </ul>
      </nav>
      <div />
    </header>
  );
};

export default Navbar;
