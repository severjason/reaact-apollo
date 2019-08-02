import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

import Link from './Link';
import { Link as LinkType } from '../../types/index';

const FEED_QUERY: DocumentNode = gql`
    {
        feed {
            links {
                id
                createdAt
                url
                description
            }
        }
    }
`;

type Data = {
  feed: {
    links: LinkType[];
  };
};

const LinkList: React.FC = () => {
  return (
    <Query<Data> query={FEED_QUERY}>
      {({loading, error, data}) => {
        if (loading) {
          return <div>Fetching</div>;
        }
        if (error) {
          return <div>Error</div>;
        }

        const linksToRender: LinkType[] = data ? data.feed.links : [];

        return linksToRender.map(link => <Link key={link.id} link={link}/>);
      }}
    </Query>
  );
};

export default LinkList;
