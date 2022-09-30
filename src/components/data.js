//Переменные
export const buttonAdd = document.querySelector('.profile__button-add');
export const buttonOpenAddCardPopup = document.querySelector('.profile__button-edit');
export const buttonClose = document.querySelectorAll('.popup__button-close');
export const popUp = document.querySelector('.popup');
export const popupAddCard = document.querySelector('#element');
export const popupBrowse = document.querySelector('#browse');
export const buttonSaveElement = popupAddCard.querySelector('.popup__button-save');
export const buttonLike = document.querySelectorAll('.element__like');
export const formElements = popUp.querySelector('.form');
export const formCard = popupAddCard.querySelector('.form');
export const nameInput = formElements.querySelector('#name-input');
export const jobInput = formElements.querySelector('#specialization-input');
export const buttonSavePlace = popUp.querySelector('.popup__button-save');
export const elementsContainer = document.querySelector('.elements');
export const imgPopUp = popupBrowse.querySelector('.popup__img');
export const imgPopUpTitle = popupBrowse.querySelector('.popup__img-title');
export const nameForm = document.querySelector('.profile__name-first');
export const specializForm = document.querySelector('.profile__specialization');
export const mask = popupAddCard.querySelector('#url-input');
export const title = popupAddCard.querySelector('#name-input');
export const allOverlay = document.querySelectorAll('.popup__overlay');
export const form = document.querySelector('.form');
export const formInput = form.querySelector('.form__input');
export const formError = form.querySelector(`.${formInput.id}-error`);

//Массив для карточек
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