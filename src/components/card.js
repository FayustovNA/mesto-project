//Импорт переменных и функций
import { openImagePopup } from '../pages/index.js'
import { popupConfirmDeleteCard, nameForm, cardLike } from './data.js'
import { openPopUp } from './modal.js'
import { api } from './api.js'
export let cardIDdelete = ''

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
