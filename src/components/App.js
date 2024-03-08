import React, { useState, useEffect } from "react";
import './App.css';

const DrumMachine = () => {
  const [displayText, setDisplayText] = useState('');

  const playSound = (id) => {
    const audio = document.getElementById(id);
    audio.currentTime = 0;
    audio.play();
    setDisplayText(id);
  };

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const drumPad = document.getElementById(key);
    if (drumPad) {
      playSound(key);
    }
  };

  // Use useEffect to add and remove the event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine" className="text-center mt-5">
      <div id="display" className="mb-3">
        {displayText}
      </div>
      <div className="drum-pads">
        {['Q', 'W', 'E', 'R', 'T','Q', 'W', 'E', 'R', 'T'].map((key) => (
          <div
            key={key}
            className="drum-pad btn btn-secondary mx-2 my-2"
            onClick={() => playSound(key)}
          >
            {key}
            <audio id={key} className="clip" src={`/assets/${key}.wav`}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
