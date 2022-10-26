import Card from './Сard.js';


export default class Section {
    constructor({ items }, containerSelector) {
        console.log(items);
        this._renderedItems = items;
        this._container = containerSelector;
    }
    addItem(element) {
        this._container.append(element);
    }
    clear() {
        this._container.innerHTML = '';
    }
    renderItems(data) {
        this.clear();

        this._renderedItems.forEach(item => {
            const card = new Card(item, '#element-template');
            const cardElement = card.createCards();

            this.addItem(cardElement);
        });
    }
}