import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";

const api = "https://rickandmortyapi.com/api/character/?page=1";

export const Main = () => {
  const [fetchedData, updateFetchedData] = useState({ info: {}, results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        updateFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const display = fetchedData.results.map((character) => {
    const { id, image, name, status, location } = character;
    return (
      <>
        <div key={id} className={styles.card}>
          <img src={image} alt={name} />
          <p className={styles.name}>Status: {status}</p>
          <p className={styles.name}>Location: {location.name}</p>
          <h2 className={styles.name}>{name}</h2>
        </div>
      
      </>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Rick and Morty Characters</h1>
        <div>
          <div className={styles.characters}>{display}</div>
        </div>
      </div>
    </div>
  );
};
