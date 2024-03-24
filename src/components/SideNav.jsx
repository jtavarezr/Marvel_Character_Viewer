import React from "react";
import CharacterList from "./CharacterList";

const SideNav = ({ onCharacterClick }) => {
  return (
    <div className="sidenav">
      <h2>Marvels Characters List</h2>
      {/* Pasa la función onCharacterClick a CharacterList */}
      <CharacterList onCharacterClick={onCharacterClick} />
    </div>
  );
};

export default SideNav;
