import React from "react";

const CharacterInfo = ({ character }) => {
  return (
    <div>
      <h2>{character.name}</h2>
      <p>Description: {character.description || "No description available"}</p>
      <img
        src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
        alt={character.name}
      />
    </div>
  );
};

export default CharacterInfo;
