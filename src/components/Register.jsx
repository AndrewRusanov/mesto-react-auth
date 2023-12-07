import { NavLink } from "react-router-dom"
import Form from "./Form"

const Register = () => {
  return <div className="sign" >
    <h1 className="sign__title">Регистрация</h1>
    <Form buttonText="Зарегистрироваться" />
    <p className="sign__subtitle" >Вы уже зарегистрированы? <NavLink className="sign__link-in" to="/sign-in" >Войти</NavLink></p>
  </div>
}

export default Register