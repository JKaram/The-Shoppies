import styled, { keyframes } from "styled-components";

const rotation = keyframes`
 from {
     transform: rotate(0deg);
 }
 to {
     transform: rotate(360deg);
 }
`;

export const Spinner = styled.div`
  height: 6rem;
  width: 6rem;
  border: 3px solid #000c;
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: auto auto;
  animation: ${rotation} 1s linear infinite;
`;