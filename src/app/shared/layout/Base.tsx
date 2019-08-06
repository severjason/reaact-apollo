import React from 'react';
import { Header } from '../../shared';

const BaseLayout: React.FC = ({children}) => {
  return (
    <div className="center w100">
      <Header/>
      <div className="ph3 pv1 background-gray">
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
