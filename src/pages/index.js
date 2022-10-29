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
import Card from '../components/card.js'
import Section from '../components/section.js'
import { PopupWithImage, PopupWithForm } from '../components/popup.js'
import { enableValidation, resetError } from '../components/validate.js'
import {
  changeAvatar,
  submitEditProfileForm,
  addDataProfile,
  UserInfo,
} from '../components/profile.js'
import { api } from '../components/api.js'
import { validationConfig } from '../components/constants.js'

//Открытие попапов

iconOpenPopupAvatar.addEventListener('click', function () {
  resetError(popUpChahgeAvatar, validationConfig)
  openPopUp(popUpChahgeAvatar)
}) //Открываем редактор аватарки

//Закрытие попапов по Х
btnClosePopupProfile.addEventListener('click', function () {
  closePopUp(popupChangeProfile)
}) //Закрываем редактор профиля
btnClosePopupCard.addEventListener('click', function () {
  closePopUp(popupAddCard)
}) //Закрываем добавление карточки
btnClosePopupDeleteCard.addEventListener('click', function () {
  closePopUp(popupConfirmDeleteCard)
}) //Закрываем подтверждение удаления карточки
btnClosePopupChangeAvatar.addEventListener('click', function () {
  closePopUp(popUpChahgeAvatar)
}) //Закрываем редактор аватарки

//____________________________________________________________________________________

//Рендер карточек и данных профиля
Promise.all([api.getDataProfile(), api.getDataCards()])
  .then(([dataProfile, cards]) => {
    const userInfo = new UserInfo({
      nameSelector: '.profile__name-first',
      aboutSelector: '.profile__specialization',
      avatarSelector: '.profile__photo',
    })
    userInfo.firstRenderUserInfo(
      dataProfile.name,
      dataProfile.about,
      dataProfile.avatar,
      dataProfile._id
    )
    const defaultCards = new Section(
      {
        items: cards.reverse(),
        renderer: (item) => {
          const card = new Card(
            {
              data: item,
              handleCardClick: () => {
                const popupImg = new PopupWithImage(item, '#popup-browse')
                popupImg.setEventListeners()
                popupImg.openPopUp()
              },
            },
            '#element-template'
          )
          const cardElement = card.createCards()
          defaultCards.addItem(cardElement)
        },
      },
      '.elements'
    )
    defaultCards.renderItems()
  })
  .catch((error) => {
    console.log(error.message)
  })

//____________________________________________________________________________________

//Валидация форм
enableValidation(validationConfig)

//Отправка формы добавления карточки
btnOpenAddCardPopup.addEventListener('click', () => {
  const form = new PopupWithForm('#popup-card', (formData) => {
    btnSaveAddCards.value = 'Создание...'
    api
      .saveNewCards(formData['name-input'], formData['url-input'])
      .then((data) => {
        const newCard = new Card(
          {
            data,
            handleCardClick: () => {
              const popupImg = new PopupWithImage(item, '#popup-browse')
              popupImg.setEventListeners()
              popupImg.openPopUp()
            },
          },
          '#element-template'
        )
        const cardElement = newCard.createCards()
        document
          .querySelector('.elements')
          .insertAdjacentElement('afterbegin', cardElement)
      })
      .catch((error) => {
        console.error('Error', error)
      })
      .finally(() => {
        btnSaveAddCards.value = 'Создать'
      })
  })
  form.setEventListeners()
  form.openPopUp()
}) //Открываем добавление карточки

btnOpenPopupProfileChange.addEventListener('click', () => {
  const userInstance = new UserInfo({
    nameSelector: '.profile__name-first',
    aboutSelector: '.profile__specialization',
    avatarSelector: '.profile__photo',
  })
  const form = new PopupWithForm('#popup-profile', (formData) => {
    userInstance.setUserInfo(
      formData['name-input'],
      formData['specialization-input']
    )
  })
  userInstance.getUserInfo().then((res) => {
    form.setInputValues(
      {
        nameSelector: '#name-input',
        aboutSelector: '#specialization-input',
      },
      res.name,
      res.about
    )
  })
  form.setEventListeners()
  form.openPopUp()
}) //Открываем редактор профиля

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
