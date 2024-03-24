import React, { useState, useEffect } from "react";
import axios from "axios";

const CharacterList = ({ onCharacterClick }) => {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

  useEffect(() => {
    fetchData();
  }, [offset, API_KEY]);

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://gateway.marvel.com/v1/public/characters",
        {
          params: {
            limit: 20,
            offset: offset,
            apikey: API_KEY,
          },
        }
      );
      if (response.status === 200) {
        const newCharacters = response.data.data.results;
        const updatedCharacters = [...characters, ...newCharacters];
        setCharacters(updatedCharacters);
        setFilteredResults(applyFilter(updatedCharacters));
      } else {
        throw new Error("Error fetching character data");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilter = (data) => {
    if (!searchInput.trim()) {
      return data; // Devuelve la lista completa si el campo de búsqueda está vacío
    } else {
      return data.filter((character) =>
        character.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    setFilteredResults(applyFilter(characters));
  };

  const handleClick = (character) => {
    if (typeof onCharacterClick === "function") {
      onCharacterClick(character);
    }
  };

  const handleLoadMore = () => {
    setOffset(offset + 20);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => searchItems(e.target.value)}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {filteredResults.map((character) => (
          <li key={character.id} onClick={() => handleClick(character)}>
            {character.name}
          </li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>Load more</button>
    </div>
  );
};

export default CharacterList;
