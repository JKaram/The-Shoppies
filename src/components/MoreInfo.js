import React from 'react'
import styled from 'styled-components';
import fresh from "images/tomato-fresh.png"
import notFresh from "images/tomato-notFresh.png"

export function MoreInfo({ movieInfo }) {
    const tomatoesRating = movieInfo.Ratings[1] ? movieInfo.Ratings[1].Value : null
    let isFresh = fresh

    if (tomatoesRating && (parseInt(tomatoesRating.replace('%', '')) < 60)) {
        isFresh = notFresh
    }

    return (
        <Wrapper>

            <Poster src={movieInfo.Poster} alt={movieInfo.Title} />
            <div className="info">
                <p >{movieInfo.Plot}</p>
                <div>
                    <h4>Director</h4>
                    <h3>{movieInfo.Director}</h3>
                </div>

                <div>
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



                    <a href={`https://www.imdb.com/title/${movieInfo.imdbID}`} target="_blank" rel="noopener noreferrer">IMDB</a>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    padding: 5px 10px;

    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 15px;
    }

    p {
        margin: 0;
        font-size: 14px;
    }

    h3, h4 {
        margin: 0;
        font-size: 13px;
        font-weight: 400;
    }

    h4 {
        font-weight: bold;
        font-size: 14px;
    }
`;

const Poster = styled.img`
    height: 190px;
    width: 128px;
    border-radius: 4px;
    border: 1px solid #000;
`;

const TomatoIcon = styled.img`
    height: 20px;
    width: 20px;
    margin-right: 10px;
`