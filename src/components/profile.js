// Функция изменения аватарки
import { popUpChahgeAvatar, photoAvatar } from './data.js';
import { closePopUp } from './modal';

export function changeAvatar(urlLinkAvatar) {
    photoAvatar.src = urlLinkAvatar;
    closePopUp(popUpChahgeAvatar);
}