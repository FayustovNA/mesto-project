//Кнопки закрытия попапов
export const btnClosePopupProfile = document.querySelector('#btnClosePopupProfile');
export const btnClosePopupCard = document.querySelector('#btnClosePopupCard');
export const btnClosePopupBrowseImg = document.querySelector('#btnClosePopupBrowseImg');
export const btnClosePopupDeleteCard = document.querySelector('#btnClosePopupDeleteCard');
export const btnClosePopupChangeAvatar = document.querySelector('#btnClosePopupChangeAvatar');

//Кнопки и иконки открытия попапов
export const btnOpenPopupProfileChange = document.querySelector('.profile__button-edit');
export const btnOpenAddCardPopup = document.querySelector('.profile__button-add');
export const iconOpenPopupAvatar = document.querySelector('.profile__avatar');

//Кнопки сохранения и подтверждения

//Кнопки лайка
export const btnLikeCard = document.querySelectorAll('.element__like');

//Попапы + все оверлеи
export const popupChangeProfile = document.querySelector('#popup-profile');
export const popupAddCard = document.querySelector('#popup-card');
export const popUpChahgeAvatar = document.querySelector('#popup-changeAvatar');
export const popupBrowseImg = document.querySelector('#popup-browse');
export const popupConfirmDeleteCard = document.querySelector('#popup-deleteCards');
export const allOverlay = document.querySelectorAll('.popup__overlay');

//Просматриваемая картинка карточки и ее название при открытии попапа просмотра 
export const imgPopUp = popupBrowseImg.querySelector('.popup__img');
export const imgPopUpTitle = popupBrowseImg.querySelector('.popup__img-title');

//Переменные для редактирования профиля
export const nameForm = document.querySelector('.profile__name-first');
export const specializForm = document.querySelector('.profile__specialization');
export const formProfileEdit = popupChangeProfile.querySelector('.form');
export const nameInput = formProfileEdit.querySelector('#name-input');
export const jobInput = formProfileEdit.querySelector('#specialization-input');


//Массив карточек
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];








//Переменные
export const buttonSaveElement = popupAddCard.querySelector('.popup__button-save');
export const formCard = popupAddCard.querySelector('.form');

//export const buttonSavePlace = popUp.querySelector('.popup__button-save');
export const elementsContainer = document.querySelector('.elements');
export const mask = popupAddCard.querySelector('#url-input');
export const title = popupAddCard.querySelector('#name-input');

export const form = document.querySelector('.form');
export const formInput = form.querySelector('.form__input');
export const formError = form.querySelector(`.${formInput.id}-error`);

