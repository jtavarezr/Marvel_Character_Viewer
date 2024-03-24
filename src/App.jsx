import React, { useState } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import CharacterInfo from "./components/CharacterInfo";

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterClick = (character) => {
    console.log("Personaje seleccionado:", character);
    setSelectedCharacter(character);
  };

  return (
    <div className="whole-page">
      <SideNav onCharacterClick={handleCharacterClick} />
      {selectedCharacter && <CharacterInfo character={selectedCharacter} />}
    </div>
  );
}

export default App;
