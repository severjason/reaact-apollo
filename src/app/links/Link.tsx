import React from 'react';
import { Link as LinkType } from '../types';

type OwnProps = {
  link: LinkType;
};

const Link: React.FC<OwnProps> = ({link: { url, description }}) => {
  return (
    <div>
      <div>
        {description} ({url})
      </div>
    </div>
  );
};

export default Link;
