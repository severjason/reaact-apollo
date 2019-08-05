import React from 'react';
import moment from 'moment';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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
  onUpdate: (store: any, createVote: any, linkId: string) => void;
};

const Link: React.FC<OwnProps> = ({link: { url, description, createdAt, postedBy, votes, id }, index, onUpdate}) => {
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {isLoggedIn() && (
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{linkId: id}}
            update={(store: any, {data: {vote}}: any) => {
              onUpdate(store, vote, id);
            }}
          >
            {(voteMutation: () => void) => (
              <div className="ml1 gray f11 vote" onClick={voteMutation}>
                ▲
              </div>
            )}
          </Mutation>
        )}
      </div>
      <div className="ml1">
        <div>
          {description} ({url})
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
