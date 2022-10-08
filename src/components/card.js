//Импорт переменных и функций
import { openImagePopup } from '../pages/index';
import { popupConfirmDeleteCard } from './data.js';
import { closePopUp, openPopUp } from './modal.js';
import { deleteCard, deleteOneCardLike, addOneCardLike } from './api.js'


//Функция создать карточку
export function createCard(maskValue, titleValue, likes, owner, cardId) {
    const elementTemplate = document.querySelector('#element-template').content;
    const elementNew = elementTemplate.querySelector('.element').cloneNode(true);
    const maskImg = elementNew.querySelector('.element__mask');
    elementNew.id = cardId;
    const counterLikes = elementNew.querySelector('.element__counterlike');
    maskImg.src = maskValue;
    counterLikes.textContent = likes.length;
    maskImg.setAttribute('alt', titleValue);
    elementNew.querySelector('.element__title').textContent = titleValue;

    elementNew.querySelector('.element__like').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('element__like-active')) {
            deleteOneCardLike(elementNew.id)
                .then((data) => {
                    counterLikes.textContent = data.likes.length
                    evt.target.classList.toggle('element__like-active')
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            addOneCardLike(elementNew.id)
                .then((data) => {
                    counterLikes.textContent = data.likes.length
                    evt.target.classList.toggle('element__like-active')
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        // elementNew.querySelector('.element__like').addEventListener('click', function (evt) {
        //     evt.target.classList.toggle('element__like-active');
    });

    elementNew.querySelector('.element__delete').addEventListener('click', function () {
        openPopUp(popupConfirmDeleteCard);
        popupConfirmDeleteCard.querySelector('#btnConfirmDeleteCard').addEventListener('click', function () {
            deleteCard(elementNew.id).then(() => {
                elementNew.remove();
                closePopUp(popupConfirmDeleteCard);
            }).catch((error) => {
                console.log(error)
            })

        });
    });
    elementNew.querySelector('.element__mask').addEventListener('click', function () { openImagePopup(maskValue, titleValue) });
    return elementNew;
};