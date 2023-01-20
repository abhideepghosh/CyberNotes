import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/users/userContext";

import "./Dashboard.css";
const Dashboard = () => {
  const userData = useContext(UserContext);
  const navigate = useNavigate();
  const [recentNotes, setRecentNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  let timer;
  const[openModal,setOpenModal] = useState("display-none");
  const[deleteIndex, setDeleteIndex] = useState('');
  const[deleteSuccess, setDeleteSuccess] = useState(false);
  const[valueInput,setValueInput] = useState();
  const[notesLength , setNotesLength] = useState();
  
  const openModalInput = (index) =>{
          setOpenModal("display-block");
          setDeleteIndex(index);
  }
  const closeModalInput = () =>{
      setOpenModal("display-none");
      setDeleteIndex('');
  }
  const getAllNotes = async (id, token) => {
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        // prettier-ignore
        "Authorization": token,
        "Content-Type": "application/json",
      }),
    };
    const response = await fetch(
      `https://cybernotes-backend.onrender.com/v1/notes/getAllUserNotes/${id}`,
      requestOptions
    );
    const data = await response.json();
    if(data.data.length === 0){
        setNotesLength(0);
    }else{
        setNotesLength(data.data.length);
    }
    setAllNotes(data);
    setFilterNotes(data.data);
    // console.log(filterNotes);
  };
  
  const getRecentNotes = async (id, token) => {
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        // prettier-ignore
        "Authorization": token,
        "Content-Type": "application/json",
      }),
    };
    const response = await fetch(
      `https://cybernotes-backend.onrender.com/v1/notes/recentNotes/${id}`,
      requestOptions
    );
    const data = await response.json();
    setRecentNotes(data.data);
  };
  useEffect(() => {
    if (!userData.state.data) {
      navigate("/");
    } else {
      const { id, name } = userData.state.data.data;
      const { token } = userData.state.data;
      // console.log(id);
      document.querySelector(".segment-topbar__overline").textContent =
        "NetWire_Seed: " + id;
      document.querySelector(".channel-link__icon").textContent = "# " + name;

      getRecentNotes(id, token);
      getAllNotes(id, token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  // Debounce Function
  const searchTextInput = (searchText) => {
    filterSearch(searchText);
  };

  const filterSearch = (value) => {   
    setValueInput(value);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const arr = allNotes.data.filter((element) =>
        element.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilterNotes(arr);
    }, 1000);
  };


  const deleteNote = async() => {
    try {
    if(deleteIndex !== ''){
      const { id } = userData.state.data.data;
      const { token } = userData.state.data;
      // console.log("dI" + deleteIndex);
      const deleteNoteId = filterNotes[deleteIndex]._id; 
      console.log(deleteIndex , deleteNoteId);
      console.log("userID "  + id);
      const requestOptions = {
        method: "DELETE",
        headers: new Headers({
          // prettier-ignore
          "Authorization": token,
          "Content-Type": "application/json",
        }),
      };
      const response = await fetch(
        `https://cybernotes-backend.onrender.com/v1/notes/delete/${id}/${deleteNoteId}`,
        requestOptions
      );
      // console.log(response);
      const data = await response.json();
      
      if (data.status === "success"){
        setDeleteSuccess(true);
        setDeleteIndex('');
        await getAllNotes(id,token);
        await getRecentNotes(id,token);
        
      }
      setOpenModal("display-none");
      setTimeout(() => {  
        setDeleteSuccess(false);
      }, 500);
    }
  } catch(err){
    console.log("Note not deleted");
  }
  };

  if (userData.state.data)
    return (
      <div>
      <div className="app-skeleton">
        <div className="app-container">
          <div className="app-a">
            <div className="segment-topbar">
              <div className="segment-topbar__header">
                <TextHeading3 className="segment-topbar__title">
                  All Notes
                </TextHeading3>
              </div>
              <div className="segment-topbar__aside">
                <div className="button-toolbar">
                  <Link className="button button--primary button--size-lg">
                    <IconFeedAdd className="button__icon" />
                  </Link>
                </div>
              </div>
            </div>

            <form className="form-search" >
              <div className="form-group">
                <div className="form-control form-control--with-addon">
                  <input name="query" placeholder="Search..." type="text" id="searchField" value={valueInput} onChange={(e) => {filterSearch(e.target.value)}}/>
                  <div className="form-control__addon form-control__addon--prefix">
                    <IconSearchSubmit />
                  </div>
                </div>
              </div>
            </form>

            <NavSection
              renderTitle={(props) => <h2 {...props}>Recent Notes</h2>}
            >
              <ChannelNav
                activeChannel={{ id: "userID", name: "USERNAME" }}
                channels={recentNotes}
                searchTextInput = {searchTextInput}
                
              />
            </NavSection>
          </div>
          <div className="app-main">
            <div className="channel-feed">
              <div className="segment-topbar">
                <div className="segment-topbar__header">
                  <TextOverline className="segment-topbar__overline">
                    NetWire_Seed:
                  </TextOverline>
                  <TextHeading4 className="segment-topbar__title">
                    <ChannelLink name="NETRUNNER" />
                  </TextHeading4>
                </div>
                <div className="segment-topbar__aside">
                  <div className="button-toolbar">
                    <Link className="button button--default">
                      <IconFeedMute className="button__icon" />
                    </Link>
                    <Link className="button button--default">
                      <IconFeedSettings className="button__icon" />
                    </Link>
                    <Link className="button button--default">
                      <IconMenuMore className="button__icon" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="channel-feed__body">
                {(notesLength === 0) ?
                  <em><div className="noNotes">Click here to create your <Link to="/home/createNote"><b>first note</b></Link></div></em> : ""
                }
                {allNotes.data &&
                  filterNotes.map((note, index) => (
                    <div className="message-container" key={index}>
                      <div className="message-nav">
                        <Link className="updateIcon" to="/home/updateNote" state={{ noteId: note._id , prevTitle: note.title , prevDescription : note.description }}>
                          <em>#Update</em>
                        </Link>
                        <button className="deleteIcon" onClick={() => openModalInput(index)}>
                          <em>#Delete</em>
                        </button>
   
                      </div>
                      <div className="message">
                        <div className="message__body">
                          <div>{note.title}</div>
                        </div>
                        <div className="message__body">
                          <div>{note.description}</div>
                        </div>
                        <div className="message__footer">
                          <span className="message__authoring">
                            <em>#_ID: {note._id.slice(-4)}</em>
                          </span>{" "}
                          #CREATED_AT: {note.createdAt}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="app-b">
            <Pad>
              <TextHeading3 $as="h4">About CyberNotes</TextHeading3>
              <TextParagraph1>
                A <em>Project</em>, inspired by the Cyberpunk Genre. This app is
                fully functional, MERN stack application.
              </TextParagraph1>
              <TextParagraph1>
                The goal is to showcase a MERN project with CRUD functionality
                and JWT authentication with a new flavour of UI/UX Design.
              </TextParagraph1>
            </Pad>
          </div>
        </div>
      </div>
      <div  className={openModal}>
  <div className="delete-modal">
        <div className="inner-delete-modal">
            <button id="delete-button" onClick={closeModalInput}  className="close"></button>
            <p className="delete-p"><em>Are you sure you want to delete {" "} 
            {(deleteIndex === '') ? "" : `"${filterNotes[deleteIndex].title.trim()}"` }
            </em></p> 
            <div className="delete-modal-options">
            <button className="delete-modal-option" onClick={deleteNote}>Yes</button><button className="delete-modal-option" onClick={closeModalInput}>No</button>
            </div>
        </div> 
  </div>
</div>

{(deleteSuccess === true) ?<div className="delete-modal"><div className="delete-success-message"><p>Note Deleted</p></div></div>: " "}

      </div>
    );
  else navigate("/");
};

function NavSection({ children, renderTitle }) {
  return (
    <div className="nav-section">
      <div className="nav-section__header">
        {renderTitle({ className: "nav-section__title" })}
      </div>
      <div className="nav-section__body">{children}</div>
    </div>
  );
}

function ChannelNav({ activeChannel = null, channels = [] , searchTextInput }) {
  return (
    <ul className="nav">
      {channels.map((channel, i) => (
        <li className="nav__item" key={i}>
          <Link
            className={`nav__link ${
              activeChannel && activeChannel.id === channel._id
                ? "nav__link--active"
                : ""
            }`}
            onClick={() => searchTextInput(channel.title)}
          >
            <ChannelLink {...channel} >{channel.title}</ChannelLink>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ChannelLink({ icon, title, unread }) {
  return (
    <span
      className={`channel-link ${
        unread > 0 ? "conversation-link--unread" : ""
      }`}
    >
      <span className="channel-link__icon">#</span>
      <span className="channel-link__element">{title}</span>

      {unread > 0 && (
        <span className="channel-link__element">
          <Badge>{unread}</Badge>
        </span>
      )}
    </span>
  );
}

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

function Pad({ children, renderCap = null }) {
  return (
    <div className="pad">
      <div className="pad__body">{children}</div>
    </div>
  );
}

function MakeTextBase(classNameDefault, $asDefault) {
  return ({ $as = null, children, className }) => {
    const AsComponent = $as || $asDefault;

    return (
      <AsComponent className={`${classNameDefault} ${className}`}>
        {children}
      </AsComponent>
    );
  };
}

const TextHeading3 = MakeTextBase("text-heading3", "h3");
const TextHeading4 = MakeTextBase("text-heading4", "h4");

const TextParagraph1 = MakeTextBase("text-paragraph1", "p");
const TextOverline = MakeTextBase("segment-topbar__overline", "span");

function MakeIcon(svg) {
  return ({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {svg}
    </svg>
  );
}

const IconFeedMute = MakeIcon(
  <path d="M18 9.5c2.481 0 4.5 1.571 4.5 3.503 0 1.674-1.703 3.48-4.454 3.48-.899 0-1.454-.156-2.281-.357-.584.358-.679.445-1.339.686.127-.646.101-.924.081-1.56-.583-.697-1.007-1.241-1.007-2.249 0-1.932 2.019-3.503 4.5-3.503zm0-1.5c-3.169 0-6 2.113-6 5.003 0 1.025.37 2.032 1.023 2.812.027.916-.511 2.228-.997 3.184 1.302-.234 3.15-.754 3.989-1.268.709.173 1.388.252 2.03.252 3.542 0 5.954-2.418 5.954-4.98.001-2.906-2.85-5.003-5.999-5.003zm-.668 6.5h-1.719v-.369l.938-1.361v-.008h-.869v-.512h1.618v.396l-.918 1.341v.008h.95v.505zm3.035 0h-2.392v-.505l1.306-1.784v-.011h-1.283v-.7h2.25v.538l-1.203 1.755v.012h1.322v.695zm-10.338 9.5c1.578 0 2.971-1.402 2.971-3h-6c0 1.598 1.45 3 3.029 3zm.918-7.655c-.615-1.001-.947-2.159-.947-3.342 0-3.018 2.197-5.589 5.261-6.571-.472-1.025-1.123-1.905-2.124-2.486-.644-.374-1.041-1.07-1.04-1.82v-.003c0-1.173-.939-2.123-2.097-2.123s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h9.782c.425-.834.931-1.764 1.165-2.655zm-.947-15.345c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1z" />
);

const IconFeedSettings = MakeIcon(
  <path d="M6 16h-6v-3h6v3zm-2-5v-10h-2v10h2zm-2 7v5h2v-5h-2zm13-7h-6v-3h6v3zm-2-5v-5h-2v5h2zm-2 7v10h2v-10h-2zm13 3h-6v-3h6v3zm-2-5v-10h-2v10h2zm-2 7v5h2v-5h-2z" />
);

const IconMenuMore = MakeIcon(
  <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" />
);

const IconFeedAdd = MakeIcon(
  <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
);

const IconSearchSubmit = MakeIcon(
  <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
);

export default Dashboard;
