export default class Popup {
  constructor(selectorPopup) {
    this._popup = selectorPopup
  }

  openPopUp() {
    //Закрытие popUp по нажатию Esc
    window.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    })
    this._popup.classList.add('popup_opened')
  }

  closePopUp() {
    window.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    })
    this._popup.classList.remove('popup_opened')
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopUp()
    }
  }

  setEventListeners() {
    //Закрытие popUp по клику на поле
    this._popup
      .querySelector('.popup__overlay')
      .addEventListener('mousedown', () => {
        this.closePopUp()
      })
    //Закрытие popUp по клику на X
    this._popup
      .querySelector('.popup__button-close')
      .addEventListener('click', () => {
        this.closePopUp()
      })
  }
}
