import React, { useState } from 'react'
import styled from "styled-components"

export function ProgressBar({ percent }) {

    return (
        <div style={{ height: '3rem', backgroundColor: "grey" }}>
            <Bar progress={percent} />
        </div >
    )
}

const Bar = styled.div`
    height: 3rem;
    background-color: green;
    width: ${p => `${p.progress * 20}%`};
    transition: width .5s
`