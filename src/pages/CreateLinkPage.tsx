import React, { lazy } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Layouts } from '../app/shared';

const CreateLinkComponent = lazy(() => import('../app/links/CreateLink'));

const CreateLinkPage: React.FC<RouteComponentProps> = () => (
    <Layouts.Base>
      <CreateLinkComponent/>
    </Layouts.Base>
  );

export default CreateLinkPage;
