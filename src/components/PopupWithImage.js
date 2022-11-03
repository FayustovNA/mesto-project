import Popup from './Popup.js';

export class PopupWithImage extends Popup {
    constructor({ data }, selectorPopup) {
        super(selectorPopup);
        this._titleCard = data.name;
        this._imageCard = data.link;
    }
    openPopUp() {
        this._popup.querySelector('.popup__img-title').textContent = this._titleCard
        this._popup.querySelector('.popup__img').src = this._imageCard
        this._popup.querySelector('.popup__img').alt = this._titleCard
        super.openPopUp()
    }
} 