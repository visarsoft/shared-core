// @flow

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledTeaserList = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 100%;
.align-self-stretch {
  justify-content: center;
  @media screen and (max-width: 992px) {
    margin: 0 0 1rem;
    &:first-child {
      margin-top: 1rem;
    }
    .teaser {
      margin: 0;
    }
  }
}
.teaser {
  margin: 4rem 0;
  padding: 0 2rem 1rem;
  font-size: 0.8rem;
  h3 {
    font-size: 1.4rem;
    color: #3c5d70;
  }
  img {
    margin: 1rem 0;
    max-width: 100%;
  }

}
`;

export const StyledTeaserNavLink = styled(Link)`
position: relative;
display: inline-block;
margin-bottom: 2rem;
padding: 6px 12px;
outline: none;
border: none;
border-radius: 0;
color: #0b77a8;
text-decoration: none;
text-transform: uppercase;
text-shadow: 0 0 1px rgba(255,255,255,0.3);
&:hover, &:focus {
  outline: none;
}
&::before, &::after {
  display: inline-block;
  opacity: 0;
  transition: transform 0.3s, opacity 0.2s;
}
&::before {
  margin-right: 0.5rem;
  content: '[';
  transform: translateX(20px);
}
&::after {
  margin-left: 0.5rem;
  content: ']';
  transform: translateX(-20px);
}
&:hover::before, &:hover::after, &:focus::before, &:focus::after {
  opacity: 1;
  transform: translateX(0px);
}
.fa-external-link {
  padding-right: 6px;
}
`;
