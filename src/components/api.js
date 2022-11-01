import { v4 as uuidv4 } from 'uuid'

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  getDataCards = () => {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._checkResponse)
  }

  saveNewCards = (titleCards, imgLinkUrl) => {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        _id: uuidv4(),
        name: titleCards,
        link: imgLinkUrl,
        likes: [],
      }),
    }).then(this._checkResponse)
  }

  getDataProfile = () => {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._checkResponse)
  }

  deleteCard = (evt) => {
    return fetch(`${this.baseUrl}/cards/${evt}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(this._checkResponse)
  }

  saveDataProfile = (nameData, specializData) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: nameData,
        about: specializData,
      }),
    }).then(this._checkResponse)
  }

  saveAvatarProfile = (imgAvatar) => {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: imgAvatar,
      }),
    }).then(this._checkResponse)
  }

  addOneCardLike = (id) => {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers,
    }).then(this._checkResponse)
  }

  deleteOneCardLike = (id) => {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(this._checkResponse)
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'bfe9fc91-7210-42ab-9043-e5db917b2ecc',
    'Content-Type': 'application/json',
  },
})
