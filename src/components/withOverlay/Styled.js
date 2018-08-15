// @flow

import styled from 'styled-components';

export default styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  .overlay-headline {
    h4 {
      color: #7c7c7c;
      margin-top: 20px;
    }
  }
  .overlay-content {
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    background-color: white;
    width: 500px;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    @media (max-width: 767px) {
      width: 95%;
    }
    .row {
      width: 100%;
      margin: 0;
      > div {
        width: 100%;
      }
    }
  }
  .overlay-headline {
    text-align: center;
  }
  .overlay-closeBtn {
    position: absolute;
    top: -12px;
    right: -11px;
    width: 32px;
    height: 32px;
    border-radius: 100px;
    background-color: #fff;
    color: #000;
    border: 1px solid #fff;
    z-index: 3;
    font-size: 17px;
    &:focus {
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;
