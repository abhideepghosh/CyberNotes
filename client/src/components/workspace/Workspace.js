import React, { useContext, useState } from "react";
import UserContext from "../../context/users/userContext";
import { titleSchema } from "../../schemas/UserSchema";
import "./Workspace.scss";
const Workspace = () => {
  const userData = useContext(UserContext);
  const userId = userData.state.data.data.id;
  const token = userData.state.data.token;
  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(true);
  const [description, setDescription] = useState("");
  const titleInput = (e) => {
    setTitle(e.target.value);
  };
  const descriptionInput = (e) => {
    setDescription(e.target.value);
  };
  const createNote = async (e) => {
    e.preventDefault();
    const isValidTitle = await titleSchema.isValid({ title: title.trim() });
    setValidTitle(isValidTitle);
    try {
      if (isValidTitle) {
        const requestOptions = {
          method: "POST",
          headers: new Headers({
            // prettier-ignore
            "Authorization": token,
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ userId, title, description }),
        };
        // console.log(requestOptions);
        const response = await fetch(
          "https://cybernotes-backend.onrender.com/v1/notes/createNote/",
          requestOptions
        );
        const data = await response.json();
        if (data.status === "success") {
          alert("Note Created");
          setTitle("");
          setDescription("");
        } else {
          console.log("Unsuccesfull");
        }
      } else {
        console.log("Unsucessfull title empty");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="workspace_body">
      <form
        className="workspace_form"
        action="#"
        method="post"
        onSubmit={createNote}
      >
        <div className="workspace_form__image"></div>
        <div className="workspace_notes-area">
          <h2>
            <em>Create a note</em>
          </h2>
          <div className="workspace_form-title">
            <label className="workspace_form-label" htmlFor="message">
              Title
            </label>
            <div className="workspace_form-control-title">
              <textarea
                id="note-title"
                value={title}
                className="workspace_form-control-title"
                onChange={titleInput}
                name="message"
              ></textarea>
            </div>
            {validTitle ? (
              ""
            ) : (
              <div className="error">
                <p>
                  <em className="errorem">Title cannot be empty</em>
                </p>
              </div>
            )}
          </div>
          <div className="workspace_form-note">
            <label className="workspace_form-label" htmlFor="message">
              Note
            </label>
            <div className="workspace_form-control-note">
              <textarea
                id="note-body"
                value={description}
                className="workspace_form-control-note"
                onChange={descriptionInput}
                name="message"
              ></textarea>
            </div>
          </div>
          <div className="workspace_form-footer-button">
            <Button size="xl" type="submit" variant="primary">
              Add Note
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
function Button({
  children,
  type = "button",
  size = "default",
  variant = "default",
}) {
  return (
    <button
      className={`button ${variant ? `button--${variant}` : ""} ${
        size ? `button--size-${size}` : ""
      }`}
      type={type}
    >
      <span className="workspace_button__content">{children}</span>
    </button>
  );
}

export default Workspace;
