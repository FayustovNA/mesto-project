import './index.css'
import {
  iconOpenPopupAvatar,
  popUpChahgeAvatar,
  btnOpenAddCardPopup,
  popupAddCard,
  btnOpenPopupProfileChange,
  popupChangeProfile,
  popupConfirmDeleteCard,
  popupBrowseImg,
  imgPopUp,
  imgPopUpTitle,
  btnClosePopupProfile,
  btnClosePopupCard,
  btnClosePopupBrowseImg,
  btnClosePopupDeleteCard,
  btnClosePopupChangeAvatar,
  formProfileEdit,
  allOverlays,
  formCard,
  formAvatarChange,
  mask,
  title,
  elementsContainer,
  urlLinkAvatar,
  nameInput,
  jobInput,
  nameForm,
  specializForm,
  btnConfirmDeleteCard,
  btnSaveAddCards,
} from '../components/data.js'
import { openPopUp, closePopUp } from '../components/modal.js'
import { createCard, cardIDdelete } from '../components/card.js'
import { enableValidation, resetError } from '../components/validate.js'
import {
  changeAvatar,
  submitEditProfileForm,
  addDataProfile,
} from '../components/profile.js'
import { api } from '../components/api.js';
import { validationConfig } from '../components/constants.js'
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import Card from '../components/Сard.js';
import PopupWithImage from '../components/PopupWithImage.js';

//____________________________________________________________________________________

//Рендер карточек и данных профиля
Promise.all([api.getDataProfile(), api.getDataCards()])
  .then(([dataProfile, cards]) => {
    addDataProfile(
      dataProfile.name,
      dataProfile.about,
      dataProfile.avatar,
      dataProfile._id
    )
    //renderInitialCards(cards.reverse())
    //dataCards = cards.reverse();
    // const defaultCardList = new Section({ items: cards.reverse() }, elementsContainer);
    // defaultCardList.renderItems();
    const defaultCardList = new Section({
      items: cards.reverse(), renderer: (item) => {
        const card = new Card({
          data: item, handleCardClick: () => {
            const popUpImg = new PopupWithImage({ data: item }, popupBrowseImg);
            popUpImg.openPopUp();
          }
        }, '#element-template');
        const cardElement = card.createCards();
        defaultCardList.addItem(cardElement);
      }
    }, elementsContainer);
    defaultCardList.renderItems();
  })
  .catch((error) => {
    console.log(error.message)
  })
//____________________________________________________________________________________

//Работа с попапом просмотра изображения карточки
const popUpImgBrowse = new Popup(popupBrowseImg);
popUpImgBrowse.setEventListeners();


// //Функция просмотра фотографий карточек
// export function openImagePopup(maskValue, titleValue) {
//   imgPopUp.src = maskValue
//   imgPopUpTitle.textContent = titleValue
//   imgPopUp.alt = titleValue
//   openPopUp(popupBrowseImg)
// }

//____________________________________________________________________________________

//Открытие попапов
btnOpenPopupProfileChange.addEventListener('click', function () {
  nameInput.value = nameForm.textContent
  jobInput.value = specializForm.textContent
  resetError(popupChangeProfile, validationConfig)
  openPopUp(popupChangeProfile)

}) //Открываем редактор профиля
iconOpenPopupAvatar.addEventListener('click', function () {
  resetError(popUpChahgeAvatar, validationConfig)
  openPopUp(popUpChahgeAvatar)

}) //Открываем редактор аватарки
btnOpenAddCardPopup.addEventListener('click', function () {
  resetError(popupAddCard, validationConfig)
  openPopUp(popupAddCard)

})

//____________________________________________________________________________________





btnClosePopupProfile.addEventListener('click', function () {
  closePopUp(popupChangeProfile)
}) //Закрываем редактор профиля
btnClosePopupCard.addEventListener('click', function () {
  closePopUp(popupAddCard)
}) //Закрываем добавление карточки


// btnClosePopupBrowseImg.addEventListener('click', function () {
//   const closePopUp = new Popup(popupBrowseImg);
//   closePopUp.closePopUp();
// }) //Закрываем просмотр изображение


btnClosePopupDeleteCard.addEventListener('click', function () {
  closePopUp(popupConfirmDeleteCard)

}) //Закрываем подтверждение удаления карточки
btnClosePopupChangeAvatar.addEventListener('click', function () {

  closePopUp(popUpChahgeAvatar)
}) //Закрываем редактор аватарки

//____________________________________________________________________________________

// //Функция добавить карточку
// export function addElement(maskValue, titleValue, likes, owner, cardId) {
//   const newCard = createCard(maskValue, titleValue, likes, owner, cardId)
//   elementsContainer.prepend(newCard)
// }


// //Функция рендера карточек
// export function renderInitialCards(cards) {
//   cards.forEach((card) => {
//     addElement(card.link, card.name, card.likes, card.owner, card._id)
//   })
// }

//____________________________________________________________________________________



//Валидация форм
enableValidation(validationConfig)

//____________________________________________________________________________________

// //Закрытие popUp по клику на поле
// allOverlays.forEach((overLay) => {
//   overLay.addEventListener('mousedown', function () {
//     const openedPopup = document.querySelector('.popup_opened');
//     const closePopUp = new Popup(openedPopup);
//     closePopUp.closePopUp()
//   })
// })


//____________________________________________________________________________________

//Отправка формы добавления карточки
formCard.addEventListener('submit', function (evt) {
  btnSaveAddCards.value = 'Создание...'
  evt.preventDefault()
  api
    .saveNewCards(title.value, mask.value)
    .then((data) => {
      //btnSaveAddCards.value = 'Создание...'
      addElement(data.link, data.name, data.likes, data.owner, data._id)
      closePopUp(popupAddCard)
      evt.target.reset()
    })
    .catch((error) => {
      console.error('Error', error)
    })
    .finally(() => {
      btnSaveAddCards.value = 'Создать'
    })
})

//____________________________________________________________________________________

//Отправка формы изменения карточки профиля
formProfileEdit.addEventListener('submit', (evt) => {
  evt.preventDefault()
  submitEditProfileForm(nameInput.value, jobInput.value)
})

//____________________________________________________________________________________
//Отправка формы изменения аватарки профиля
formAvatarChange.addEventListener('submit', (evt) => {
  evt.preventDefault()
  changeAvatar(urlLinkAvatar.value)
})

//____________________________________________________________________________________
//Подтверждение удаление карточки
btnConfirmDeleteCard.addEventListener('click', () => {
  btnConfirmDeleteCard.value = 'Удаление...'
  api
    .deleteCard(cardIDdelete)
    .then((data) => {
      cardIDdelete.target.closest('.element').remove()
      closePopUp(popupConfirmDeleteCard)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      btnConfirmDeleteCard.value = 'Да'
    })
})
