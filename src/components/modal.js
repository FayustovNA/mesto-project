//Функция открытия popUp
export function openPopUp(button) {
    button.classList.add('popup_opened');
};

//Функция закрыть popUp
export function closePopUp(button) {
    button.classList.remove('popup_opened');
};

