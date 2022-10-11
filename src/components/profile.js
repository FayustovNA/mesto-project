import { nameForm, specializForm, photoAvatar, popUpChahgeAvatar, popupChangeProfile, btnSaveChangeProfile, formAvatarChange } from './data.js';
import { getDataProfile, saveAvatarProfile, saveDataProfile } from './api.js';
import { closePopUp } from './modal';


// Добавление данных в профиль из сервера
export function addDataProfile(nameData, specializData, urlAvatarData, idData) {
    nameForm.textContent = nameData;
    specializForm.textContent = specializData;
    photoAvatar.src = urlAvatarData;
    nameForm.id = idData;
};

// Функция изменения профиля + отправка на сервер 
export function submitEditProfileForm(nameData, specializData) {
    saveDataProfile(nameData, specializData)
        .then((data) => {
            btnSaveChangeProfile.value = 'Сохранение...'
            getDataProfile()
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
        })
        .catch((error) => {
            console.log(error.message)
        })
}

// // Функция изменения аватарки + отправка на сервер 
export function changeAvatar(urlLinkAvatar) {
    saveAvatarProfile(urlLinkAvatar)
        .then(() => {
            photoAvatar.src = urlLinkAvatar;
            closePopUp(popUpChahgeAvatar)
            formAvatarChange.reset()
        })
        // .then((evt) => {
        //     evt.target.reset()
        // })
        .catch((error) => {
            console.log(error)
        })
}


