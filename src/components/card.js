//Импорт переменных и функций
import { openImagePopup } from '../pages/index.js';
import { popupConfirmDeleteCard, nameForm } from './data.js';
import { openPopUp } from './modal.js';
import { deleteOneCardLike, addOneCardLike } from './api.js';
export let cardIDdelete = '';

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

    if (owner._id !== nameForm.id) { elementNew.querySelector('.element__delete').classList.add('element__delete_inactive') };

    elementNew.querySelector('.element__delete').addEventListener('click', function (evt) {
        openPopUp(popupConfirmDeleteCard);
        cardIDdelete = evt;
        // popupConfirmDeleteCard.querySelector('#btnConfirmDeleteCard').addEventListener('click', function () {
        //     deleteCard(elementNew.id).then(() => {
        //         elementNew.remove();
        //         closePopUp(popupConfirmDeleteCard);
        //     }).catch((error) => {
        //         console.log(error)
        //     })

        // });
    });
    elementNew.querySelector('.element__mask').addEventListener('click', function () { openImagePopup(maskValue, titleValue) });
    return elementNew;
};

