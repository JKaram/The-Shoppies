import styled from 'styled-components'

export const NominateButton = styled.button`
    display:flex;
    align-items:center;
    justify-content:center;
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
    cursor: pointer;


    &:hover{
    color:#fff;
    background-color:#D4B037;
    }
`
export const ImdbButton = styled(NominateButton)`
    color: ${p => p.theme["dark-blue"]};
    border-color: ${p => p.theme["dark-blue"]};
    background-color: #fff;
    height: 44px;
    width: 100px;


    &:hover{
    color:#fff;
    background-color:${p => p.theme["dark-blue"]};
    }
`