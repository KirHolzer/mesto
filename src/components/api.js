export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _verifyResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Прозошла ошибка: ${response.status}`);
    }
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((response) => this._verifyResponse(response));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((response) => this._verifyResponse(response));
  }

  editProfile(userInfo) {
    const { name, about } = userInfo;
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((response) => this._verifyResponse(response));
  }

  createNewCard(cardData) {
    const { name, link } = cardData;
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((response) => this._verifyResponse(response));
  }

  removeExistingCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._verifyResponse(response));
  }

  putLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((response) => this._verifyResponse(response));
  }

  removeLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._verifyResponse(response));
  }

  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: `${avatar.link}` }),
    }).then((response) => this._verifyResponse(response));
  }
}
