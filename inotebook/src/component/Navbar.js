import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">iNotebook</Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/"> Home</Link>
          </li>


          <li className="nav-item ">
            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about"> About </Link>
          </li>
        </ul>


        {!localStorage.getItem('token') ? (
          <form className="d-flex">
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
          </form>
        ) : (
          <button className="btn btn-primary" onClick={logout}>
            Log Out
          </button>
        )}


      </div>
    </nav>
  );
}
