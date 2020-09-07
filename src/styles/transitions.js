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
  }
  .slide-enter-active {
    opacity: 1;
    transition: all 500ms ease-in;
  }

  .slide-leave {
    opacity: 1;

  }

  .slide-leave-active {
    opacity: 0.01;
    transition: all 100ms ease-in-out;
   }
`