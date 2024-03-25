import React from "react";
import Charactes from "./Characters";
import "../assets/css/SideNav.css"

const SideNav = ({ onCharacterClick }) => {
  return (
    <div className="sidenav">
      <h2>Marvels Characters List</h2>
      {/* Pasa la función onCharacterClick a CharacterList */}
      <Charactes onCharacterClick={onCharacterClick} />
    </div>
  );
};

export default SideNav;
