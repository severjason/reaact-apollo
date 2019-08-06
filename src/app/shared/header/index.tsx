import React from 'react';
import { Link, navigate } from '@reach/router';
import { clearToken, isLoggedIn } from '../../../helpers';

const Header: React.FC = () => {

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to="/" className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to="/search" className="ml1 no-underline black">
          search
        </Link>
        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          submit
        </Link>
      </div>
      <div className="flex flex-fixed">
        {isLoggedIn() ? (
          <div className="ml1 pointer black" onClick={handleLogout}>
            logout
          </div>
        ) : (
          <Link to="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;