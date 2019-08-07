import React, { Fragment } from 'react';
import moment from 'moment';
import gql from 'graphql-tag';
import _noop from 'lodash/noop';
import { useMutation } from '@apollo/react-hooks';

import { Link as LinkType } from '../../types';
import { isLoggedIn } from '../../helpers';

const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!) {
        vote(linkId: $linkId) {
            id
            link {
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            user {
                id
            }
        }
    }
`;

type OwnProps = {
  link: LinkType;
  index: number;
  onUpdate?: (store: any, createVote: any, linkId: string) => void;
};

const Link: React.FC<OwnProps> =
  ({link: {url, description, createdAt, postedBy, votes, id}, index, onUpdate = _noop}) => {
    const handleUpdate = (cache: any, {data: {vote}}: any) => {
      onUpdate(cache, vote, id);
    };

    const [voteMutation] = useMutation(VOTE_MUTATION, {
      update: handleUpdate,
      variables: {linkId: id}
    });

    const handleMutation = () => voteMutation();

    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{index + 1}.</span>
          {isLoggedIn() && (
            <div className="ml1 gray f11 vote" onClick={handleMutation}>
              ▲
            </div>
          )}
        </div>
        <div className="ml1">
          <div>
            {description ? description : 'No description'}
            {url && (
              <Fragment>
                {` | `}
                <a href={url} target="_blank" rel="noopener noreferrer">link...</a>
              </Fragment>
            )}
          </div>
          <div className="f6 lh-copy gray">
            {votes && votes.length} votes | by{' '}
            {postedBy ? postedBy.name : 'Unknown'}{' '} {moment(createdAt).fromNow()}
          </div>
        </div>
      </div>
    );
  };

export default Link;
