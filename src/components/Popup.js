// export default class Popup {
//     constructor(selectorPopup) {
//         this._popup = selectorPopup;
//     }
//     openPopUp() {
//         this._popup.classList.add('popup_opened');
//     }
//     closePopUp() {
//         this._popup.classList.remove('popup_opened');
//     }
//     _handleEscClose(evt) {
//         if (evt.key === 'Escape') {
//             //const openedPopup = document.querySelector('.popup_opened');
//             this.closePopUp();
//         }
//     }
//     setEventListeners() {
//         //Закрытие popUp по клику на поле
//         this._popup.querySelector('.popup__overlay').addEventListener('mousedown', function () {
//             //const openedPopup = document.querySelector('.popup_opened');
//             this.closePopUp()
//         })

//         this._popup.querySelector('.popup__button-close').addEventListener('click', function () {
//             //const openedPopup = document.querySelector('.popup_opened');
//             this.closePopUp()
//         })
//     }
// }



