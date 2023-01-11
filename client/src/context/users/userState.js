import { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const [state, setState] = useState({});
  const update = (obj) => {
    setState(obj);
  };

  return (
    <UserContext.Provider value={{ state, update }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
