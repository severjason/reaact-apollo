import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';
import { setToken } from '../../helpers';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
            token
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const switchLogin = () => setLogin(!login);

  const onComplete = async (data: any) => {
    const {token} = login ? data.login : data.signup;
    setToken(token);
    navigate(`/`);
  };

  const handleName = (e: React.ChangeEvent<any>) => {
    setName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<any>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<any>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!login && (
          <input value={name} onChange={handleName} type="text" placeholder="Your name"/>
        )}
        <input value={email} onChange={handleEmail} type="text" placeholder="Your email address"/>
        <input value={password} onChange={handlePassword} type="password" placeholder="Choose a safe password"/>
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{email, password, name}}
          onCompleted={onComplete}
        >
          {(mutation: () => void) => (
            <button className="pointer mr2 button" onClick={mutation}>
              {login ? 'login' : 'create account'}
            </button>
          )}
        </Mutation>
        <button className="pointer button" onClick={switchLogin}>
          {login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );

};

export default Login;
