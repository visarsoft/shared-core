// @flow

import styled from 'styled-components';

export const StyledSlider = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  color: #fff;
  .stage-slider {
    flex: 1;
    overflow: hidden;
    height: 100%;
    .slick-list,
    .slick-slider,
    .slick-track,
    .slider-item {
      height: 100%;
      width: 100%;
    }
    .slick-list {
      padding: 0 !important;
    }
    .slider-item {
      height: 100%;
      text-align: center;
      color: #fff;
      background-position: 0 0;
      background-size: cover;
      .container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #fff;
        background-position: 0 0;
        background-size: cover;
        position: relative;
        .box {
          width: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .headline {
        font-size: 5rem;
        font-weight: bold;
        color: #fff;
      }
      .sub-headline {
        font-size: 2.5rem;
      }
    }
    .slick-slide.slick-active {
      z-index: 1;
    }
    @media screen and (max-width: 768px) {
      .container {
        .headline {
          font-size: 2rem;
        }
        .sub-headline {
          font-size: 1.5rem;
          font-weight: normal;
          margin: 60px 0;
        }
      }
    }
  }
`;
