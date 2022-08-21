import React from "react";

function SigninForm({title, buttonTitle, children, onSubmit, isValid}) {
    return(
        <div className="signin">
        <h2 className="signin__enter">{title}</h2>
        <form onSubmit={onSubmit} className="signin__form form" noValidate> 
        <fieldset className="edit-form__area">       
        {children}
        </fieldset>  
        <button className="signin__button" type="submit">
            {buttonTitle}
        </button>        
        </form>             
        </div>
    )
}

export default SigninForm;