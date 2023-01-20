import {useState, useEffect} from 'react';
import "./Loader.css";

const Loader = () =>  {
    const [word, setWord] = useState("");
    var words = ['Loading CyberNotes','-------------->'],
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 90;
  const wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count === skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
      if (offset === 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    setWord(words[i].substring(0, offset));
    if (skip_count === 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
  },speed);
};

    useEffect (()=>{
        wordflick();
    })
return (
    <div id="loader">
      <div className="word"><em>{word}</em></div>
    </div>
  )
}

export default Loader;