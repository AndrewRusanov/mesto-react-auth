import logo from "../images/header__logo.svg";
import { NavLink } from "react-router-dom";

const Register = ({ email, setEmail, password, setPassword }) => {
  return (
    <section className="login">
      <div className="login__container">
        <header className="login__header">
          <img
            src={logo}
            className="header__logo"
            alt="Логотип проекта Mesto"
          />
          <NavLink to='/sign-in' className="login__link">Войти</NavLink>
        </header>
        <form className="login__form">
          <h1 className="login__form-title">Регистрация</h1>
          <input
            type="email"
            className="login__form-input"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            className="login__form-input"
            placeholder="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" className="login__form-button">
            Зарегистрироваться
          </button>
          <p className="login__form-subtitle">
            Уже зарегистрированы?{" "}
            <NavLink to='/sign-in' className="login__form-redirect">Войти</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
