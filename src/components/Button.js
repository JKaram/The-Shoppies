import styled from 'styled-components'

export const NominateButton = styled.button`
    display:inline-block;
    border:0.1em solid #FFFFFF;
    padding: 20px 83px;
    border-radius:5px;
    box-sizing: border-box;
    text-decoration:none;
    color:#fff;
    text-align:center;
    transition: all 0.2s;
    background-color: ${p => p.theme["dark-blue"]};
    width: 240px;
    height: 60px;


    &:hover{
    color:#fff;
    background-color:#D4B037;
    }
`
