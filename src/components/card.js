//Импорт переменных и функций
import { openImagePopup } from '../pages/index';
import { popupConfirmDeleteCard } from './data.js';
import { closePopUp, openPopUp } from './modal.js';

//Функция создать карточку
export function createCard(maskValue, titleValue) {
    const elementTemplate = document.querySelector('#element-template').content;
    const elementNew = elementTemplate.querySelector('.element').cloneNode(true);
    const maskImg = elementNew.querySelector('.element__mask');
    maskImg.src = maskValue;
    maskImg.setAttribute('alt', titleValue);
    elementNew.querySelector('.element__title').textContent = titleValue;
    elementNew.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-active');
    });
    elementNew.querySelector('.element__delete').addEventListener('click', function () {
        openPopUp(popupConfirmDeleteCard);
        popupConfirmDeleteCard.querySelector('#btnConfirmDeleteCard').addEventListener('click', function () {
            elementNew.remove();
            closePopUp(popupConfirmDeleteCard);
        });
    });
    elementNew.querySelector('.element__mask').addEventListener('click', function () { openImagePopup(maskValue, titleValue) });
    return elementNew;
};

