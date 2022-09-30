import './index.css';
import { popUp, buttonOpenAddCardPopup, buttonAdd, popupAddCard, buttonClose, allOverlay, formCard, formElements, mask, title, imgPopUp, popupBrowse, imgPopUpTitle, initialCards, elementsContainer } from '../components/data.js';
import { openPopUp, closePopUp } from '../components/modal.js';
import { createCard } from '../components/card.js';
import { editCard } from '../components/utils.js';
import { enableValidation } from '../components/validate.js';


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

//Функция просмотра фотографий карточек
export function openImagePopup(maskValue, titleValue) {
    imgPopUp.src = maskValue;
    imgPopUpTitle.textContent = titleValue;
    imgPopUp.alt = titleValue;
    openPopUp(popupBrowse);
};

//Рендер карточек
renderInitialCards();













enableValidation(); //Валидация форм
buttonAdd.addEventListener('click', function () { openPopUp(popupAddCard) }); //Открыть добавление карточки 
buttonOpenAddCardPopup.addEventListener('click', function () { openPopUp(popUp) });  //Открыть редактор профиля

//Закрытие popUp по Х
buttonClose.forEach((button) => {
    const closePopUpEv = button.closest('.popup', '.popup-el');
    button.addEventListener('click', function () {
        closePopUp(closePopUpEv);
    })
})

//Закрытие popUp по Esc
document.addEventListener('keydown', function (e) {
    const popUpOpen = document.querySelector('.popup_opened');
    if (e.key === 'Escape') {
        closePopUp(popUpOpen);
    }
})

//Закрытие popUp по клику на поле
allOverlay.forEach((overLay) => {
    overLay.addEventListener('mousedown', function () {
        const closePopUpEv = document.querySelector('.popup_opened');
        closePopUp(closePopUpEv);
    })
})

//Отправка формы карточки профиля
formElements.addEventListener('submit', editCard);

//Отправка формы карточки 
formCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addElement(mask.value, title.value);
    closePopUp(popupAddCard);
    mask.value = '';
    title.value = '';
}
);