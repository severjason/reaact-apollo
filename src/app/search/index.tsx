import React, { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import _getOr from 'lodash/fp/getOr';

import { Link } from '../links';
import { Link as LinkType } from '../../types';

const FEED_SEARCH_QUERY = gql`
    query FeedSearchQuery($filter: String!) {
        feed(filter: $filter) {
            links {
                id
                url
                description
                createdAt
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

const Search: React.FC<{}> = () => {
  const [filter, setFilter] = useState('');
  const [links, setLinks] = useState<LinkType[]>([]);
  const client = useApolloClient();

  const handleFilter = (e: React.ChangeEvent<any>) => {
    setFilter(e.target.value);
  };

  const handleSearch = async () => {
    const result = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: {filter},
    });
    const resLinks = _getOr([], 'data.feed.links', result);
    setLinks(resLinks);
  };

  return (
    <div>
      <div>
        Search
        <input type="text" onChange={handleFilter}/>
        <button onClick={handleSearch}>OK</button>
      </div>
      {links.map((link, index) => (
        <Link key={link.id} link={link} index={index}/>
      ))}
    </div>
  );
};

export default Search;
