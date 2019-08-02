import React, { Suspense } from 'react';
import { Router } from '@reach/router';

import { Errors } from '../app/shared';
import { LinksPage, NotFoundPage, CreateLinkPage, LoginPage } from '../pages';

const Routes: React.FC = () => {
  return (
    <Errors.Boundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <LinksPage path="/"/>
          <CreateLinkPage path="/create"/>
          <LoginPage path="/login"/>
          <NotFoundPage default={true}/>
        </Router>
      </Suspense>
    </Errors.Boundary>
  );
};

export default Routes;
