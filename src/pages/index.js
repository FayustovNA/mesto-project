import './index.css'
import {
    iconOpenPopupAvatar,
    popUpChahgeAvatar,
    btnOpenAddCardPopup,
    popupAddCard,
    btnOpenPopupProfileChange,
    popupChangeProfile,
    popupConfirmDeleteCard,
    popupBrowseImg,
    imgPopUp,
    imgPopUpTitle,
    btnClosePopupProfile,
    btnClosePopupCard,
    btnClosePopupBrowseImg,
    btnClosePopupDeleteCard,
    btnClosePopupChangeAvatar,
    formProfileEdit,
    allOverlays,
    formCard,
    formAvatarChange,
    mask,
    title,
    elementsContainer,
    urlLinkAvatar,
    nameInput,
    jobInput,
    nameForm,
    specializForm,
    btnConfirmDeleteCard,
    btnSaveAddCards,
} from '../components/data.js'
import { enableValidation, resetError } from '../components/validate.js'
import {
    changeAvatar,
    submitEditProfileForm,
    addDataProfile,
} from '../components/profile.js'
import { validationConfig } from '../components/constants.js'


import { api } from '../components/api.js';
import Section from '../components/Section.js';
import Card from '../components/Сard.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/api.js';

//____________________________________________________________________________________

//Рендер карточек и данных профиля

Promise.all([api.getDataProfile(), api.getDataCards()])
    .then(([dataProfile, cards]) => {
        const userInfo = new UserInfo({
            nameSelector: '.profile__name-first',
            aboutSelector: '.profile__specialization',
            avatarSelector: '.profile__photo',
            idSelector: '.profile',
        });
        userInfo.firstRenderUserInfo(
            dataProfile.name,
            dataProfile.about,
            dataProfile.avatar,
            dataProfile._id
        );
        const defaultCardList = new Section({
            items: cards.reverse(), renderer: (item) => {
                const card = new Card({
                    data: item, handleCardClick: () => {
                        const popUpImg = new PopupWithImage({ data: item }, popupBrowseImg);
                        popUpImg.openPopUp();
                        popUpImg.setEventListeners();
                    }
                }, '#element-template');
                const cardElement = card.createCards();
                defaultCardList.addItem(cardElement);
            }
        }, elementsContainer);
        defaultCardList.renderItems();
    })
    .catch((error) => {
        console.log(error.message)
    })
//____________________________________________________________________________________

//Валидация форм

enableValidation(validationConfig);

//____________________________________________________________________________________

// //Работа с попапом добавления карточки 

btnOpenAddCardPopup.addEventListener('click', () => {
    const form = new PopupWithForm({
        handleFormSubmit: (formData) => {
            btnSaveAddCards.value = 'Создание...'
            api
                .saveNewCards(formData['name-input'], formData['url-input'])
                .then((data) => {
                    const newCard = new Card(
                        {
                            data,
                            handleCardClick: () => {
                                const popupImg = new PopupWithImage(item, '#popup-browse')
                                popupImg.setEventListeners()
                                popupImg.openPopUp()
                            },
                        },
                        '#element-template'
                    )
                    const cardElement = newCard.createCards()
                    document
                        .querySelector('.elements')
                        .insertAdjacentElement('afterbegin', cardElement)
                })
                .catch((error) => {
                    console.error('Error', error)
                })
                .finally(() => {
                    btnSaveAddCards.value = 'Создать'
                })
        }
    }, popupAddCard);
    form.setEventListeners()
    form.openPopUp()
})

//Работа с попапом с попапом подтверждения удаления карточки
const popDeleteCard = new Popup(popupConfirmDeleteCard);
popDeleteCard.setEventListeners();


//btnConfirmDeleteCard.addEventListener('click', () => { card.popDeleteCard() }

// btnConfirmDeleteCard.addEventListener('click', () => {
//     console.log(idCardForDelete);
//     btnConfirmDeleteCard.value = 'Удаление...'
//     api
//         .deleteCard(cardIdForDelet)
//         .then((data) => {
//             cardIdForDelet.target.closest('.element').remove()
//             popDeleteCard.closePopUp();
//         })
//         .catch((error) => {
//             console.log(error)
//         })
//         .finally(() => {
//             btnConfirmDeleteCard.value = 'Да'
//         })
// })

//____________________________________________________________________________________

//Работа с попапом редактирования данных профиля
const popEditProf = new PopupWithForm({}, popupChangeProfile);
popEditProf.setEventListeners();
btnOpenPopupProfileChange.addEventListener('click', () => { popEditProf.openPopUp() })

//Работа с попапом изменения аватарки
const popSelectAvatar = new PopupWithForm({}, popUpChahgeAvatar);
popSelectAvatar.setEventListeners();
iconOpenPopupAvatar.addEventListener('click', () => { popSelectAvatar.openPopUp() })


//____________________________________________________________________________________

// //Открытие попапов
// btnOpenPopupProfileChange.addEventListener('click', function () {
//   nameInput.value = nameForm.textContent
//   jobInput.value = specializForm.textContent
//   resetError(popupChangeProfile, validationConfig)
//   openPopUp(popupChangeProfile)

// }) //Открываем редактор профиля
// iconOpenPopupAvatar.addEventListener('click', function () {
//   resetError(popUpChahgeAvatar, validationConfig)
//   openPopUp(popUpChahgeAvatar)

// // }) //Открываем редактор аватарки
// // btnOpenAddCardPopup.addEventListener('click', function () {
// //   resetError(popupAddCard, validationConfig)
// //   openPopUp(popupAddCard)

// // })

// //____________________________________________________________________________________

// //Функция добавить карточку
// export function addElement(maskValue, titleValue, likes, owner, cardId) {
//   const newCard = createCard(maskValue, titleValue, likes, owner, cardId)
//   elementsContainer.prepend(newCard)
// }


// //Функция рендера карточек
// export function renderInitialCards(cards) {
//   cards.forEach((card) => {
//     addElement(card.link, card.name, card.likes, card.owner, card._id)
//   })
// }

//____________________________________________________________________________________

//____________________________________________________________________________________

//Отправка формы изменения карточки профиля
formProfileEdit.addEventListener('submit', (evt) => {
    evt.preventDefault()
    submitEditProfileForm(nameInput.value, jobInput.value)
})

//____________________________________________________________________________________
//Отправка формы изменения аватарки профиля
formAvatarChange.addEventListener('submit', (evt) => {
    evt.preventDefault()
    changeAvatar(urlLinkAvatar.value)
})

//____________________________________________________________________________________
