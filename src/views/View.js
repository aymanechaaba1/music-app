'use strict';

class View {
  render(data) {
    const markup = this.generateMarkup(data);
    this._clear();
    this._parent.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parent.innerHTML = '';
  }
}

export default View;
