import React from "react";
import success from '../images/register-success.svg';
import declined from '../images/register-declined.svg'

function InfoTooltip({isOpen, onClose, isSuccess}) {

    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return(
        <div className={`pop-up ${isOpen && "pop-up_opened"}`} onClick={handleOverlayClick}>
        <div className="pop-up__container">
            <div className="tooltip__wrapper">
                <img className="tooltip__image" src={isSuccess ? success : declined }/>
                <p className="tooltip__text">
                    {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}</p>
                <button type="button" className="pop-up__close" onClick={onClose}></button>
            </div>
        </div>
       </div>  
    )}

export default InfoTooltip;