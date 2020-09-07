import React from 'react'
import styled from "styled-components"

export function ProgressBar({ percent }) {

    return (
        <div style={{ height: '3rem', backgroundColor: "#efefef", borderRadius: "4px" }}>
            <Bar progress={percent} ><span className="percent">{percent}</span>&nbsp;/ 5</Bar>
        </div >
    )
}

const Bar = styled.div`
    height: 3rem;
    background-color: #D4B037;
    width: ${p => `${p.progress * 20}%`};
    opacity: ${p => p.progress > 0 ? 1 : 0};
    transition: all 1s;

    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #fff;
    font-weight: bold;

    .percent {
        font-size: 22px;
    }
`