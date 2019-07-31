import React, { lazy } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Layouts } from '../shared';

const CreateLinkComponent = lazy(() => import('../links/CreateLink'));

const CreateLinkPage: React.FC<RouteComponentProps> = () => (
    <Layouts.Base>
      <CreateLinkComponent/>
    </Layouts.Base>
  );

export default CreateLinkPage;
