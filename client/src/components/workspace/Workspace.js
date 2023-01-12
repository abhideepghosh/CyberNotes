import React from "react";
import "./Workspace.scss";
const Workspace = () => {
  return (
    <div className="workspace_body">
      <form
        className="workspace_form-animation"
        action="#"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="workspace_form__image"></div>
        <div className="workspace_notes-area">
          <h2>Create a note</h2>
          <div className="workspace_form-title">
            <label className="workspace_form-label-title" htmlFor="message">
              Title
            </label>
            <div className="workspace_form-control-title">
              <textarea
                id="note-title"
                className="workspace_form-control-title"
                name="message"
              ></textarea>
            </div>
          </div>
          <div className="workspace_form-note">
            <label className="workspace_form-label-note" htmlFor="message">
              Note
            </label>
            <div className="workspace_form-control-note">
              <textarea
                id="note-body"
                className="workspace_form-control-note"
                name="message"
              ></textarea>
            </div>
          </div>
          <div className="workspace_form-footer">
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
