import React, { lazy } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Layouts } from '../shared';

const NotFoundComponent = lazy(() => import('../shared/errors/NotFound'));

const NotFoundPage: React.FC<RouteComponentProps> = () => (
    <Layouts.Base>
      <NotFoundComponent/>
    </Layouts.Base>
  );

export default NotFoundPage;
