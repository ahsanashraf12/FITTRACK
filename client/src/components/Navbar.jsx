import './Navbar.css';
import { NavLink } from "react-router-dom";


export const Navbar = () => {
    return (
      <>
        <header>
          <div className="container">
            <div className="logo-brand">
              <NavLink to="/">FITTRACK</NavLink>
            </div>

            <nav>
              <ul>
                <li>
                  <NavLink to="/"> Home </NavLink>
                </li>
                <li>
                  <NavLink to="/login"> Login </NavLink>
                </li>
                <li>
                  <NavLink to="/register"> Register </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </>
    );
};