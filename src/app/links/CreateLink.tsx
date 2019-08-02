import React, { useState, Fragment } from 'react';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { navigate } from '@reach/router';

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
      <Mutation mutation={POST_MUTATION} variables={{description, url}} onCompleted={onComplete}>
        {(postMutation: MutationFn, {loading, error}: MutationResult) => {
          return (
            <Fragment>
              {error && showError && (
                <div onClick={hideError} className="w-90 ba br2 pa3 mv2 red bg-washed-red">
                  {error.message}
                </div>
              )}
              <button onClick={handleMutation(postMutation)} disabled={loading || !description || !url}>Submit</button>
            </Fragment>
          );
        }}
      </Mutation>
    </div>
  );
};

export default CreateLink;
