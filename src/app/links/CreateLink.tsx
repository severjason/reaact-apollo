import React, { useState, Fragment } from 'react';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { navigate } from '@reach/router';
import { LINKS_PER_PAGE } from '../../constants';
import { FEED_QUERY } from './schemas';
import { LinkOrderByInput } from '../../types';

const POST_MUTATION: DocumentNode = gql`
    mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`;

const CreateLink: React.FC = () => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [showError, setShowError] = useState(true);

  const updateUrl = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setUrl(value);
  };

  const updateDescription = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setDescription(value);
  };

  const onComplete = () => {
    navigate('/');
  };

  const clearValues = () => {
    setDescription('');
    setUrl('');
  };

  const handleMutation = (mutation: () => void) => (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setShowError(true);
    mutation();
    clearValues();
  };

  const handleUpdate = (store: any, { data: { post } }: any) => {
    const first = LINKS_PER_PAGE;
    const skip = 0;
    const orderBy = LinkOrderByInput.createdAt_DESC;
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { first, skip, orderBy }
    });
    data.feed.links.unshift(post);
    store.writeQuery({
      query: FEED_QUERY,
      data,
      variables: { first, skip, orderBy }
    });
  };

  const hideError = () => {
    setShowError(false);
  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={updateDescription}
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={url}
          onChange={updateUrl}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <Mutation mutation={POST_MUTATION} variables={{description, url}} onCompleted={onComplete} update={handleUpdate}>
        {(postMutation: MutationFn, {loading, error}: MutationResult) => {
          const isDisabled = loading || !description || !url;
          return (
            <Fragment>
              {error && showError && (
                <div onClick={hideError} className="w-90 ba br2 pa3 mv2 red bg-washed-red">
                  {error.message}
                </div>
              )}
              <button onClick={handleMutation(postMutation)} disabled={isDisabled}>Submit</button>
            </Fragment>
          );
        }}
      </Mutation>
    </div>
  );
};

export default CreateLink;
