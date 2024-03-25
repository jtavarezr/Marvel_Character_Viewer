import React, { useState, useEffect } from "react";
import CharacterInfo from "./CharacterInfo"; // Importa el componente CharacterInfo

/**
 * Functional Component: List
 * This component displays a list of Marvel characters and allows loading more characters when clicking a button.
 */
const List = ({ onCharacterClick }) => {
  // State to store the list of characters
  const [list, setList] = useState(null);
  // State to control the offset of the list when loading more characters
  const [offset, setOffset] = useState(0);
  // Nuevo estado para el personaje seleccionado
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // API key for the Marvel API obtained from the runtime environment
  const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  // Limit of characters to request in each API call
  const limit = 20;

  /**
   * Side Effect: Fetch Data
   * Executes when the 'offset' value changes.
   * Performs an HTTP GET request to the Marvel API to fetch character data.
   */
  useEffect(() => {
    fetchData();
  }, [offset]); // Executes every time the offset changes

  /**
   * Asynchronous function to fetch character data from the Marvel API.
   */
  const fetchData = async () => {
    try {
      // Performs a GET request to the Marvel API with the current offset and API key
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}&apikey=${API_KEY}`
      );
      // Checks if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      // Converts the response to JSON
      const data = await response.json();
      // Updates the 'list' state by adding new results to the existing list
      setList((prevList) => ({
        ...data,
        data: {
          ...data.data,
          results: [...(prevList?.data?.results || []), ...data.data.results], // Adds new results to the existing list
        },
      }));
    } catch (error) {
      console.error("Error fetching character data:", error);
    }
  };

  /**
   * Function to handle click on a character.
   * @param {object} character - The selected character.
   */
  const handleClick = (character) => {
    console.log("handleClick", character);
    onCharacterClick(character);

    setSelectedCharacter(character); // Actualiza el estado del personaje seleccionado
    // Here you could implement logic to handle click on a character
  };

  /**
   * Function to handle click on the 'Load More' button.
   * Increments the offset to load more characters in the list.
   */
  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + limit); // Increments the offset for the next request
  };

  // Renders the list of characters and the 'Load More' button
  return (
    <>
      <div>
        {list && 
          list.data &&
          list.data.results.map((character, index) => (
            <li key={`${character.id}-${index}`} // Unique key for each list item
              onClick={() => handleClick(character)} // Handles click on the character
            >
              {character.name} {/* Displays the name of the character */}
            </li>
          ))}
      </div>
      <button onClick={handleLoadMore}>Load More</button>{" "}
      {/* Button to load more characters */}
      {/* Muestra CharacterInfo solo si selectedCharacter tiene un valor */}
      {/*selectedCharacter && <CharacterInfo character={selectedCharacter} />*/}
    </>
  );
};

export default List;
