export function newCursorHTML(config, color) {
  let div = document.createElement('div');

  let name_top =
    config.top > config.height
      ? config.top - config.height
      : config.top + config.height;

  let style_color = color ? `color: ${color};` : '';
  div.innerHTML = `<div class="ace_multi_cursor"
    style="pointer-events: auto;"><div class="ace_cursor"
      style="${style_color}
        display: block;
        width: ${config.width}px; height: ${config.height}px;
        transform: translate(${config.left}px, ${config.top}px);
      "></div><div class="ace_multi_cursor_username"
      style="${style_color}
        transform: translate(${config.left}px, ${name_top}px);
        opacity: 0;
      ">${config.name}</div>
      </div>`
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

      let cfg = { width, height, top, left, name };
      let c = newCursorHTML(cfg, pos.color);
      c.onmouseenter = () => {
        c.children[1].style.opacity = 1;
      };
      c.onmouseleave = () => {
        c.children[1].style.opacity = 0;
      };

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
