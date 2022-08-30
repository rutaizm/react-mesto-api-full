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
        method:"GET",
        headers: this._headers,
        credentials: 'include',
        })
        .then(this._handleError);
    }

    addCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            method:"POST",
            headers: this._headers,
            credentials: 'include',
            body:JSON.stringify({name:name, link:link}),
        })
        .then(this._handleError); 
    }

    deleteCard(_id) {
        return fetch(`${this._url}/cards/${_id}`, {
            method:"DELETE",
            headers: this._headers,
            credentials: 'include',
        })
        .then(this._handleError); 
    }

    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            method:"GET",
            headers: this._headers,
            credentials: 'include',
        })
        .then(this._handleError); 
    }

    editProfileInfo({name, about}) {
        return fetch(`${this._url}/users/me`, {
            method:"PATCH",
            headers: this._headers,
            credentials: 'include',
            body:JSON.stringify({name:name, about:about}),
        })
        .then(this._handleError); 
    }

    addLike(_id) {
        return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: this._headers,
            credentials: 'include',
        })
          .then(this._handleError);
      }

    deleteLike(_id) {
        return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        })
          .then(this._handleError);
    }

    addAvatar(link) {
        return fetch(`${this._url}/users/me/avatar`, {
            method:"PATCH",
            headers: this._headers,
            credentials: 'include',
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
    url:'https://api.rutaizm15.nomoredomains.sbs',
    headers: {
        "Content-Type":"application/json", 
        'Accept': 'application/json',
    }
});     

export default api