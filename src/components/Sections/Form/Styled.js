// @flow

import styled from 'styled-components';

export const StyledForm = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 100%;
background-color: #fff;
margin: 2rem 0 2rem;
`;

export const StyledInput = styled.fieldset`
  input {
    background-color: #e6ebee;
  }
`;

export const StyledTextarea = styled.fieldset`
  textarea {
    background-color: #e6ebee;
  }
`;

export const StyledButton = styled.fieldset`
  button {
    padding: ${props => (props.loading ? '.4rem' : '.8rem')};
    margin-top: 2rem;
    color: #fff;
    background-color: #0b77a8;
    border: none;
    border-radius: 0;
    box-shadow: 0 1px 2px rgba(0,0,0,.6);
    transition: background-color 1s ease;
    text-transform: uppercase;
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
  }
`;
