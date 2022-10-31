
import {
    nameForm,
    specializForm,
    photoAvatar,
    popUpChahgeAvatar,
    popupChangeProfile,
    btnSaveChangeProfile,
    formAvatarChange,
    btnSaveAvatar,
} from './data.js'
import { api } from './api.js'
import { defaults } from 'autoprefixer'

export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector, idSelector }) {
        this._nameElement = document.querySelector(nameSelector)
        this._aboutElement = document.querySelector(aboutSelector)
        this._avatarElement = document.querySelector(avatarSelector)
        this._formId = document.querySelector(idSelector);
    }

    getUserInfo() {
        return api
            .getDataProfile()
            .then((data) => {
                return data
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    firstRenderUserInfo = (nameData, specializData, avatar, formId) => {
        this._nameElement.textContent = nameData
        this._aboutElement.textContent = specializData
        this._avatarElement.src = avatar
        this._formId.id = formId
    }

    setUserInfo = (nameData, specializData) => {
        this._nameElement.textContent = nameData
        this._aboutElement.textContent = specializData
        btnSaveChangeProfile.value = 'Сохранение...'
        api
            .saveDataProfile(nameData, specializData)
            .then((res) => {
                addDataProfile(res.name, res.about, res.avatar, res._id)
            })
            .then(() => {
                closePopUp(popupChangeProfile)
            })
            .catch((error) => {
                console.log(error.message)
            })
            .finally(() => {
                btnSaveChangeProfile.value = 'Сохранить'
            })
    }

    setUserAvatar = (newAvatar) => {
        this._avatarElement.src = newAvatar
        btnSaveAvatar.value = 'Сохранение...'
        api
            .saveAvatarProfile(urlLinkAvatar)
            .then(() => {
                photoAvatar.src = urlLinkAvatar
                closePopUp(popUpChahgeAvatar)
                formAvatarChange.reset()
            })
            .finally(() => {
                btnSaveAvatar.value = 'Сохранить'
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

// // Добавление данных в профиль из сервера
// export function addDataProfile(nameData, specializData, urlAvatarData, idData) {
//     nameForm.textContent = nameData
//     specializForm.textContent = specializData
//     photoAvatar.src = urlAvatarData
//     nameForm.id = idData
// }
// // Функция изменения аватарки + отправка на сервер
// export function changeAvatar(urlLinkAvatar) {
//     btnSaveAvatar.value = 'Сохранение...'
//     api
//         .saveAvatarProfile(urlLinkAvatar)
//         .then(() => {
//             photoAvatar.src = urlLinkAvatar
//             closePopUp(popUpChahgeAvatar)
//             formAvatarChange.reset()
//         })
//         .finally(() => {
//             btnSaveAvatar.value = 'Сохранить'
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// }