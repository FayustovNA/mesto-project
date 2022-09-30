//Импорт переменных и функций
import { openImagePopup } from '../pages/index';

//Функция создать карточку
export function createCard(maskValue, titleValue, openImagePopup) {
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
        elementNew.remove()
    });
    elementNew.querySelector('.element__mask').addEventListener('click', openImagePopup);
    return elementNew;
};




