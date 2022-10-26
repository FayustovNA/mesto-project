import {
    Popup
} from '../components/Popup.js';

import {
    imgPopUp,
    imgPopUpTitle,
} from '../components/data.js';



export default class PopupWithImage extends Popup {
    constructor(data, popup) {
        super(popup);
        this._titleCard = data.name;
        this._imageCard = data.link;
    }
    openPopUp() {
        imgPopUp.src = data.link;
        imgPopUpTitle.textContent = data.name;
        imgPopUp.alt = data.name;
        super.openPopUp();
    }
}
