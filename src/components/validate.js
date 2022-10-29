class FormValidator {
  constructor(obj, formElement) {
    this.obj = obj
    this.formElement = formElement
  }

  // Функция для добавления класса с ошибкой
  _hideInputError(formElement, inputElement, obj) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(obj['inputErrorClass'])
    errorElement.classList.remove(obj['errorClass'])
    errorElement.textContent = ''
  }

  // Функция для добавления класса с ошибкой
  _showInputError(formElement, inputElement, errorMessage, obj) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(obj['inputErrorClass'])
    errorElement.textContent = errorMessage
    errorElement.classList.add(obj['errorClass'])
  }

  // Функция для проверки валидности поля
  _isValid(formElement, inputElement, obj) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
      inputElement.setCustomValidity('')
    }

    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        obj
      )
    } else {
      this._hideInputError(formElement, inputElement, obj)
    }
  }

  // Функция для передачи сигнала кнопке о валидности формы
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  // Функция изменения состояния кнопки в зависимости от валидности формы
  _toggleButtonState(inputList, buttonElement, obj) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true
      buttonElement.classList.add(obj['inactiveButtonClass'])
    } else {
      buttonElement.disabled = false
      buttonElement.classList.remove(obj['inactiveButtonClass'])
    }
  }

  // Функция добавления обработчика всем полям формы
  _setEventListener = (formElement, obj) => {
    const inputList = Array.from(
      formElement.querySelectorAll(obj['inputSelector'])
    )
    const buttonElement = formElement.querySelector(obj['submitButtonSelector'])
    this._toggleButtonState(inputList, buttonElement, obj)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement, obj)
        this._toggleButtonState(inputList, buttonElement, obj)
      })
    })
  }

  // Функция для удаления ошибок с форм при закрытии popup
  resetError() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.obj['inputSelector'])
    )
    inputList.forEach((inputElement) =>
      this._hideInputError(this.formElement, inputElement, this.obj)
    )
    const buttonElement = this.formElement.querySelector(
      this.obj['submitButtonSelector']
    )
    this._toggleButtonState(inputList, buttonElement, this.obj)
  }

  // Функция для добавления обработчиков всем формам
  enableValidation = () => {
    const formList = Array.from(
      document.querySelectorAll(this.obj['formSelector'])
    )
    formList.forEach((formElement) => {
      this._setEventListener(formElement, this.obj)
    })
  }
}

//Добавляем класс с ошибкой
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = errorMessage
  errorElement.classList.add(validationConfig['errorClass'])
}

//Удаляем класс с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.classList.remove(validationConfig['errorClass'])
  errorElement.textContent = ''
}

//Передача сигнала о валидности формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

//Функция проверки валидности полей
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    )
  } else {
    hideInputError(formElement, inputElement, validationConfig)
  }
}

//Функция изменения состояния кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(validationConfig['inactiveButtonClass'])
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(validationConfig['inactiveButtonClass'])
  }
}

//Обработчик для всех полей формы
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig['inputSelector'])
  )
  const buttonElement = formElement.querySelector(
    validationConfig['submitButtonSelector']
  )
  toggleButtonState(inputList, buttonElement, validationConfig)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig)
      toggleButtonState(inputList, buttonElement, validationConfig)
    })
  })
}

// Функция для удаления ошибок с форм при закрытии popup
export function resetError(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig['inputSelector'])
  )
  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, validationConfig)
  )
  const buttonElement = formElement.querySelector(
    validationConfig['submitButtonSelector']
  )
  toggleButtonState(inputList, buttonElement, validationConfig)
}

// Функция добавления обработчика формам
export function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig['formSelector'])
  )
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault()
    })
    setEventListeners(formElement, validationConfig)
  })
}
