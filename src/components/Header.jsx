import logo from '../images/header__logo.svg';

const Header = ({loggedIn}) => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Mesto" />
    </header>
  );
};

export default Header;
