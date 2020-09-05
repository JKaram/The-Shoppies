import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

import { moreMovieInfo } from "utils";


export function MovieItem({ movieInfo, addNom, removeNom, isNominated }) {
  const [isDisabled, setDisabled] = useState(isNominated);
  const [moreInfo, setMoreInfo] = useState(null);
  const imdbID = movieInfo.imdbID
  // Set Movie Item to a disabled div
  useEffect(() => {
    setDisabled(isNominated)
  }, [isNominated]);

  // MovieInfo
  // Poster: "https://m.media-amazon.com/images/M/MV5BMTkyMTMwNjA3MV5BMl5BanBnXkFtZTcwNzE2NTI2OQ@@._V1_SX300.jpg"
  // Title: "The Batman vs. Dracula"
  // Type: "movie"
  // Year: "2005"
  // imdbID: "tt0472219"

  // { Title: "Batman Begins", Year: "2005", Rated: "PG-13", Released: "15 Jun 2005", Runtime: "140 min", … }
  // Actors: "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes"
  // Awards: "Nominated for 1 Oscar. Another 14 wins & 72 nominations."
  // BoxOffice: "$204,100,000"
  // Country: "USA, UK"
  // DVD: "18 Oct 2005"
  // Director: "Christopher Nolan"
  // Genre: "Action, Adventure"
  // Language: "English, Mandarin"
  // Metascore: "70"
  // Plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption."
  // Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
  // Production: "Warner Bros. Pictures"
  // Rated: "PG-13"
  // Ratings: Array(3)
  // 0: { Source: "Internet Movie Database", Value: "8.2/10" }
  // 1: { Source: "Rotten Tomatoes", Value: "84%" }
  // 2: { Source: "Metacritic", Value: "70/100" }
  // length: 3
  // __proto__: Array(0)
  // Released: "15 Jun 2005"
  // Response: "True"
  // Runtime: "140 min"
  // Title: "Batman Begins"
  // Type: "movie"
  // Website: "N/A"
  // Writer: "Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)"
  // Year: "2005"
  // imdbID: "tt0372784"
  // imdbRating: "8.2"
  // imdbVotes: "1,277,260"}

  const loadMoreInfo = async () => {
    const moreInfo = await moreMovieInfo(imdbID)
    setMoreInfo(moreInfo)
    console.log(moreInfo)
  }

  return (
    <Wrapper
      modifiers={isDisabled === true ? "disabled" : ""}
    >
      {movieInfo.Title}
      {movieInfo.Year}
      <a href={`https://www.imdb.com/title/${imdbID}`} >Link to IMDB</a>
      <button onClick={() => isNominated ? removeNom(movieInfo) : addNom(movieInfo)}>Nominate</button>
      <button onClick={() => loadMoreInfo()}>Load More</button>
    </Wrapper>
  )
}

// Styles for different modifier States
const MOVIEITEM_MODIFIERS = {
  disabled: () => `
    color : grey;
    opacity: 0.5;
  `,
};


const Wrapper = styled.div`
  width: 100%;
  padding: 5px 20px;
  border-radius: 4px;
  height: 30px;
  border: 1px solid #000;

  &:hover {
    transform: scale(1.1);
  }
  ${applyStyleModifiers(MOVIEITEM_MODIFIERS)};
`;