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

    getInitialCards(token) {
      return fetch(`${this._url}/cards`, {
        method:"GET",
        headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
            }
        })
        .then(this._handleError);
    }

    addCard({name, link}, token) {
        return fetch(`${this._url}/cards`, {
            method:"POST",
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({name:name, link:link}),
        })
        .then(this._handleError); 
    }

    deleteCard(_id, token) {
        return fetch(`${this._url}/cards/${_id}`, {
            method:"DELETE",
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
        })
        .then(this._handleError); 
    }

    getProfileInfo(token) {
        return fetch(`${this._url}/users/me`, {
            method:"GET",
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
        })
        .then(this._handleError); 
    }

    editProfileInfo({name, about}, token) {
        return fetch(`${this._url}/users/me`, {
            method:"PATCH",
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({name:name, about:about}),
        })
        .then(this._handleError); 
    }

    addLike(_id, token) {
        return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
        })
          .then(this._handleError);
      }

    deleteLike(_id, token) {
        return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
        })
          .then(this._handleError);
    }

    addAvatar(link, token) {
        return fetch(`${this._url}/users/me/avatar`, {
            method:"PATCH",
            headers: {
                ...this._headers,
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({avatar:link}),
        })
        .then(this._handleError); 
    }

    changeLikeCardStatus(_id, isLiked, token) {
        if (isLiked) {
            return this.deleteLike(_id, token);
        } else {
            return this.addLike(_id, token);
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