import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext'
 
function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    const cardLikeButtonClassName = isLiked ? 'element__like-button element__like-button_active ': 'element__like-button';

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }
 
    return(        
     <li className="element card">
         <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
         {isOwn && <button type="reset" className="element__delete-button" onClick={handleDeleteClick}></button>}
         <div className="element__item">
             <p className="element__title">{card.name}</p>
                 <div className="element__like-container">
                     <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                     <span className="element__like-counter">{card.likes.length}</span>
                 </div>    
         </div>
     </li>
    )
}

export default Card