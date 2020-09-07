import React from 'react'
import styled from "styled-components"

export function Header() {
    return (
        <HeaderWrapper>
            <h1>the <span>Shoppies</span></h1>
            <p>Search and Nominate five movies</p>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin: 12px 0;
    padding: 10px 15px;
    display: flex;
    box-shadow: 0px 0px 30px 5px rgba(183, 183, 183, 0.2);
    background: #fff;
    height: 12vh;


    p {
        margin: 8px;
    }

    h1 {
        margin: 0;
        font-weight: 400;

    }
    span {
        color: ${p => p.theme["shopify-green"]};
        font-weight: 700;
    }

`