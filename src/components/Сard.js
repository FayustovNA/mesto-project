//Импорт переменных и функций
import { popupConfirmDeleteCard, popupBrowseImg, nameForm } from './data.js';
import Popup from './Popup.js';
import { api } from './api.js';
export let cardIDdelete = '';

export default class Card {
    constructor(data, selector) {
        this._titleCard = data.name;
        this._imageCard = data.link;
        this._idCard = data._id;
        this.likes = data.likes;
        this.owner = data.owner;
        this._selector = selector;
        //this._handleCardClick = handleCardClick;
    }

    _getElementCard() {
        const elementTemplateCard = document.querySelector(this._selector).content;
        const elementNewCard = elementTemplateCard.querySelector('.element').cloneNode(true);
        return elementNewCard;
    }

    createCards() {
        this._element = this._getElementCard();

        this._element.querySelector('.element__title').textContent = this._titleCard;
        this._element.querySelector('.element__mask').src = this._imageCard;
        this._element.querySelector('.element__mask').setAttribute('alt', this._titleCard);
        this._element.id = this._idCard;

        const cardLike = this._element.querySelector('.element__like');
        const counterLikes = this._element.querySelector('.element__counterlike');
        counterLikes.textContent = this.likes.length;

        if (this.owner._id !== nameForm.id) {
            this._element.querySelector('.element__delete').classList.add('element__delete_inactive')
        }

        this.likes.forEach((like) => {
            if (like._id == nameForm.id) {
                cardLike.classList.add('element__like-active')
            }
        })

        cardLike.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('element__like-active')) {
                api
                    .deleteOneCardLike(this._element.id)
                    .then((data) => {
                        counterLikes.textContent = data.likes.length
                        evt.target.classList.toggle('element__like-active')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                api
                    .addOneCardLike(this._element.id)
                    .then((data) => {
                        counterLikes.textContent = data.likes.length
                        evt.target.classList.toggle('element__like-active')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })

        // this._element = this._setEventListeners();
        return this._element;
    }

    // _setEventListeners() {
    //     this._imageCard.addEventListener('click', () => {
    //         this._handleCardClick(popupBrowseImg);
    //     });
    // }
}
