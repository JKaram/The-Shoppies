import styled from "styled-components";

export const NominationItem = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 24px 24px;
 margin: 8px 0;
 background-color: ${p => p.theme["light-blue"]};
 border-radius: 8px;

 h3 {
    margin : 0;
 }

.icon {
    color: #000;
    transition: color .3s;
    cursor: pointer;

    &:hover {
        color: red;
    }
  }
`