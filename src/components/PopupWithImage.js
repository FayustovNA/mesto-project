import Popup from './Popup.js';

import {
    imgPopUp,
    imgPopUpTitle,
} from '../components/data.js';



export default class PopupWithImage extends Popup {
    constructor({ data }, selectorPopup) {
        super(selectorPopup);
        this._titleCard = data.name;
        this._imageCard = data.link;
    }
    openPopUp() {
        imgPopUp.src = this._imageCard;
        imgPopUpTitle.textContent = this._titleCard;
        imgPopUp.alt = this._titleCard;
        super.openPopUp();
    }
} 