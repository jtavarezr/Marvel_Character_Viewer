import React, { useState, useEffect } from "react";
import "../assets/css/CharacterInfo.css";
import welcomeImage from "/marvel.png"; // Importa la imagen de bienvenida

const CharacterInfo = ({ character }) => {
  const [seriesList, setSeriesList] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState(true); // Nuevo estado para el mensaje de bienvenida

  const limit = 50;
  const offset = 0;
  const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

  const url = `https://gateway.marvel.com:443/v1/public/characters/${character?.id}/series?limit=${limit}&offset=${offset}&apikey=${API_KEY}`;

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSeriesList(data.data.results);
      setWelcomeMessage(false); // Oculta el mensaje de bienvenida cuando se carga la información del personaje
    } catch (error) {
      console.error("Error fetching series data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [character?.id]); // Ejecuta cada vez que el personaje seleccionado cambia

  const handleClick = () => {
    console.log("Se ha pulsado el botón");
    console.log(seriesList);
  };

  return (
    <>
      <div className="whole-info">
        <div className="character-card" onClick={handleClick}>
          {!character || welcomeMessage ? (
            // Muestra la imagen de bienvenida junto con el mensaje
            <div>
              <h1>Select your character </h1>
              <img src={welcomeImage} alt="Welcome" className="welcome-image" />
              <h3>To start seeing their info</h3>
            </div>
          ) : (
            <>
              {/* Muestra la imagen del personaje y su información */}
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
