import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const [state, setState] = useState({});
  const [login, setLogin] = useState(true);
  const update = (obj) => {
    setState(obj);
  };
  const setValidLogin = (log) => {
    setLogin(log);
  }

  return (
    <UserContext.Provider value={{ state, update, login, setValidLogin }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
