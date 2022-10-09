import { nameForm, specializForm, photoAvatar, popUpChahgeAvatar, popupChangeProfile, btnSaveChangeProfile } from './data.js';
import { getDataProfile, saveAvatarProfile, saveDataProfile } from './api.js';
import { closePopUp } from './modal';
export let idProfile = '';

//Получение ID с сервера 
getDataProfile()
    .then((res) => {
        return getIDforMyProfile(res._id)
    }).catch((error) => {
        console.log(error.message)
    })


//Функция присваивания ID пользователю
export function getIDforMyProfile(id) {
    idProfile = id
};

// Добавление данных в профиль из сервера
export function addDataProfile(nameData, specializData, urlAvatarData, idProfile) {
    nameForm.textContent = nameData;
    specializForm.textContent = specializData;
    photoAvatar.src = urlAvatarData;
};


// Функция изменения профиля + отправка на сервер 
export function submitEditProfileForm(nameData, specializData) {
    saveDataProfile(nameData, specializData)
        .then((data) => {
            btnSaveChangeProfile.value = 'Сохранение...'
            getDataProfile()
                .then((res) => {
                    addDataProfile(res.name, res.about, res.avatar)
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
        })
        .catch((error) => {
            console.log(error)
        })
}


