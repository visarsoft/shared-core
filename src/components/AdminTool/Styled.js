// @flow

import styled from 'styled-components';

export default styled.div`
  background-color: #480c75;
  position: fixed;
  left: 0;
  width: 50px;
  top: 50%;
  margin-top: -100px;
  height: 200px;
  display: flex;
  justify-content: center;
  z-index:10000;
  flex-direction: column;
  align-items: center;
  opacity: .8;
   .icon {
    width: 30px;
    height: 30px;
    color: #0A77A8;
    margin-bottom: 20px;
    &:hover {
      color: #fff;
      transition: color .5s ease;
      cursor: pointer;
    }
  }
`;
