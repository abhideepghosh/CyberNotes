import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import ErrorPage from "./components/error/ErrorPage";
import Signup from "./components/login/Signup";
import UserState from "./context/users/userState";

import Settings from "./components/settings/Settings";
import Workspace from "./components/workspace/Workspace";

function App() {
  return (
    <div className="App">
      <UserState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home/workspace" element={<Workspace />} />
            <Route path="/home/settings" element={<Settings />} />
          </Routes>
        </Router>
      </UserState>
    </div>
  );
}

export default App;
