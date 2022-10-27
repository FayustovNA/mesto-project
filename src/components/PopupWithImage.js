import Popup from './Popup.js';

import {
    imgPopUp,
    imgPopUpTitle,
} from '../components/data.js';



export default class PopupWithImage extends Popup {
    constructor(name, link, selectorPopup) {
        super(selectorPopup);
        this._titleCard = name;
        this._imageCard = link;
    }
    openPopUp() {
        imgPopUp.src = this._imageCard;
        imgPopUpTitle.textContent = this._titleCard;
        imgPopUp.alt = this._titleCard;
        super.openPopUp();
    }
} 