//Кнопки закрытия попапов
export const btnClosePopupProfile = document.querySelector(
  '#btnClosePopupProfile'
)
export const btnClosePopupCard = document.querySelector('#btnClosePopupCard')
export const btnClosePopupBrowseImg = document.querySelector(
  '#btnClosePopupBrowseImg'
)
export const btnClosePopupDeleteCard = document.querySelector(
  '#btnClosePopupDeleteCard'
)
export const btnClosePopupChangeAvatar = document.querySelector(
  '#btnClosePopupChangeAvatar'
)

//Кнопки и иконки открытия попапов
export const btnOpenPopupProfileChange = document.querySelector(
  '.profile__button-edit'
)
export const btnOpenAddCardPopup = document.querySelector(
  '.profile__button-add'
)
export const iconOpenPopupAvatar = document.querySelector('.profile__avatar')

//Кнопка сохранения / изменения профиля и сохранения / добавления / подтверждения работы с карточками
export const btnSaveChangeProfile = document.querySelector(
  '#btnSaveChangeProfile'
)
export const btnSaveAddCards = document.querySelector('#btnSaveAddCard')
export const btnConfirmDeleteCard = document.querySelector(
  '#btnConfirmDeleteCard'
)
export const btnSaveAvatar = document.querySelector('#btnConfirmChangeAvatar')

//Попапы + все оверлеи
export const popupChangeProfile = document.querySelector('#popup-profile')
export const popupAddCard = document.querySelector('#popup-card')
export const popUpChahgeAvatar = document.querySelector('#popup-changeAvatar')
export const popupBrowseImg = document.querySelector('#popup-browse')
export const popupConfirmDeleteCard =
  document.querySelector('#popup-deleteCards')
export const allOverlays = document.querySelectorAll('.popup__overlay')

//Просматриваемая картинка карточки и ее название при открытии попапа просмотра
export const imgPopUp = popupBrowseImg.querySelector('.popup__img')
export const imgPopUpTitle = popupBrowseImg.querySelector('.popup__img-title')

//Переменные для редактирования профиля
export const nameForm = document.querySelector('.profile__name-first')
export const specializForm = document.querySelector('.profile__specialization')
export const formProfileEdit = popupChangeProfile.querySelector('.form')
export const nameInput = formProfileEdit.querySelector('#name-input')
export const jobInput = formProfileEdit.querySelector('#specialization-input')
export const idProfile = document.querySelector('.profile');

//Переменные для редактирования карточки
export const formCard = popupAddCard.querySelector('.form')
export const elementsContainer = document.querySelector('.elements')
export const mask = popupAddCard.querySelector('#url-input')
export const title = popupAddCard.querySelector('#name-input')

//Переменные для смены аватарки
export const photoAvatar = document.querySelector('.profile__photo')
export const formAvatarChange = popUpChahgeAvatar.querySelector('.form')
export const urlLinkAvatar = popUpChahgeAvatar.querySelector('#url-input')

// Константы для валидации форм
export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'popup__button-save_inactive',
  //inputErrorClass: 'popup__item_type_error',
  errorClass: 'form__input-error_active'
}
