// @flow

import styled from 'styled-components';

export default styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
background-position: bottom center;
background-repeat: no-repeat;
background-size: cover;
width: 100%;
position: relative;
.map-wrapper {
  width: 100%;
  background-color: #000;
}
.text {
  width: 100%;
  left: 0;
  margin: 0;
  padding: 4rem 0;
  text-align: left;
  color: #eaf7fc;
  position: absolute;
  .container {
    padding-left: 1.5rem;
  }
  h3 {
    font-size: 1.4rem;
    font-weight: normal;
  
    &::after {
      content: " ";
      height: 2px;
      width: 30px;
      display: block;
      background: #fff;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
  @media screen and (max-width: 992px) {
    top: 3rem;
    text-align: center;
    padding: 0;
    
    h3 {
      display: flex;
      flex-direction: column;
      &::after {
        align-self: center;
      }
    }
  }

  p {
    font-size: 0.8rem;
    margin-bottom: 5px
  }
  a {
    transition: all 0.5s ease;
    color: #fff;
    text-decoration: none;
    &:hover, &:active, &:focus {
      color: #39c0e5;
    }
  }
}
`;
