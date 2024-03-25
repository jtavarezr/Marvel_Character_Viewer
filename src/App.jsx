import React, { useState } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import CharacterInfo from "./components/CharacterInfo";

function App() {
  // Establece el estado inicial del personaje seleccionado como null
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Función para manejar el clic en un personaje
  const handleCharacterClick = (character) => {
    console.log("Personaje seleccionado:", character);
    setSelectedCharacter(character);
  };

  return (
    <div className="whole-page">
      {/* Pasa la función de manejo de clics al componente SideNav */}
      <SideNav onCharacterClick={handleCharacterClick} />
      {/* Renderiza CharacterInfo con el personaje seleccionado */}
      <CharacterInfo character={selectedCharacter} />
    </div>
  );
}

export default App;
