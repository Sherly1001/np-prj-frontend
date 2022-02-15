export function newCursorHTML(config, color) {
  let div = document.createElement('div');

  let style_color = color ? `color: ${color};` : '';
  div.innerHTML = `
    <div class="ace_cursor" style="${style_color}
      display: block;
      width: ${config.width}px; height: ${config.height}px;
      transform: translate(${config.left}px, ${config.top}px);
    "></div>`
    .trim()
    .replace(/\s+/g, ' ');

  return div.firstChild;
}

export class CursorMaker {
  constructor(session, cursors) {
    this.session = session;
    this.cursors = cursors;
    this._elms = {};
  }

  update(_, markerLayer, session, config) {
    for (let name in this.cursors) {
      let pos = this.cursors[name];
      let screenPos = session.documentToScreenPosition(pos);

      let width = config.characterWidth;
      let height = config.lineHeight;
      let top = screenPos.row * height;
      let left = markerLayer.$padding + screenPos.column * width;

      let c = newCursorHTML({ width, height, top, left }, pos.color);

      if (this._elms[name]) {
        this._elms[name].remove();
        this._elms[name] = null;
      }

      markerLayer.elt(
        `ace_layer ace_cursor-layer ${
          pos.blink ? 'ace_animate-blinking' : 'ace_hidden-cursors'
        }`,
        ''
      );
      let parentNode =
        markerLayer.element.childNodes[markerLayer.i - 1] ||
        markerLayer.element.lastChild;

      parentNode.appendChild(c);
      this._elms[name] = c;
    }
  }

  redraw() {
    this.session._signal('changeFrontMarker');
  }

  addCursor(name, cursor) {
    cursor.blink == undefined && (cursor.blink = true);
    this.cursors[name] = cursor;
  }

  removeCursor(name) {
    if (this._elms[name]) {
      this._elms[name].remove();
      delete this._elms[name];
    }
    delete this.cursors[name];
  }
}
