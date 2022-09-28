import './index.css';
import { popUp, buttonEdit, buttonAdd, popUpEl, buttonClose, allOverlay, formCard, formElements, mask, title } from './components/data.js';
import { openPopUp, closePopUp } from './components/modal.js';
import { addStartCards, addElement } from './components/card.js';
import { editCard } from './components/utils.js';
import { enableValidation } from './components/validate.js';


addStartCards(); //Рендер карточек
enableValidation(); //Валидация форм
buttonAdd.addEventListener('click', function () { openPopUp(popUpEl) }); //Открыть добавление карточки 
buttonEdit.addEventListener('click', function () { openPopUp(popUp) });  //Открыть редактор профиля

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
    closePopUp(popUpEl);
    mask.value = '';
    title.value = '';
}
);