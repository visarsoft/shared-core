import React from 'react';
import { StyledTeaserNavLink } from './Styled';

type Props = {
  content: {
    backgroundColor: string,
    headline: string,
    image: {
      url: string
    },
    body: string,
    link: {
      entity: {
        target: string,
        headline: string,
      }
    }
  }
};

const Teaser = (props: Props) => {
  const attributes = {
    style: {},
    className: 'teaser'
  };
  if (props.content.backgroundColor) {
    attributes.style.backgroundColor = `${props.content.backgroundColor}`;
  }
  return (
    <div className='d-flex align-self-stretch col-md-4'>
      <div {...attributes}>
        <img src={props.content.image.url} alt='' />
        <h3>{props.content.headline}</h3>
        <div className='text-center' dangerouslySetInnerHTML={{ __html: props.content.body }} />
        {props.content.link && props.content.link.entity &&
          <StyledTeaserNavLink
            className='btn btn-default'
            target='_blank'
            to={props.content.link.entity.target}
          >
            <i className='fa fa-external-link' aria-hidden='true' />
            {props.content.link.entity.headline}
          </StyledTeaserNavLink>
        }
      </div>
    </div>
  );
};

export default Teaser;
