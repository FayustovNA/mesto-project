import './index.css'
import {
    iconOpenPopupAvatar,
    btnOpenAddCardPopup,
    popupAddCard,
    btnOpenPopupProfileChange,
    popupConfirmDeleteCard,
    popupBrowseImg,
    formAvatarChange,
    elementsContainer,
    btnSaveAddCards,
    btnSaveChangeProfile,
    btnSaveAvatar,
    idProfile, validationConfig,
    popupChangeProfile, popUpChahgeAvatar
} from '../components/data.js'

import { api } from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Сard.js';
import Popup from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

//____________________________________________________________________________________

//Рендер карточек и данных профиля

Promise.all([api.getDataProfile(), api.getDataCards()])
    .then(([dataProfile, cards]) => {
        userInstance.firstRenderUserInfo(
            dataProfile.name,
            dataProfile.about,
            dataProfile.avatar,
            dataProfile._id
        )
        idProfile.id = dataProfile._id
        const defaultCardList = new Section({
            items: cards.reverse(), renderer: (item) => {
                const card = new Card({
                    data: item, handleCardClick: () => {
                        const popUpImg = new PopupWithImage({ data: item }, popupBrowseImg)
                        popUpImg.setEventListeners();
                        popUpImg.openPopUp();
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

//Работа с попапом добавления карточки 

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

//Валидация формы добавления карточки

const addCardValidator = new FormValidator(
    validationConfig,
    document.querySelector('#popup-card')
)

addCardValidator.enableValidation()

//____________________________________________________________________________________

//Работа с попапом с попапом подтверждения удаления карточки

const popDeleteCard = new Popup(popupConfirmDeleteCard);
popDeleteCard.setEventListeners();

//____________________________________________________________________________________

//Работа с попапом редактирования данных профиля
const userInstance = new UserInfo({
    nameSelector: '.profile__name-first',
    aboutSelector: '.profile__specialization',
    avatarSelector: '.profile__photo',
})

const userEditForm = new PopupWithForm({
    handleFormSubmit: (formData) => {
        btnSaveChangeProfile.value = 'Сохранение...'
        api
            .saveDataProfile(formData['name-input'], formData['specialization-input'])
            .then((res) => {
                userInstance.setUserInfo(res.name, res.about)
            })
            .catch((error) => {
                console.log(error.message)
            })
            .finally(() => {
                userEditForm.closePopUp()
                btnSaveChangeProfile.value = 'Сохранить'
            })
    }
}, popupChangeProfile);

userEditForm.setEventListeners();

//Валидация формы редактирования профиля

const editProfilValidator = new FormValidator(
    validationConfig,
    document.querySelector('#popup-profile')
)
editProfilValidator.enableValidation()

btnOpenPopupProfileChange.addEventListener('click', () => {
    const { name, about } = userInstance.getUserInfo()
    userEditForm.setInputValues(
        {
            nameSelector: '#name-input',
            aboutSelector: '#specialization-input',
        },
        name,
        about
    )
    userEditForm.openPopUp()
})

//____________________________________________________________________________________

//Работа с попапом изменения аватарки

const userEditAvatarForm = new PopupWithForm(
    {
        handleFormSubmit: (formData) => {
            btnSaveAvatar.value = 'Сохранение...'
            api
                .saveAvatarProfile(formData['url-input'])
                .then((res) => {
                    userInstance.setUserAvatar(res.avatar)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    userEditAvatarForm.closePopUp
                    formAvatarChange.reset()
                    btnSaveAvatar.value = 'Сохранить'
                })
        }
    }, popUpChahgeAvatar)

userEditAvatarForm.setEventListeners()

const changeAvatarValidation = new FormValidator(
    validationConfig,
    document.querySelector('#popup-changeAvatar')
)
changeAvatarValidation.enableValidation()

iconOpenPopupAvatar.addEventListener('click', function () {
    userEditAvatarForm.openPopUp()
})
