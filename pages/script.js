//Переменные
const buttonAdd = document.querySelector('.profile__button-add');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelectorAll('.popup__button-close');
const popUp = document.querySelector('.popup');
const popUpEl = document.querySelector('#element');
const popupBrowse = document.querySelector('#browse');
const buttonCreateElement = popUpEl.querySelector('.popup__button-save');
const buttonLike = document.querySelectorAll('.element__like');
const formElement = popUp.querySelector('.popup__forma');
const nameInput = formElement.querySelector('.popup__form-name');
const jobInput = formElement.querySelector('.popup__form-specialization');
const buttonSavePlace = popUp.querySelector('.popup__button-save');
const elementsContainer = document.querySelector('.elements');
const imgPopUp = popupBrowse.querySelector('.popup__img');
const imgPopUpTitle = popupBrowse.querySelector('.popup__img-title');


//Функция открытия popUp
function openPopUp(button) {
    button.classList.add('popup_opened');
}


//Функция закрыть popUp
function closePopUp(button) {
    button.classList.remove('popup_opened');
}


//Функция создать карточку
function createCard (maskValue, titleValue) {
    const elementTemplate = document.querySelector('#element-template').content;
    const elementNew = elementTemplate.querySelector('.element').cloneNode(true);
    elementNew.querySelector('.element__mask').src = maskValue;
    elementNew.querySelector('.element__mask').setAttribute('value', titleValue);
    elementNew.querySelector('.element__title').textContent = titleValue;
    elementNew.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-active');
    });
    elementNew.querySelector('.element__delete').addEventListener('click', function () {
        elementNew.remove()
    });
    elementNew.querySelector('.element__mask').addEventListener('click', function () { browesImg(maskValue, titleValue) });
    return elementNew;
}


//Функция добавить карточку
function addElement(maskValue, titleValue) {
    const newCad = createCard(maskValue, titleValue);
    elementsContainer.prepend(newCad);
}


//Функция просмотра фотографии карточки
function browesImg(maskValue, titleValue) {
    imgPopUp.src = maskValue;
    imgPopUpTitle.textContent = titleValue;
    openPopUp(popupBrowse);
}


//Функция редактирования профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector('.profile__name-first').textContent = nameInput.value;
    document.querySelector('.profile__specialization').textContent = jobInput.value;
}


//Закрытие popUp
buttonClose.forEach((button) => {
    const closePopUpEv = button.closest('.popup', '.popup-el');
    button.addEventListener('click', function() {
        closePopUp(closePopUpEv);
    })
    })


//Рендер карточек
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function addStartCards() {
    initialCards.forEach(card => {
        addElement(card.link, card.name)
    })
};

addStartCards();


//Добавление карточки и лайка
buttonAdd.addEventListener('click', function () { openPopUp(popUpEl) });
buttonCreateElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    const mask = popUpEl.querySelector('.popup__form-pic');
    const title = popUpEl.querySelector('.popup__form-name');
    addElement(mask.value, title.value);
    closePopUp(popUpEl);
    mask.value = '';
    title.value = '';
}
);


//Редактирование карточки
buttonEdit.addEventListener('click', function () { openPopUp(popUp) });
formElement.addEventListener('submit', formSubmitHandler);
buttonSavePlace.addEventListener('click', function () { closePopUp(popUp); });

