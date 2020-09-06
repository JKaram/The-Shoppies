import React from 'react'
import styled from "styled-components"

export function ProgressBar({ percent }) {

    return (
        <div style={{ height: '2rem', backgroundColor: "#efefef", borderRadius: "4px" }}>
            <Bar progress={percent} >{percent} / 5</Bar>
        </div >
    )
}

const Bar = styled.div`
    height: 2rem;
    background-color: #18F706;
    width: ${p => `${p.progress * 20}%`};
    transition: width .5s;
    border-radius: 4px
`