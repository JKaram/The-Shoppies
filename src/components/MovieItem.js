import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { fetchMovieDetails } from "utils";
import { MoreInfo, NominateButton } from "components"
import { SlideIn } from "styles"
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'


export function MovieItem({ movieInfo, addNomination, isNominated }) {
  const [isDisabled, setDisabled] = useState(isNominated);
  const [moreInfo, setMoreInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const imdbID = movieInfo.imdbID

  // Set Movie Item to a disabled div
  useEffect(() => {
    setDisabled(isNominated)
  }, [isNominated]);

  const loadMovieDetails = async () => {
    const moreInfo = await fetchMovieDetails(imdbID)
    setMoreInfo(moreInfo)
    setIsOpen(!isOpen)
  }

  return (

    <Wrapper
      modifiers={isDisabled === true ? "disabled" : ""}
      onClick={() => loadMovieDetails()}
    >
      <div className="header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={movieInfo.Poster} alt={movieInfo.Title} />
          <div>
            <h2>{movieInfo.Title}</h2>
            <h4>{movieInfo.Year}</h4>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NominateButton onClick={() => addNomination(movieInfo)}>Nominate</NominateButton>
        </div>
      </div>
      {isOpen && (
        <MoreInfo movieInfo={moreInfo} />
      )}
    </Wrapper >
  )
}

// Styles for different modifier States
const MOVIEITEM_MODIFIERS = {
  disabled: () => `
    color : grey;
    opacity: 0.5;
    pointer-events: none;
  `,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 145px;
  margin: 8px 0;
  padding: 24px 24px;
  opacity: 1;
  transition: opacity 300ms ease-in-out;
  background-color: ${p => p.theme["light-blue"]};


  .header {
  display: flex;
  justify-content: space-between;
}

img {
  height: 93px;
  width: 63px
}

h2, h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 300;
  padding: 4px 24px;
}

h2 {
  margin-right: 10px;
  font-size: 24px;
  font-weight: 400
}

  .more-info {
  font-size: 12px;
}

${ applyStyleModifiers(MOVIEITEM_MODIFIERS)};
`;