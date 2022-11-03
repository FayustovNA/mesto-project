import Popup from './Popup.js'

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

  setInputValues = ({ nameSelector, aboutSelector }, name, about) => {
    this._popup.querySelector(nameSelector).value = name
    this._popup.querySelector(aboutSelector).value = about
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
