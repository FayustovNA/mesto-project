//Импорт переменных и функций
import { elementsContainer, initialCards, popupBrowse, imgPopUp, imgPopUpTitle } from './data.js';
import { openPopUp } from './modal';


//Функция просмотра фотографии карточки
export function browesImg(maskValue, titleValue) {
    imgPopUp.src = maskValue;
    imgPopUpTitle.textContent = titleValue;
    openPopUp(popupBrowse);
}

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
        elementNew.remove()
    });
    elementNew.querySelector('.element__mask').addEventListener('click', function () { browesImg(maskValue, titleValue) });
    return elementNew;
};

//Функция добавить карточку
export function addElement(maskValue, titleValue) {
    const newCard = createCard(maskValue, titleValue);
    elementsContainer.prepend(newCard);
};

//Функция рендера карточек
export function addStartCards() {
    initialCards.forEach(card => {
        addElement(card.link, card.name)
    })
};



