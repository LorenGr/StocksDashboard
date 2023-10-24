import { NavLink } from 'react-router-dom';
import './navbar.css';
const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            className={
              ({ isActive }) => isActive ? "nav__link--active" : "nav__link "}
            to="/">
            Dashboard
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className={
            ({ isActive }) => isActive ? "nav__link--active" : "nav__link "} to="/profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;