//Добавляем класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj['errorClass']);
};


//Удаляем класс с ошибкой
const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(obj['errorClass']);
    errorElement.textContent = '';
};


//Передача сигнала о валидности формы
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}


//Функция проверки валидности полей
const checkInputValidity = (formElement, inputElement, obj) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};


//Функция изменения состояния кнопки
const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(obj['inactiveButtonClass']);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(obj['inactiveButtonClass']);
    }
}


//Обработчик для всех полей формы
const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj['inputSelector']));
    const buttonElement = formElement.querySelector(obj['submitButtonSelector']);
    toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};


// Функция для удаления ошибок с форм при закрытии popup
export function resetError(formElement, obj) {
    const inputList = Array.from(
        formElement.querySelectorAll(obj['inputSelector'])
    )
    inputList.forEach((inputElement) =>
        hideInputError(formElement, inputElement, obj)
    )
    const buttonElement = formElement.querySelector(obj['submitButtonSelector'])
    toggleButtonState(inputList, buttonElement, obj)
}


// Функция добавления обработчика формам 
export function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj['formSelector']));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, obj);
    });
};




