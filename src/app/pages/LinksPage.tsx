import React, { lazy } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Layouts } from '../shared';

const LinkListComponent = lazy(() => import('../links/LinkList'));

const LinksPage: React.FC<RouteComponentProps> = () => (
    <Layouts.Base>
      <LinkListComponent/>
    </Layouts.Base>
  );

export default LinksPage;
