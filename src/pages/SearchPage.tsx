import React, { lazy } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Layouts } from '../app/shared';

const SearchComponent = lazy(() => import('../app/search'));

const SearchPage: React.FC<RouteComponentProps> = () => (
    <Layouts.Base>
      <SearchComponent/>
    </Layouts.Base>
  );

export default SearchPage;
