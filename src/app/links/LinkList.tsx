import React from 'react';
import { Query } from 'react-apollo';

import Link from './Link';
import { Link as LinkType } from '../../types/index';
import { SubscribeToMoreOptions } from 'apollo-client';
import { FEED_QUERY, NEW_LINKS_SUBSCRIPTION } from './schemas';

type Data = {
  feed: {
    links: LinkType[];
  };
};

type SubscribeToMore = (options: SubscribeToMoreOptions) => () => void;

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

  const subscribeToNewLinks = (subscribeToMore: SubscribeToMore) => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newLink = subscriptionData.data.newLink;
        const exists = prev.feed.links.find(({ id }: {id: string}) => id === newLink.id);
        if (exists) {
          return prev;
        }
        return Object.assign({}, prev, {
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename,
          }
        });
      }
    });
  };

/*  const subscribeToNewVotes = (subscribeToMore: SubscribeToMore) => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION,
    });
  };*/

  const subscribeToAll = (subscribeToMore: SubscribeToMore) => {
   //  subscribeToNewVotes(subscribeToMore);
    subscribeToNewLinks(subscribeToMore);
  };

  return (
    <Query<Data> query={FEED_QUERY}>
      {({loading, error, data, subscribeToMore}) => {
        if (loading) {
          return <div>Fetching</div>;
        }
        if (error) {
          return <div>Error</div>;
        }

        subscribeToAll(subscribeToMore);

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
