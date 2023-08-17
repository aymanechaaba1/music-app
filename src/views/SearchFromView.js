'use strict';

import View from './View.js';

class SearchFormView extends View {
  _parent = document.querySelector('.search_form');

  getFormData() {
    return Object.fromEntries([...new FormData(this._parent)]);
  }

  addHandler(handler) {
    this._parent.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchFormView();
