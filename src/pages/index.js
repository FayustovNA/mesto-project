import './index.css';
import {
    iconOpenPopupAvatar,
    popUpChahgeAvatar,
    btnOpenAddCardPopup,
    popupAddCard,
    btnOpenPopupProfileChange,
    popupChangeProfile,
    popupConfirmDeleteCard,
    initialCards,
    popupBrowseImg,
    imgPopUp,
    imgPopUpTitle,
    btnClosePopupProfile,
    btnClosePopupCard,
    btnClosePopupBrowseImg,
    btnClosePopupDeleteCard,
    btnClosePopupChangeAvatar,
    nameForm,
    specializForm,
    nameInput,
    jobInput,
    formProfileEdit,
    allOverlay,
    formCard,
    formAvatarChange,
    mask,
    title,
    elementsContainer,
    urlLinkAvatar
} from '../components/data.js';
import { openPopUp, closePopUp } from '../components/modal.js';
import { createCard } from '../components/card.js';
import { enableValidation, resetError } from '../components/validate.js';
import { changeAvatar } from '../components/profile.js';

//____________________________________________________________________________________

//Функция просмотра фотографий карточек
export function openImagePopup(maskValue, titleValue) {
    imgPopUp.src = maskValue;
    imgPopUpTitle.textContent = titleValue;
    imgPopUp.alt = titleValue;
    openPopUp(popupBrowseImg);
};

//____________________________________________________________________________________

//Открытие попапов
btnOpenPopupProfileChange.addEventListener('click', function () { resetError(popupChangeProfile, validationConfig); openPopUp(popupChangeProfile) }); //Открываем редактор профиля
iconOpenPopupAvatar.addEventListener('click', function () { resetError(popUpChahgeAvatar, validationConfig); openPopUp(popUpChahgeAvatar) }); //Открываем редактор аватарки
btnOpenAddCardPopup.addEventListener('click', function () { resetError(popupAddCard, validationConfig); openPopUp(popupAddCard) }); //Открываем добавление карточки 

//Закрытие попапов по Х 
btnClosePopupProfile.addEventListener('click', function () { closePopUp(popupChangeProfile) }); //Закрываем редактор профиля
btnClosePopupCard.addEventListener('click', function () { closePopUp(popupAddCard) }); //Закрываем добавление карточки 
btnClosePopupBrowseImg.addEventListener('click', function () { closePopUp(popupBrowseImg) }); //Закрываем просмотр изображение
btnClosePopupDeleteCard.addEventListener('click', function () { closePopUp(popupConfirmDeleteCard) }); //Закрываем подтверждение удаления карточки
btnClosePopupChangeAvatar.addEventListener('click', function () { closePopUp(popUpChahgeAvatar) }); //Закрываем редактор аватарки

//____________________________________________________________________________________

//Функция добавить карточку
export function addElement(maskValue, titleValue) {
    const newCard = createCard(maskValue, titleValue);
    elementsContainer.prepend(newCard);
};

//Функция рендера карточек
export function renderInitialCards() {
    initialCards.forEach(card => {
        addElement(card.link, card.name)
    })
};

//Рендер карточек
renderInitialCards();

//____________________________________________________________________________________

//Валидация форм
const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'popup__button-save_inactive',
    //inputErrorClass: 'popup__item_type_error',
    errorClass: 'form__input-error_active'
}

enableValidation(validationConfig);

//____________________________________________________________________________________

//Функция редактирования профиля
export function submitEditProfileForm(evt) {
    evt.preventDefault();
    nameForm.textContent = nameInput.value;
    specializForm.textContent = jobInput.value;
    closePopUp(popupChangeProfile);
};

//____________________________________________________________________________________

//Закрытие popUp по клику на поле
allOverlay.forEach((overLay) => {
    overLay.addEventListener('mousedown', function () {
        const openedPopup = document.querySelector('.popup_opened');
        closePopUp(openedPopup);
    })
});

//____________________________________________________________________________________

//Отправка формы добавления карточки 
formCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addElement(mask.value, title.value);
    evt.target.reset();
    closePopUp(popupAddCard);
    //mask.value = '';
    //title.value = '';
}
);

//____________________________________________________________________________________

//Отправка формы изменения карточки профиля
formProfileEdit.addEventListener('submit', submitEditProfileForm);

//____________________________________________________________________________________
//Отправка формы изменения аватарки профиля

formAvatarChange.addEventListener('submit', (evt) => {
    evt.preventDefault();
    changeAvatar(urlLinkAvatar.value);
    evt.target.reset();
});