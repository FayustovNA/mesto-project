//Добавляем класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig['errorClass']);
};


//Удаляем класс с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(validationConfig['errorClass']);
    errorElement.textContent = '';
};


//Передача сигнала о валидности формы
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}


//Функция проверки валидности полей
const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};


//Функция изменения состояния кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig['inactiveButtonClass']);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig['inactiveButtonClass']);
    }
}


//Обработчик для всех полей формы
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig['inputSelector']));
    const buttonElement = formElement.querySelector(validationConfig['submitButtonSelector']);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};


// Функция для удаления ошибок с форм при закрытии popup
export function resetError(formElement, validationConfig) {
    const inputList = Array.from(
        formElement.querySelectorAll(validationConfig['inputSelector'])
    )
    inputList.forEach((inputElement) =>
        hideInputError(formElement, inputElement, validationConfig)
    )
    const buttonElement = formElement.querySelector(validationConfig['submitButtonSelector'])
    toggleButtonState(inputList, buttonElement, validationConfig)
}


// Функция добавления обработчика формам 
export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig['formSelector']));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig);
    });
};

