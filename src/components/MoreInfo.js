import React, { useState } from 'react'
import styled from 'styled-components';
import fresh from "images/tomato-fresh.png"
import notFresh from "images/tomato-notFresh.png"

export function MoreInfo({ movieInfo }) {
    const tomatoesRating = movieInfo.Ratings[1] ? movieInfo.Ratings[1].Value : null
    let isFresh = fresh

    if (tomatoesRating && (parseInt(tomatoesRating.replace('%', '')) < 60)) {
        isFresh = notFresh
    }

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
    console.log(tomatoesRating)
    console.log(isFresh)
    return (
        <Wrapper>

            <Poster src={movieInfo.Poster} alt={movieInfo.Title} />
            <div class="info">
                <p >{movieInfo.Plot}</p>
                <div>
                    <h4>Director</h4>
                    <h3>{movieInfo.Director}</h3>
                </div>

                <div>
                    <h4>Actors</h4>
                    <h3>{movieInfo.Actors}</h3>
                </div>

                {tomatoesRating && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <TomatoIcon src={isFresh} />
                        <h4 style={{ display: "inline-block" }}>{tomatoesRating}</h4>
                    </div>
                )}



                <a href={`https://www.imdb.com/title/${movieInfo.imdbID}`} target="_blank">Check out imdb for more info</a>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    padding: 15px 10px;

    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 15px;
    }

    p {
        margin: 0;
    }

    h3, h4 {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
    }

    h4 {
        font-weight: bold;

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