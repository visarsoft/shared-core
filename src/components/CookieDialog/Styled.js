// @flow

import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  padding: 1.4rem 1.8rem;
  color: #333;
  background-color: rgba(255, 255, 255, .8);
  font-size: 1rem;
  width: 100%;
  .text {
    flex-basis: 90%;
  }
  .close-icon {
    width: 30px;
    color: #000;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    cursor: pointer;
    svg {
      width: 100%
      height: 100%;
      pointer-events: none;
    }
  }
`;
