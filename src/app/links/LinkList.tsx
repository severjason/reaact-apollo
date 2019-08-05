import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

import Link from './Link';
import { Link as LinkType } from '../../types/index';

export const FEED_QUERY: DocumentNode = gql`
    {
        feed {
            links {
                id
                createdAt
                url
                description
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
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

  const updateCacheAfterVote = (store: any, createdVote: any, linkId: string) => {
    const data = store.readQuery({ query: FEED_QUERY });
    data.feed.links.forEach((link: LinkType) => {
      if (link.id === linkId) {
        link.votes.push(createdVote);
      }
      return link;
    });

    store.writeQuery({ query: FEED_QUERY, data });
  };

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

        return linksToRender.map((link, index) => (
          <Link
            key={link.id}
            link={link}
            index={index}
            onUpdate={updateCacheAfterVote}
          />)
        );
      }}
    </Query>
  );
};

export default LinkList;
