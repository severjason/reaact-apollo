import React, { lazy } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Layouts } from '../app/shared';

const LoginComponent = lazy(() => import('../app/auth/Login'));

const LoginPage: React.FC<RouteComponentProps> = () => (
    <Layouts.Base>
      <LoginComponent/>
    </Layouts.Base>
  );

export default LoginPage;
