export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup)
  }

  openPopUp() {
    this._popup.classList.add('popup_opened')
  }

  closePopUp() {
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
    //Закрытие popUp по нажатию Esc
    window.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    })
  }
}

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

export class PopupWithForm extends Popup {
  constructor(selectorPopup, handFormSubmit) {
    super(selectorPopup)
    this._handleFormSubmit = handFormSubmit
  }

  _getInputValues = () => {
    this._inputList = this._popup.querySelectorAll('.form__input')
    this._formValues = {}
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })

    return this._formValues
  }

  closePopUp = () => {
    super.closePopUp()
    this._popup.querySelector('.form').reset()
  }

  setEventListeners = () => {
    super.setEventListeners()
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault()

      this._handleFormSubmit(this._getInputValues())

      this._popup.querySelector('.form').reset()

      this.closePopUp()
    })
  }
}
