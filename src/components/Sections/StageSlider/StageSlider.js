// @flow

import * as React from 'react';
import Slider from 'react-slick';
import StyledSlider from './Styled';
import { StyledNavLink } from '../Styled';

const settings = {
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  arrows: false,
  fade: true,
  pauseOnHover: false,
  draggable: false,
  swipe: false,
  swipeToSlide: false
};

type Props = {
  content: any,
  sectionHeight: string
};

class StageSlider extends React.Component<Props> {
  static renderSlides(slidesContent: any) {
    const slides = [];
    slidesContent.forEach(content => {
      const attributes = {
        style: {
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),
            url("${content.fieldImage.url}")`
        },
        className: 'slider-item'
      };
      slides.push(
        <div key={content.title}>
          <div {...attributes}>
            <div className='container'>
              <div className='box'>
                {content.fieldHeadline && (
                  <h2 className='headline'>{content.fieldHeadline.value}</h2>
                )}
                {content.fieldSubHeadline && (
                  <h3 className='sub-headline'>
                    {content.fieldSubHeadline.value}
                  </h3>
                )}
                {content.fieldLink && (
                  <StyledNavLink
                    className='btn btn-default'
                    to={content.fieldLink.fieldTarget}
                  >
                    {content.fieldLink.fieldHeadline}
                  </StyledNavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
    return slides;
  }

  renderSlider() {
    if (this.props.content.fieldSlides) {
      return (
        <Slider {...settings}>
          {StageSlider.renderSlides(this.props.content.fieldSlides)}
        </Slider>
      );
    }
    return null;
  }
  render() {
    if (this.props.content) {
      const styles = {};
      if (this.props.sectionHeight) {
        styles.height = this.props.sectionHeight;
      }
      return (
        <StyledSlider style={styles}>
          <div className='stage-slider'>{this.renderSlider()}</div>
        </StyledSlider>
      );
    }
    return null;
  }
}

export default StageSlider;
