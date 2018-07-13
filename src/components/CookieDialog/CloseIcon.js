// @flow

import React from 'react';

type Props = {
  onAccept: Function
}

export default ({ onAccept }: Props) => (
  <div className="close-icon" onClick={onAccept}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <path d="M38.75 19h-17.8V1.2a1 1 0 0 0-2 0V19H1.15a1 1 0 0 0 0 2h17.8v17.8a1 1 0 1 0 2 0V21h17.8a1 1 0 1 0 0-2z" />
    </svg>
  </div>
);
