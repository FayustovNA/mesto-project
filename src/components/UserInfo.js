export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector)
        this._aboutElement = document.querySelector(aboutSelector)
        this._avatarElement = document.querySelector(avatarSelector)
        this._formId = null
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
        }
    }

    firstRenderUserInfo = (nameData, specializData, avatar, formId) => {
        this._nameElement.textContent = nameData
        this._aboutElement.textContent = specializData
        this._avatarElement.src = avatar
        this._formId = formId
    }

    setUserInfo(nameData, specializData) {
        this._nameElement.textContent = nameData
        this._aboutElement.textContent = specializData
    }

    setUserAvatar(newAvatar) {
        this._avatarElement.src = newAvatar
    }
}