import React from "react";
import PopupWithForm from './PopupWithForm';

function PopupWithConfirmation ({isOpen, onClose, onSubmit, renderLoading}) {

    return (
        <PopupWithForm
            isOpen={isOpen} 
            onClose={onClose}
            name="PopupWithConfirmation"
            title="Вы уверены?"
            buttonTitle="Да"
            buttonLoadText='Удаление...'
            onSubmit={onSubmit}
            renderLoading={renderLoading}      
        >        
        </PopupWithForm>  
    )
}

export default PopupWithConfirmation;