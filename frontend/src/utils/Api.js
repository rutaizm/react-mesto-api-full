export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _handleError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Алярма ${res.status}`);
    }

    getInitialCards() {
      return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this._handleError);
    }

    addCard(name, link, _id) {
        return fetch(`${this._url}/cards`, {
            method:"POST",
            headers: this._headers,
            body:JSON.stringify({name:name, link:link, _id:_id}),
        })
        .then(this._handleError); 
    }

    deleteCard(_id) {
        return fetch(`${this._url}/cards/${_id}`, {
            method:"DELETE",
            headers: this._headers,
        })
        .then(this._handleError); 
    }

    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
        .then(this._handleError); 
    }

    editProfileInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method:"PATCH",
            headers: this._headers,
            body:JSON.stringify({name:name, about:about}),
        })
        .then(this._handleError); 
    }

    addLike(_id) {
        return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
          .then(this._handleError);
      }

    deleteLike(_id) {
        return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
          .then(this._handleError);
    }

    addAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method:"PATCH",
            headers: this._headers,
            body:JSON.stringify({avatar:link}),
        })
        .then(this._handleError); 
    }

    changeLikeCardStatus(_id, isLiked) {
        if (isLiked) {
            return this.deleteLike(_id);
        } else {
            return this.addLike(_id);
        }
    }    

}

const api = new Api({
    url:'https://mesto.nomoreparties.co/v1/cohort-41/',
    headers: {
      authorization: "381dea00-c956-4a18-991b-777a11869f64",
      "Content-Type":"application/json", 
    }
});     

export default api