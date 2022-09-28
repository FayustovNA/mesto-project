//Импорт из дата
import { nameInput, jobInput, popUp, nameForm, specializForm } from "./data";
import { closePopUp } from "./modal";


//Функция редактирования профиля
export function editCard(evt) {
    evt.preventDefault();
    nameForm.textContent = nameInput.value;
    specializForm.textContent = jobInput.value;
    closePopUp(popUp)
}

