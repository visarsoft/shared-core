// @flow

import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

export const StyledSection = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 100%;
background-position: bottom center;
background-repeat: no-repeat;
background-size: cover;
align-content: flex-start;
text-align: center;
font-size: 1.2rem;
color: #7c7c7c;

>.headline {
  background-color: #fff;
  text-align: center;
  width: 100%;
}
h2 {
  font-family: 'Muli', sans-serif;
  font-size: 3rem;
  padding: 3rem 1rem 0;
  color: #335D71;
}
hr {
  margin-top: 40px;
  margin-bottom: 40px;
  width: 40px;
  border: 0;
  border-top: 1px solid #3a5d70;
  border-bottom: 1px solid #3a5d70;
}
`;

export const StyledNavLink = styled(NavLink)`
&.btn {
  margin-top: 2rem;
  margin-bottom: 4rem;
  padding: 1rem;
  color: #fff;
  background-color: #0b77a8;
  border: none;
  border-radius: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,.6);
  transition: background-color 1s ease;
  text-transform: uppercase;
}
.slick-active & {
  z-index: 9;
  position: relative;
}
&:hover, &:active, &:focus {
    outline: none;
    color: #fff;
    background-color: #43b1e0;
    box-shadow: 0 1px 2px rgba(0,0,0,.6);
}
`;
