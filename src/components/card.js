//Импорт переменных и функций
import { openImagePopup } from '../pages/index.js'
import { popupConfirmDeleteCard, nameForm, cardLike } from './data.js'
import { openPopUp } from './modal.js'
import { api } from './api.js'
export let cardIDdelete = ''

export default class Card {
  constructor({ data, handleCardClick }, selector) {
    this._titleCard = data.name
    this._imageCard = data.link
    this._idCard = data._id
    this.likes = data.likes
    this.owner = data.owner
    this._selector = selector
    this._handleCardClick = handleCardClick
  }

  _getElementCard() {
    const elementTemplateCard = document.querySelector(this._selector).content
    const elementNewCard = elementTemplateCard
      .querySelector('.element')
      .cloneNode(true)
    return elementNewCard
  }

  createCards() {
    this._element = this._getElementCard()

    const titleCard = this._element.querySelector('.element__title')
    titleCard.textContent = this._titleCard

    const imgCard = this._element.querySelector('.element__mask')
    imgCard.src = this._imageCard
    imgCard.setAttribute('alt', this._titleCard)

    this._element.id = this._idCard

    const cardLike = this._element.querySelector('.element__like')
    const counterLikes = this._element.querySelector('.element__counterlike')
    counterLikes.textContent = this.likes.length

    if (this.owner._id !== nameForm.id) {
      this._element
        .querySelector('.element__delete')
        .classList.add('element__delete_inactive')
    }

    this.likes.forEach((like) => {
      if (like._id == nameForm.id) {
        cardLike.classList.add('element__like-active')
      }
    })

    cardLike.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__like-active')) {
        api
          .deleteOneCardLike(this._element.id)
          .then((data) => {
            counterLikes.textContent = data.likes.length
            evt.target.classList.toggle('element__like-active')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        api
          .addOneCardLike(this._element.id)
          .then((data) => {
            counterLikes.textContent = data.likes.length
            evt.target.classList.toggle('element__like-active')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })

    this._element
      .querySelector('.element__delete')
      .addEventListener('click', function (evt) {
        const confirmDelete = new Popup(popupConfirmDeleteCard)
        confirmDelete.openPopUp()
        cardIDdelete = evt
      })

    this._setEventListeners()
    return this._element
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__mask')
      .addEventListener('click', () => {
        this._handleCardClick(this._titleCard, this._imageCard)
      })
  }
}

//Функция создать карточку
export function createCard(maskValue, titleValue, likes, owner, cardId) {
  const elementTemplate = document.querySelector('#element-template').content
  const elementNew = elementTemplate.querySelector('.element').cloneNode(true)
  const maskImg = elementNew.querySelector('.element__mask')
  elementNew.id = cardId
  const counterLikes = elementNew.querySelector('.element__counterlike')
  const cardLike = elementNew.querySelector('.element__like')
  maskImg.src = maskValue
  counterLikes.textContent = likes.length
  maskImg.setAttribute('alt', titleValue)
  elementNew.querySelector('.element__title').textContent = titleValue

  likes.forEach((like) => {
    if (like._id == nameForm.id) {
      cardLike.classList.add('element__like-active')
    }
  })

  elementNew
    .querySelector('.element__like')
    .addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__like-active')) {
        api
          .deleteOneCardLike(elementNew.id)
          .then((data) => {
            counterLikes.textContent = data.likes.length
            evt.target.classList.toggle('element__like-active')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        api
          .addOneCardLike(elementNew.id)
          .then((data) => {
            counterLikes.textContent = data.likes.length
            evt.target.classList.toggle('element__like-active')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  if (owner._id !== nameForm.id) {
    elementNew
      .querySelector('.element__delete')
      .classList.add('element__delete_inactive')
  }

  elementNew
    .querySelector('.element__delete')
    .addEventListener('click', function (evt) {
      openPopUp(popupConfirmDeleteCard)
      cardIDdelete = evt
    })
  maskImg.addEventListener('click', function () {
    openImagePopup(maskValue, titleValue)
  })
  return elementNew
}
