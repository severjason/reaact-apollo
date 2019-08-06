import React, { Component } from 'react';
import { Location, WindowLocation } from '@reach/router';

export type WithLocation = {
  location: WindowLocation;
};

const  withLocation = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return class extends Component<P> {
    render() {
      return (
        <Location>
          {({location}) => (
            <WrappedComponent location={location} {...this.props}/>
          )}
        </Location>
      );
    }
  };
};

export default withLocation;
