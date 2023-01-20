import React, { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.scss";
import UserContext from "../../context/users/userContext";

const Settings = () => {
  const [deleteUserSection ,setDeleteUserSection] = useState("display-none");
  const [profileInfoSection  ,setProfileInfoSection] = useState("display-none");
  const [deleteAllNotesSection  ,setDeleteAllNotesSection] = useState("display-none");
  const[openModal,setOpenModal] = useState("display-none");
  const userData = useContext(UserContext);
  const[deleteSuccess, setDeleteSuccess] = useState(false);
  const {id, name , email} = userData.state.data.data;
  const navigate = useNavigate();
  const openModalInput = (index) =>{
    setOpenModal("display-block");
}
const closeModalInput = () =>{
setOpenModal("display-none");
}
  const enableDeleteUser = () => {
      setDeleteUserSection("display-block");
      setProfileInfoSection("display-none");
      setDeleteAllNotesSection("display-none");
  }
  const enableProfile = () => {
    setProfileInfoSection("display-block");
    setDeleteUserSection("display-none");
    setDeleteAllNotesSection("display-none");
}
const enableDeleteAllNotes = () => {
  setDeleteAllNotesSection("display-block");
  setProfileInfoSection("display-none");
  setDeleteUserSection("display-none");
}
const deleteUser =  async() =>{
     console.log("clicked Delete User");
     try {
      const { token } = userData.state.data;
      const requestOptions = {
        method: "DELETE",
        headers: {
           "Authorization": token,
        "Content-Type": "application/json", },
      };
      const response = await fetch(
        `https://cybernotes-backend.onrender.com/v1/users/deleteUser/${id}`,
        requestOptions
        );
      const data = await response.json();
      if (data.status === "success") {
        setDeleteSuccess(true);
        userData.update({});
        navigate("/");
        console.log("success");
      } 
      setTimeout(() => {  
        setDeleteSuccess(false);
      }, 500);
    } catch (error) {
      console.log("Account Not Deleted");
    }
}
const deleteAllNotes =  async() =>{
  console.log("clicked Delete All Notes");
  try {
    const { token } = userData.state.data;
    console.log(token);
    const requestOptions = {
      method: "DELETE",
      headers: {
         "Authorization": token,
      "Content-Type": "application/json", },
    };
    console.log(id);
    const response = await fetch(
      `https://cybernotes-backend.onrender.com/v1/notes/deleteAllNotes/${id}`,
      requestOptions
      );
      console.log("here2");
    const data = await response.json();
    if (data.status === "success") {
      setDeleteSuccess(true);
      console.log("success");
      navigate("/home");
    }else{
      console.log("fsil");
    }
    setTimeout(() => {  
      setDeleteSuccess(false);
    }, 500);
  } catch (error) {
    console.log("Account Notes Not Deleted");
  }
}
  return (
    <div>
      <div className="settings-container">
        <div className="sidebar">
          <nav className="sidebar_menu">
            <button onClick={enableProfile}>
                <span>Profile</span><span className="angluar_tag">&gt;</span>
            </button>
            <button onClick={enableDeleteAllNotes} >
                <span>Reset Account</span><span className="angluar_tag"> &gt;</span>
            </button>
            <button onClick={enableDeleteUser} >
                <span>Delete Account</span><span className="angluar_tag"> &gt;</span>
            </button>
          </nav>
        </div>
        <div className="settings-body">
          <div className={deleteUserSection}>
          <div className="settings-sections">
            Permanently Delete This Account
            <button onClick={openModalInput}>Delete</button>
            </div>
          </div>
          <div className={deleteAllNotesSection}>
          <div className="settings-sections">
            Delete All Notes From This Account
            <button onClick={openModalInput}>Delete</button>
            </div>
          </div>
          <div className={profileInfoSection}>
            <div className="settings-sections">
            <table>
              <caption><b>Profile Information</b></caption>
              <tbody>

        <tr>
           <td>NetWire_Seed</td>
          <td> #{id}</td>
        </tr>
        <tr>
          <td> Name</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td> {email}</td>
        </tr>
      
            </tbody>
      </table>        
            </div>
            </div>
        </div>
        </div>
        <div  className={openModal}>
  <div className="delete-modal">
        <div className="inner-delete-modal">
            <button id="delete-button" onClick={closeModalInput}  className="close"></button>
            <p className="delete-p"><em>Are you sure you want to delete {" "} 
           {(deleteUserSection === "display-block") ? "this account" : " "}
           {(deleteAllNotesSection === "display-block") ? "all notes from this account" : " "}
            </em></p> 
            <div className="delete-modal-options">
            {(deleteUserSection === "display-block") ?
            <button className="delete-modal-option" onClick= {deleteUser}>Yes</button> : "" }
             {(deleteAllNotesSection === "display-block") ?
            <button className="delete-modal-option" onClick={deleteAllNotes}>Yes</button> : "" }
            <button className="delete-modal-option" onClick={closeModalInput}>No</button> 
            </div>
        </div> 
  </div>
</div>
{(deleteSuccess === true) && (deleteUserSection === "display-block") ?<div className="delete-modal"><div className="delete-success-message"><p>Account Deleted</p></div></div>: " "}
{(deleteSuccess === true) && (deleteAllNotesSection === "display-block") ?<div className="delete-modal"><div className="delete-success-message"><p>All Notes Deleted</p></div></div>: " "}
    </div>
  );
};

export default Settings;
