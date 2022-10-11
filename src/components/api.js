import { v4 as uuidv4 } from 'uuid';
import { checkResponse } from './utils.js';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
    headers: {
        authorization: 'ce769e5c-d297-4f7c-a21c-d8dd2a42f63b',
        'Content-Type': 'application/json',
    },
}

//__________________________________________________________________________________||Работа с данными профиля
// Загрузка данных для пользователя с сервера 
export const getDataProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then(checkResponse)
};

// Сохранение данных профиля на сервер 
export const saveDataProfile = (nameData, specializData) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameData,
            about: specializData
        }),
    }).then(checkResponse)
};

// Сохранение аватарки на сервер 
export const saveAvatarProfile = (imgAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: imgAvatar,
        }),
    }).then(checkResponse)
};

//__________________________________________________________________________________||Работа с данными карточек
// Загрузка данных для карточек с сервера
export const getDataCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then(checkResponse)
};

// Сохранение карточки на сервер 
export const saveNewCards = (titleCards, imgLinkUrl) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            _id: uuidv4(),
            name: titleCards,
            link: imgLinkUrl,
            likes: [],
        }),
    }).then(checkResponse)
};

// Уделение карточки с сервера 
export const deleteCard = (evt) => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-15/cards/${evt.target.parentElement.id}`,
        {
            method: 'DELETE',
            headers: config.headers,
        }).then(checkResponse)
}

//Отправка лайка на сервер 
export const addOneCardLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`,
        {
            method: 'PUT',
            headers: config.headers,
        }).then(checkResponse)
}

// Удаление лайка с сервера
export const deleteOneCardLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`,
        {
            method: 'DELETE',
            headers: config.headers,
        }).then(checkResponse)
}
