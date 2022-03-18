import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const Nav = () => {
  const { auth } = useContext(AuthContext);

  return !auth.accessToken ? (
    <nav className="navbar bg-dark p-3">
      <div className="container-fluid">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <form className="d-flex">
          <Link className="redd" to="/login">
            <button className="red me-2" type="submit">
              Login
            </button>
          </Link>
          <Link className="redd" to="/register">
            <button className="red" type="submit">
              Register
            </button>
          </Link>
        </form>
      </div>
    </nav>
  ) : auth.is_staff === true ? (
    <nav className="navbar bg-dark p-3">
      <div className="container-fluid">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <form className="d-flex">
          <Link className="redd" to="/">
            <button className="red me-2" type="submit">
              Logout
            </button>
          </Link>
          <Link className="redd" to="/admin">
            <button className="red" type="submit">
              Dashboard
            </button>
          </Link>
        </form>
      </div>
    </nav>
  ) : (
    <nav className="navbar bg-dark p-3">
      <div className="container-fluid">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <form className="d-flex">
          <Link className="redd" to="/">
            <button className="red me-2" type="submit">
              Logout
            </button>
          </Link>
          <Link className="redd" to="/dashboard">
            <button className="red" type="submit">
              Dashboard
            </button>
          </Link>
        </form>
      </div>
    </nav>
  );
};

/**
 * // 
 * 
 
 */

export default Nav;
