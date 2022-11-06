//Добавление элементов в DOM
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items
    this._renderer = renderer
    this._container = containerSelector
  }

  setRenderFunc = (renderer) => {
    this._renderer = renderer
    return this
  }

  setItems = (items) => {
    this._renderedItems = items
    return this
  }

  addItem(element) {
    this._container.append(element)
  }
  clear() {
    this._container.innerHTML = ''
  }
  renderItems() {
    this.clear()

    this._renderedItems.forEach((item) => {
      this._renderer(item)
    })
  }
}
