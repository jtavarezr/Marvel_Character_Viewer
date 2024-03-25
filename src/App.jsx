import React, { useState } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import CharacterInfo from "./components/CharacterInfo";

/**
 * Main application component.
 * Renders the whole page layout including the side navigation bar and character information.
 * @returns {JSX.Element} App component.
 */
function App() {
  // Sets the initial state of the selected character to null
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  /**
   * Function to handle click events on a character.
   * @param {object} character - The selected character.
   */
  const handleCharacterClick = (character) => {
    console.log("Selected character:", character);
    setSelectedCharacter(character);
  };

  return (
    <div className="whole-page">
      {/* Passes the handle click function to the SideNav component */}
      <SideNav onCharacterClick={handleCharacterClick} />
      {/* Renders the CharacterInfo component with the selected character */}
      <CharacterInfo character={selectedCharacter} />
    </div>
  );
}

export default App;
