import { useContext } from 'react';

import { ThemeContext } from '../ThemeContext';

import logo from '../assets/norigin_logo.png';
import logoSmall from '../assets/norigin_logo_small.png';

const Navbar = ({ handleSearch }) => {
  const { isLight, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <input
        type="text"
        placeholder="Search for programme"
        className={`search-input ${isLight ? 'search-input-light' : ''}`}
        onChange={handleSearch}
      />
      <img className="logo-main" src={logo} alt="Norigin Media logo" />
      <img className="logo-main-small" src={logoSmall} alt="Norigin Media logo" />
      <div className="switch">
        <input type="checkbox" className="checkbox" onChange={toggleTheme} />
        <label htmlFor="checkbox" className={`label ${isLight ? 'label-light' : ''}`}>
          <i className="fas fa-moon" />
          <i className="fas fa-sun" />
          <span className="ball" />
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
