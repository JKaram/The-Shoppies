import styled from 'styled-components';

export const NominationArea = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    margin: 0 6px;
    box-shadow: 0px 0px 30px 5px rgba(183, 183, 183, 0.2);
    background: #fff;

    .icon {
     color: #000;
     transition: color .5s;
     cursor: pointer;

     &:hover {
         color: red;
     }
  }
`;