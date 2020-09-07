import styled from 'styled-components'

export const FadeIn = styled.div`
  .transition-enter {
    opacity: 0.01;
    transform: translate(0, -10px);
  }
  .transition-enter-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 300ms ease-in;
  }
  .transition-exit {
    opacity: 1;
    transform: translate(0, 0);
  }
  .transition-exit-active {
    opacity: 0.01;
    transform: translate(0, 10px);
    transition: all 300ms ease-in;
  }
`;

export const SlideIn = styled.div`
  .slide-enter {
    opacity: 0.01;
    height: 0%;
  }
  .slide-enter-active {
    opacity: 1;
    height: 100%;
    transition: all 5s ease-in-out;
  }

  .slide-leave {
    opacity: 1;
    height: 100%;
    transition: all 1s ease-in-out;
  }

  .slide-leave-active {
    opacity: 0.01;
    height: 0%;
    transition: all 1s ease-in-out;
   }
`