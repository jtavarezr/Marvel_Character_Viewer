import React from "react";
import Charactes from "./Characters";
import "../assets/css/SideNav.css";

/**
 * Functional component for the side navigation bar.
 * Renders a list of Marvel characters.
 * @param {Function} onCharacterClick - Function to handle click events on characters.
 * @returns {JSX.Element} SideNav component.
 */
const SideNav = ({ onCharacterClick }) => {
  return (
    <div className="sidenav">
      <h2>Marvels Characters List</h2>
      {/* Passes the onCharacterClick function to the Characters component */}
      <Charactes onCharacterClick={onCharacterClick} />
    </div>
  );
};

export default SideNav;
