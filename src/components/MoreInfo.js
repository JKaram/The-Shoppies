import fresh from "images/tomato-fresh.png"
import notFresh from "images/tomato-notFresh.png"
import styled from 'styled-components';
import React from 'react'

import { ImdbButton } from "components"

export function MoreInfo({ movieInfo }) {
    const tomatoesRating = movieInfo.Ratings[1] ? movieInfo.Ratings[1].Value : null
    let isFresh = fresh

    if (tomatoesRating && (parseInt(tomatoesRating.replace('%', '')) < 60)) {
        isFresh = notFresh
    }

    return (
        <Wrapper>
            <div className="info-section">
                <div >
                    <h4 className="info-text">Summary</h4>
                    <p className="summary">{movieInfo.Plot}</p>
                </div>
                <a href={`https://www.imdb.com/title/${movieInfo.imdbID}`} target="_blank" rel="noopener noreferrer">
                    <ImdbButton>IMDB</ImdbButton>
                </a>
            </div>
            <div className="info-section">
                <div className="info-text">
                    <h4>Director</h4>
                    <h3>{movieInfo.Director}</h3>
                </div>

                <div className="info-text">
                    <h4>Actors</h4>
                    <h3>{movieInfo.Actors}</h3>
                </div>
                <div style={{ display: "flex" }}>
                    {tomatoesRating && (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <TomatoIcon src={isFresh} />
                            <h4 style={{ display: "inline-block" }}>{tomatoesRating}</h4>
                        </div>
                    )}
                </div>
            </div>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 24px 0 0;
    height: auto;

    a {
        text-decoration:none;

    }

    p {
        padding: 0;
        margin: 0;
        font-size: 14px;
    }

    h3, h4 {
        left: 0;
        padding: 0;
        margin: 0;
        font-size: 13px;
        font-weight: 400;
    }

    h4 {
        font-weight: bold;
        font-size: 14px;
    }

    .info-section {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 4px;
    }

    .summary {
        margin-bottom: 16px;
    }

    .info-text{
        padding: 4px 0;
    }

    .divider {
        border: 1px solid #E2F3FF
    }
`;

const TomatoIcon = styled.img`
    height: 20px;
    width: 20px;
    margin-right: 10px;
`

