import React, { useState, useEffect } from "react";
import "../assets/css/CharacterInfo.css";
import welcomeImage from "/marvel.png"; // Import the welcome image

/**
 * CharacterInfo Component
 * Displays character information and a welcome message if no character is selected.
 * @param {Object} character - The selected character object.
 */
const CharacterInfo = ({ character }) => {
  // State to store the list of series related to the character
  const [seriesList, setSeriesList] = useState([]);
  // State to control the display of the welcome message
  const [welcomeMessage, setWelcomeMessage] = useState(true);

  const limit = 50; // Limit of series to fetch
  const offset = 0; // Offset for series pagination
  const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY; // Marvel API access key

  // URL to fetch series data for the selected character
  const url = `https://gateway.marvel.com:443/v1/public/characters/${character?.id}/series?limit=${limit}&offset=${offset}&apikey=${API_KEY}`;

  /**
   * Function to fetch series data from the Marvel API.
   */
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSeriesList(data.data.results);
      setWelcomeMessage(false); // Hide the welcome message when character data is loaded
    } catch (error) {
      console.error("Error fetching series data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [character?.id]); // Execute whenever the selected character changes

  /**
   * Function to handle click event on the character card.
   */
  const handleClick = () => {
    console.log("Button clicked");
    console.log(seriesList);
  };

  return (
    <>
      <div className="whole-info">
        <div className="character-card" onClick={handleClick}>
          {!character || welcomeMessage ? (
            // Display the welcome message and image if no character is selected
            <div>
              <h1>Select your character </h1>
              <img src={welcomeImage} alt="Welcome" className="welcome-image" />
              <h3>To start seeing their info</h3>
            </div>
          ) : (
            // Display the character image and information
            <>
              <img
                src={`${character?.thumbnail?.path}/portrait_uncanny.${character?.thumbnail?.extension}`}
                alt={character?.name}
                className="character-image"
              />
              <div className="character-details">
                <h2 className="character-name">{character?.name}</h2>
                <p className="character-description">
                  {character?.description || "No description available"}
                </p>
                {character?.urls &&
                  character.urls.map((url, index) => (
                    <a
                      key={index}
                      href={url.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="character-link"
                    >
                      {url.type}
                    </a>
                  ))}
              </div>
            </>
          )}
        </div>
        <br />
        <div className="grid-containergrid">
          {/* Display series related to the character */}
          {seriesList.map((serie) => (
            <div key={serie.id} className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                    alt=""
                    className="flip-card-image"
                  />
                </div>
                <div className="flip-card-back">
                  <h4 className="flip-card-title">{serie.title}</h4>
                  <p className="flip-card-subtitle text-muted">Subtitle</p>
                  <p className="flip-card-description">{serie.description}</p>
                  <a
                    href={serie.urls[0].url}
                    className="flip-card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More...
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CharacterInfo;
