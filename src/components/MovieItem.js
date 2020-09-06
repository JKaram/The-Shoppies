import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

import { moreMovieInfo } from "utils";
import { MoreInfo } from "components"

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
    setMoreInfo(moreInfo)
    setIsOpen(!isOpen)
    return
  }

  return (

    <Wrapper
      modifiers={isDisabled === true ? "disabled" : ""}
    >
      <div class="header">
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <h2>{movieInfo.Title}</h2>
          <h4>{movieInfo.Year}</h4>
        </div>
        <div>
          <button onClick={() => isNominated ? removeNom(movieInfo) : addNom(movieInfo)}>Nominate</button>
          <button onClick={() => loadMoreInfo()}>Load More</button>
        </div>
      </div>
      {moreInfo && isOpen && (<MoreInfo movieInfo={moreInfo} />)}
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
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0;

  .header {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px
  }

  h2, h4 {
    margin: 0;
    font-size: 12px;
  }

  h2 {
    margin-right: 10px;
    font-size: 16px;
  }

  ${applyStyleModifiers(MOVIEITEM_MODIFIERS)};
`;