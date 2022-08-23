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
            body: JSON.stringify({password:password, email:email})
        })
        .then(this._handleError);
    }    

    checkToken (token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })        
        .then(this._handleError);
        }
}

const auth = new Auth({
    BASE_URL:'http://api.rutaizm15.nomoredomains.sbs/',
    headers: {
        'Content-Type': 'application/json'
    }
});    
   
export default auth;