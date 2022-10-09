//Функция открытия popUp
export function openPopUp(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

//Функция закрыть popUp
export function closePopUp(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

//Функция закрытие popUp по Esc
export function closePopupEsc(e) {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopUp(openedPopup);
    }
};