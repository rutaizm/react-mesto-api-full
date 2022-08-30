export class Auth {
    constructor(config) {
        this._url = config.BASE_URL;
        this._headers = config.headers;
    }

    _handleError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Алярма ${res.status}`);
    }

    register (password, email) {
        return fetch(`${this._url}/signup`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({password:password, email:email})
        })
        .then(this._handleError);
    }    

    login (password, email) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({password:password, email:email})
        })
        .then(this._handleError);
    }    

    checkToken () {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        })        
        .then(this._handleError);
        }

    logout () {
        return fetch(`${this._url}/signout`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        })
        .then(this._handleError);
    }
};    

const auth = new Auth({
    BASE_URL:'https://api.rutaizm15.nomoredomains.sbs',
    headers: {
        'Content-Type': 'application/json'
    }
});    
   
export default auth;