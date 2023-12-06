import { NavLink } from "react-router-dom";
import logo from "../images/header__logo.svg";

const Login = ({email, setEmail, password, setPassword}) => {

  return (
    <section className="login">
      <div className="login__container">
        <header className="login__header">
          <img
            src={logo}
            className="header__logo"
            alt="Логотип проекта Mesto"
          />
          <NavLink to='/sign-up' className="login__link">Регистрация</NavLink>
        </header>
        <form className="login__form">
          <h1 className="login__form-title">Вход</h1>
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
            Войти
          </button>
        </form>
      </div>
    </section>
  );
};
export default Login;
