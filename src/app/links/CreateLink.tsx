import React, { useState } from 'react';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import { Mutation } from 'react-apollo';

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

  const updateUrl = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setUrl(value);
  };

  const updateDescription = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setDescription(value);
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
      <Mutation mutation={POST_MUTATION} variables={{description, url}}>
        {(postMutation: any) => (
          <button onClick={postMutation}>Submit</button>
        )}
      </Mutation>
    </div>
  );
};

export default CreateLink;
