import React from "react";
import SigninForm from "./SigninForm";
import useValidation from "../hooks/useValidation";

function Login({onLogin}) {

    const {inputValue, error, formIsValid, setInputValue, setError, setFormIsValid, handleInputsChanges} = useValidation({});

    function handleSubmit(event) {
        event.preventDefault();
        onLogin(inputValue);
    }
    
    return(
    <>   
        <SigninForm
            title="Вход"
            buttonTitle="Войти"
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
            autoComplete="off"
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
            autoComplete="off"
        />  
        <span 
            className={error.password ?
            "edit-form__input-error edit-form__input-error_active" :"edit-form__input-error"}>
            {error.password}
        </span>
        </SigninForm>    
    </>          
    )
}

export default Login;