// @flow

import * as React from 'react';
import bowser from 'bowser';
import StyledText from './Styled';
import Map from './Map';

const APIKEY = 'AIzaSyBwFr1wkGl5J2idXwvVLaqL6NniGGmAjQk';

type Props = {
  content: {
    fieldImage: {
      url: string
    },
    body: {
      value: string
    }
  }
};

class Text extends React.Component<Props> {
  static renderMap() {
    return (
      <div className='map-wrapper'>
        <Map
          className='map'
          isMarkerShown={!bowser.mobile}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${APIKEY}&v=3.exp&libraries=geometry,drawing`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '310px', width: '100%', opacity: '.8' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
  render() {
    if (this.props.content) {
      const styles = {};
      if (this.props.content.fieldImage) {
        styles.backgroundImage = `url(${this.props.content.fieldImage.url})`;
      }
      return (
        <StyledText
          style={styles}
        >
          <div className='text'>
            <div className='container' dangerouslySetInnerHTML={{ __html: this.props.content.body && this.props.content.body.value }} />
          </div>
        </StyledText>
      );
    }
    return null;
  }
}

export default Text;
