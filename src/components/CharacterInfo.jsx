import React, { useState, useEffect } from "react";

const CharacterInfo = ({ character }) => {
  const [seriesList, setSeriesList] = useState([]);

  const limit = 50;
  const offset = 0;
  const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

  const url = `https://gateway.marvel.com:443/v1/public/characters/${character.id}/series?limit=${limit}&offset=${offset}&apikey=${API_KEY}`;

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSeriesList(data.data.results);
    } catch (error) {
      console.error("Error fetching series data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Ejecuta solo una vez al montar el componente

  const handleClick = () => {
    console.log("Se ha pulsado el botón");
    console.log(seriesList);
  };

  return (
    <>
      <div className="character-card" onClick={handleClick}>
        <img
          src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
          alt={character.name}
          className="character-image"
        />
        <div className="character-details">
          <h2 className="character-name">{character.name}</h2>
          <p className="character-description">
            {character.description || "No description available"}
          </p>
        </div>
      </div>
      <br />
      <div className="grid-containergrid">
        {seriesList.map((serie) => (
          <div key={serie.id} className="card">
            <div className="card-body">
              <h4 className="card-title">{serie.title}</h4>
              <h6 className="card-subtitle text-muted">Subtitle</h6>
            </div>
            <img
              src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
              alt=""
            />
            <div className="card-body">
              <p className="card-text">{serie.description}</p>
              <a
                href={serie.urls[0].url}
                className="card-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                More...
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterInfo;
