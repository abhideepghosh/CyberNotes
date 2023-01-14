import React from "react";
import "./Settings.css";

const Settings = () => {
  return (
    <div>
      <div className="settings-container">
        <div class="sidebar">
          <nav class="sidebar_menu">
            <button>
              <span>
                <span>Delete User</span>
              </span>
            </button>
            <button>
              <span>
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>Search</span>
              </span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Settings;
