import React from "react";

function ImagePopup({isOpen, card, onClose}) {

    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return(
    <div className={`pop-up image-popup ${isOpen && "pop-up_opened"}`} onClick={handleOverlayClick}>
        <div className="image-popup__container">
            <figure className="image-popup__photo">
                <img className="image-popup__item" src={card.link} alt={card.name} />
                <figcaption className="image-popup__caption">{card.name}</figcaption>
                <button type="button" className="pop-up__close image-popup__close-button" onClick={onClose}></button>
            </figure>
        </div>
    </div>
    )
}

export default ImagePopup