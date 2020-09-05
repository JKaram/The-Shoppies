import React, { useState } from 'react'
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

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

export function MovieItem({ movieInfo, children, addNom }) {
  const [isDisabled, setDisabled] = useState(false)

  // MovieInfo
  // Poster: "https://m.media-amazon.com/images/M/MV5BMTkyMTMwNjA3MV5BMl5BanBnXkFtZTcwNzE2NTI2OQ@@._V1_SX300.jpg"
  // Title: "The Batman vs. Dracula"
  // Type: "movie"
  // Year: "2005"
  // imdbID: "tt0472219"
  return (
    <Wrapper
      modifiers={isDisabled === true ? "disabled" : ""}
      onClick={() => addNom(movieInfo)}>
      {children}
    </Wrapper >
  )
}