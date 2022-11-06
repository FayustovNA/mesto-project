import Popup from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup)
    this._titleCard = this._popup.querySelector('.popup__img-title')
    this._imageCard = this._popup.querySelector('.popup__img')
  }
  openPopUp(title, image) {
    this._titleCard.textContent = title
    this._imageCard.src = image
    this._imageCard.alt = title
    super.openPopUp()
  }
}
