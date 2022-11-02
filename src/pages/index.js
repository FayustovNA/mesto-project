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
  btnSaveChangeProfile,
  btnClosePopupBrowseImg,
  btnClosePopupDeleteCard,
  btnClosePopupChangeAvatar,
  btnSaveAvatar,
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
import Popup, { PopupWithImage, PopupWithForm } from '../components/popup.js'
import { FormValidator } from '../components/validate.js'
import { UserInfo } from '../components/profile.js'
import { api } from '../components/api.js'
import { validationConfig } from '../components/constants.js'

const userInstance = new UserInfo({
  nameSelector: '.profile__name-first',
  aboutSelector: '.profile__specialization',
  avatarSelector: '.profile__photo',
})

btnClosePopupDeleteCard.addEventListener('click', function () {
  closePopUp(popupConfirmDeleteCard)
}) //Закрываем подтверждение удаления карточки

//____________________________________________________________________________________

//Рендер карточек и данных профиля
Promise.all([api.getDataProfile(), api.getDataCards()])
  .then(([dataProfile, cards]) => {
    userInstance.firstRenderUserInfo(
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

//

const userEditForm = new PopupWithForm('#popup-profile', (formData) => {
  btnSaveChangeProfile.value = 'Сохранение...'
  api
    .saveDataProfile(formData['name-input'], formData['specialization-input'])
    .then((res) => {
      userInstance.setUserInfo(res.name, res.about)
    })
    .catch((error) => {
      console.log(error.message)
    })
    .finally(() => {
      userEditForm.closePopUp()
      btnSaveChangeProfile.value = 'Сохранить'
    })
})
userEditForm.setEventListeners()

const editProfilValidator = new FormValidator(
  validationConfig,
  document.querySelector('#popup-profile')
)
editProfilValidator.enableValidation()

const userEditAvatarForm = new PopupWithForm(
  '#popup-changeAvatar',
  (formData) => {
    btnSaveAvatar.value = 'Сохранение...'
    api
      .saveAvatarProfile(formData['url-input'])
      .then((res) => {
        userInstance.setUserAvatar(res.avatar)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        userEditAvatarForm.closePopUp
        formAvatarChange.reset()
        btnSaveAvatar.value = 'Сохранить'
      })
  }
)
userEditAvatarForm.setEventListeners()
//Валидация форм
const changeAvatarValidation = new FormValidator(
  validationConfig,
  document.querySelector('#popup-changeAvatar')
)
changeAvatarValidation.enableValidation()

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
              const popupImg = new PopupWithImage(data, '#popup-browse')
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

const addCardValidator = new FormValidator(
  validationConfig,
  document.querySelector('#popup-card')
)

addCardValidator.enableValidation()

btnOpenPopupProfileChange.addEventListener('click', () => {
  const { name, about } = userInstance.getUserInfo()
  userEditForm.setInputValues(
    {
      nameSelector: '#name-input',
      aboutSelector: '#specialization-input',
    },
    name,
    about
  )
  userEditForm.openPopUp()
})

iconOpenPopupAvatar.addEventListener('click', function () {
  userEditAvatarForm.openPopUp()
}) //Открываем редактор аватарки

//____________________________________________________________________________________
//Подтверждение удаление карточки
const popDeleteCard = new Popup('#popup-deleteCards')
popDeleteCard.setEventListeners()
