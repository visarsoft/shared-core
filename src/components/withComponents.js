// @flow

import React from 'react';

function withComponents(Wrapper: any, components: any) {
  return (props: any) => <Wrapper {...props} components={components} />;
}

export default withComponents;
