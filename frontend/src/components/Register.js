import React from "react";
import SigninForm from "./SigninForm";
import { Link } from "react-router-dom";
import useValidation from "../hooks/useValidation";

function Register({onRegistration}) {

    const {inputValue, error, formIsValid, setInputValue, setError, setFormIsValid, handleInputsChanges} = useValidation({});

    function handleSubmit(event) {
        event.preventDefault();
        onRegistration(inputValue);
    }
    
    return(
    <div className="signin__wrapper">   
        <SigninForm
            title="Регистрация"
            buttonTitle="Зарегистрироваться"
            onSubmit={handleSubmit}
            isValid={formIsValid}
        >
         <input
            type="Email"
            value={inputValue.email || ''}
            onChange={handleInputsChanges}
            id="mail-input"
            name="email"
            placeholder="Email"
            className={error.email ? 
                "signin__field edit-form__field_type_error" : "signin__field"} 
            required 
        />
        <span 
            className={error.email ?
            "edit-form__input-error edit-form__input-error_active" :"edit-form__input-error"}>
            {error.email}
        </span>
        <input
            type="text"
            value={inputValue.password || ''}
            onChange={handleInputsChanges}
            id="password-input"
            name="password"
            placeholder="Пароль"
            className={error.password ? 
                "signin__field edit-form__field_type_error" : "signin__field"} 
            required
            minLength="2" 
            maxLength="40"
        />  
        <span 
            className={error.password ?
            "edit-form__input-error edit-form__input-error_active" :"edit-form__input-error"}>
            {error.password}
        </span>
        </SigninForm>     
          <div className="signin__register">
          <p>Уже зарегистрированы? </p>
          <Link to="/signin" className="signin__link">Войти</Link>
        </div> 
    </div>          
    )
}

export default Register