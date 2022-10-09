import './index.css';
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
    allOverlay,
    formCard,
    formAvatarChange,
    mask,
    title,
    elementsContainer,
    urlLinkAvatar, nameInput,
    jobInput,
    nameForm,
    specializForm, btnSaveAddCards
} from '../components/data.js';
import { openPopUp, closePopUp } from '../components/modal.js';
import { createCard } from '../components/card.js';
import { enableValidation, resetError } from '../components/validate.js';
import { changeAvatar, addDataProfile, submitEditProfileForm } from '../components/profile.js';
import { getDataCards, getDataProfile, saveNewCards } from '../components/api.js';

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
btnOpenPopupProfileChange.addEventListener('click', function () {
    nameInput.value = nameForm.textContent
    jobInput.value = specializForm.textContent
    resetError(popupChangeProfile, validationConfig); openPopUp(popupChangeProfile)
}); //Открываем редактор профиля
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
export function addElement(maskValue, titleValue, likes, owner, cardId) {
    const newCard = createCard(maskValue, titleValue, likes, owner, cardId);
    elementsContainer.prepend(newCard);
};

//Функция рендера карточек
export function renderInitialCards(cards) {
    cards.forEach(card => {
        addElement(card.link, card.name, card.likes, card.owner, card._id)
    })
};

//Рендер карточек и данных профиля
Promise.all([getDataCards(), getDataProfile()])
    .then(([cards, dataProfile]) => {
        renderInitialCards(cards.reverse(), renderInitialCards)
        addDataProfile(
            dataProfile.name,
            dataProfile.about,
            dataProfile.avatar,
        )
    })
    .catch((error) => {
        console.log(error.message)
    })

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
    saveNewCards(title.value, mask.value)
        .then((data) => {
            addElement(data.link, data.name, data.likes, data.owner, data._id);
            closePopUp(popupAddCard);
            evt.target.reset();
        })
        .catch((error) => {
            console.error('Error', error)
        })
})

//____________________________________________________________________________________

//Отправка формы изменения карточки профиля
formProfileEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitEditProfileForm(nameInput.value, jobInput.value)
});

//____________________________________________________________________________________

//Отправка формы изменения аватарки профиля
formAvatarChange.addEventListener('submit', (evt) => {
    evt.preventDefault();
    changeAvatar(urlLinkAvatar.value);
    evt.target.reset();
});
