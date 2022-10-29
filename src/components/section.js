export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items
    this._renderer = renderer
    this._container = document.querySelector(selector)
  }

  renderItems = () => {
    this._renderedItems.map((card) => {
      this._renderer(card)
    })
  }

  addItem = (element) => {
    this._container.insertAdjacentElement('afterbegin', element)
  }
}
