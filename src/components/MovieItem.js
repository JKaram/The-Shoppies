import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

import { moreMovieInfo } from "utils";
import { MoreInfo } from "components"


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


  const loadMoreInfo = async () => {
    const moreInfo = await moreMovieInfo(imdbID)
    setMoreInfo(moreInfo)
    return
  }

  return (
    <>
      <Wrapper
        modifiers={isDisabled === true ? "disabled" : ""}
      >
        {movieInfo.Title}
        {movieInfo.Year}
        <a href={`https://www.imdb.com/title/${imdbID}`} >Link to IMDB</a>
        <button onClick={() => isNominated ? removeNom(movieInfo) : addNom(movieInfo)}>Nominate</button>
        <button onClick={() => loadMoreInfo()}>Load More</button>
      </Wrapper>
      {moreInfo && (<MoreInfo movieInfo={moreInfo} />)}
    </>
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