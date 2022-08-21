import React from "react";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    return(
        <main className="content">
        <section className="profile">
            <div className="profile__container">
                <div className="profile__avatar-wrapper">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Жак-Ив Кусто" />
                    <button type="button" className="profile__avatar-button" onClick={onEditAvatar}></button>
                </div>                
                <div className="profile__bio"> 
                    <div className="profile__text">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__info">{currentUser.about}</p>
                </div>
            </div>
            <button className="profile__add-photo-button" type="button" onClick={onAddPlace}></button>
        </section>
        <section className="elements" aria-label="Фотографии пользователя">
            <ul className="elements__photoes">
                {cards.map((card) =>
                (<Card
                    key={card._id}
                    card={card}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                />)
                )}
            </ul>
        </section>
    </main>
    )
}

export default Main