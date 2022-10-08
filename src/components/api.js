import { v4 as uuidv4 } from 'uuid';

//__________________________________________________________________________________||Работа с данными профиля
// Загрузка данных для пользователя с сервера 
export const getDataProfile = () => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me', {
        headers: {
            authorization: 'ce769e5c-d297-4f7c-a21c-d8dd2a42f63b',
            'Content-Type': 'application/json',
        },
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
    })
};

// Сохранение данных профиля на сервер 
export const saveDataProfile = (nameData, specializData) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'ce769e5c-d297-4f7c-a21c-d8dd2a42f63b',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameData,
            about: specializData
        }),
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
    })
};

// Сохранение аватарки на сервер 
export const saveAvatarProfile = (imgAvatar) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: 'ce769e5c-d297-4f7c-a21c-d8dd2a42f63b',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: imgAvatar,
        }),
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
    })
};

//__________________________________________________________________________________||Работа с данными карточек
// Загрузка данных для карточек с сервера
export const getDataCards = () => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-15/cards', {
        headers: {
            authorization: 'ce769e5c-d297-4f7c-a21c-d8dd2a42f63b',
            'Content-Type': 'application/json',
        },
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
    })
};

// Сохранение карточки на сервер 
export const saveNewCards = (titleCards, imgLinkUrl) => {
    return fetch('https://nomoreparties.co/v1/plus-cohort-15/cards', {
        method: 'POST',
        headers: {
            authorization: 'ce769e5c-d297-4f7c-a21c-d8dd2a42f63b',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: uuidv4(),
            name: titleCards,
            link: imgLinkUrl,
            likes: [],
        }),
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
    })
};

// Уделение карточки с сервера 
export const deleteCard = (id) => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-15/cards/${id}`,
        {
            method: 'DELETE',
            headers: {
                authorization: 'ce769e5c-d297-4f7c-a21c-d8dd2a42f63b',
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка ${res.status}`)
        })
}

//Отправка лайка на сервер 
export const addOneCardLike = (id) => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-15/cards/likes/${id}`,
        {
            method: 'PUT',
            headers: {
                authorization: 'ce769e5c-d297-4f7c-a21c-d8dd2a42f63b',
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка ${res.status}`)
        })
}

// Удаление лайка с сервера
export const deleteOneCardLike = (id) => {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-15/cards/likes/${id}`,
        {
            method: 'DELETE',
            headers: {
                authorization: 'ce769e5c-d297-4f7c-a21c-d8dd2a42f63b',
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка ${res.status}`)
        })
}
