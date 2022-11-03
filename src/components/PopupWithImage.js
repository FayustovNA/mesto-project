import Popup from './Popup.js'

export class PopupWithImage extends Popup {
  constructor({ name, link }, selectorPopup) {
    super(selectorPopup)
    this._titleCard = name
    this._imageCard = link
  }

  openPopUp = () => {
    this._popup.querySelector('.popup__img-title').textContent = this._titleCard
    this._popup.querySelector('.popup__img').src = this._imageCard
    this._popup.querySelector('.popup__img').alt = this._titleCard
    super.openPopUp()
  }
}
