import Card from './Сard.js';
import PopupWithImage from './PopupWithImage.js';

export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }
    addItem(element) {
        this._container.append(element);
    }
    clear() {
        this._container.innerHTML = '';
    }
    renderItems() {
        this.clear();

        this._renderedItems.forEach(item => {
            this._renderer(item);
            // const card = new Card(item, '#element-template');
            // const cardElement = card.createCards();

            //this.addItem(cardElement);
        });
    }
}