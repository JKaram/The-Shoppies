import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { moreMovieInfo } from "utils";
import { MoreInfo, NominateButton } from "components"
import { SlideIn } from "styles"
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'


export function MovieItem({ movieInfo, addNom, removeNom, isNominated }) {
  const [isDisabled, setDisabled] = useState(isNominated);
  const [moreInfo, setMoreInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const imdbID = movieInfo.imdbID

  // Set Movie Item to a disabled div
  useEffect(() => {
    setDisabled(isNominated)
  }, [isNominated]);

  const loadMoreInfo = async () => {
    const moreInfo = await moreMovieInfo(imdbID)
    setIsOpen(!isOpen)
    setMoreInfo(moreInfo)
  }

  return (

    <Wrapper
      modifiers={isDisabled === true ? "disabled" : ""}
    >
      <div className="header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>{movieInfo.Title}</h2>
          <h4>{movieInfo.Year}</h4>
        </div>
        <div>
          <span className="more-info">
            <FontAwesomeIcon icon={faAngleUp} onClick={() => loadMoreInfo()} />
          More Information
          </span>
          <NominateButton onClick={() => isNominated ? removeNom(movieInfo) : addNom(movieInfo)}>Nominate</NominateButton>

        </div>
      </div>
      <TransitionGroup component={SlideIn}>
        {isOpen && moreInfo && (
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
  margin: 20px 0;
  padding: 5px 10px;
  opacity: 1;
  transition: opacity 300ms ease-in-out;


  .header {
    display: flex;
    justify-content: space-between;
  }

  h2, h4 {
    margin: 0;
    font-size: 12px;
  }

  h2 {
    margin-right: 10px;
    font-size: 18px;
  }

  .more-info {
    font-size: 12px;
  }

  ${applyStyleModifiers(MOVIEITEM_MODIFIERS)};
`;