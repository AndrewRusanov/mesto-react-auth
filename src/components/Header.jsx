import logo from '../images/header__logo.svg';

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Mesto" />
    </header>
  );
};

export default Header;
