import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { MoreInfo, NominateButton } from "components"
import invalidPoster from "images/invalidPoster.png"
import { SlideIn } from "styles"
import { fetchMovieDetails } from "utils";


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
          <img className="poster" src={movieInfo.Poster !== "N/A" ? movieInfo.Poster : invalidPoster} alt={movieInfo.Title} />
          <div>
            <h2>{movieInfo.Title}</h2>
            <h4>{movieInfo.Year}</h4>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NominateButton onClick={(e) => {
            e.stopPropagation();
            addNomination(movieInfo);
            setIsOpen(false);
          }}>Nominate</NominateButton>
        </div>
      </div>
      <TransitionGroup component={SlideIn}>
        {isOpen && (
          <CSSTransition timeout={300} classNames="slide">
            <MoreInfo movieInfo={moreInfo} />
          </CSSTransition>
        )}
      </TransitionGroup>

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
  height: 100%;
  margin: 8px 0;
  padding: 24px 24px;
  opacity: 1;
  transition: all 300ms ease-in-out;
  background-color: ${p => p.theme["light-blue"]};
  cursor: pointer;

 &:hover {
  background-color: ${p => p.theme["hover-blue"]};
}
  .header {
  display: flex;
  justify-content: space-between;
}

.poster {
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