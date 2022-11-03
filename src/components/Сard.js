//Импорт переменных и функций
import {
  popupConfirmDeleteCard,
  btnConfirmDeleteCard,
  idProfile,
} from './data.js'
import Popup from './Popup.js'
import { api } from './api.js'
let idCardForDelete = ''

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

    if (this.owner._id !== idProfile.id) {
      this._element
        .querySelector('.element__delete')
        .classList.add('element__delete_inactive')
    }

    this.likes.forEach((like) => {
      if (like._id == idProfile.id) {
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
        console.log(this._element.id)
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

    this._setEventListeners()
    return this._element
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__mask')
      .addEventListener('click', () => {
        this._handleCardClick(this._titleCard, this._imageCard)
      })

    this._element
      .querySelector('.element__delete')
      .addEventListener('click', (evt) => {
        const confirmDelete = new Popup('#popup-deleteCards')
        idCardForDelete = evt.target.parentElement.id
        confirmDelete.openPopUp()

        btnConfirmDeleteCard.addEventListener('click', () => {
          btnConfirmDeleteCard.value = 'Удаление...'
          api
            .deleteCard(idCardForDelete)
            .then((data) => {
              document
                .getElementById(idCardForDelete)
                .closest('.element')
                .remove()
              confirmDelete.closePopUp()
            })
            .catch((error) => {
              console.log(error)
            })
            .finally(() => {
              btnConfirmDeleteCard.value = 'Да'
            })
        })
      })
  }
}
