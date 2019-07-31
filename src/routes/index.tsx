import React, { Suspense } from 'react';
import { Router } from '@reach/router';

import { Errors } from '../app/shared';
import { LinksPage, NotFoundPage, CreateLinkPage } from '../pages';

const Routes: React.FC = () => {
  return (
    <Errors.Boundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <LinksPage path="/"/>
          <CreateLinkPage path="/create"/>
          <NotFoundPage default={true}/>
        </Router>
      </Suspense>
    </Errors.Boundary>
  );
};

export default Routes;
