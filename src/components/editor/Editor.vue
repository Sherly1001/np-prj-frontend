<template>
  <section class="main--content">
    <div class="main__wrapper">
      <div class="editor">
        <div class="editor__wrapper">
          <button class="btn btn-sm btn-primary mb-2" style="width: 120px">
            <router-link to="/file">Get User Pers</router-link>
          </button>
          <!-- <div v-for="per in user_pers" :key="per">{{per.file_id}}</div> -->
          <div class="editor__body">
            <div
              id="editorCode"
              class="editor__code"
              style="height: 650px; font-size: 15px"
            ></div>
          </div>
          <div class="editor__footer">
            <div class="editor__footer--left">
              <button
                @click="onRun"
                class="btn btn-default editor__btn editor__run"
              >
                Run
              </button>
              <button @click="onReset" class="editor__btn editor__reset">
                Reset
              </button>
            </div>
            <div class="editor__footer--right">
              <div class="editor__console">
                <ul class="editor__console-logs"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Settings @get-theme="getThemeData" @get-lang="getLangData" />
    </div>
  </section>
</template>

<script>
import { markRaw } from 'vue';
import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';

import Settings from '../Settings.vue';
import { mapGetters } from 'vuex';

import { CursorMaker } from './cursors';

export default {
  name: 'Editor',
  components: {
    Settings,
  },
  data() {
    return {
      file_id: null,
      content: '',
      consoleMessages: {
        message: 'Code run here',
        class: 'log log--string',
      },
      theme: 'dracula',
      lang: 'javascript',
      editor: null,
      cursors: {},
      cursors_marker: {},
      change_by: null,
    };
  },
  computed: {
    ...mapGetters(['user', 'socket', 'file_content', 'ws_id']),
    consoleLogList() {
      return document.querySelector('.editor__console-logs');
    },
  },
  mounted() {
    if (this.$route.params.file_id.match(/\d+/)) {
      this.file_id = this.$route.params.file_id;
      this.socket.sendObj({
        type: 'get',
        args: [this.file_id, false],
      });
    } else {
      this.file_id = null;
      // this.$router.push('/home');
    }

    this.editor = markRaw(
      ace.edit('editorCode', {
        value: this.content,
        mode: 'ace/mode/' + this.lang,
        theme: 'ace/theme/' + this.theme,
        dragEnabled: true,
        enableAutoIndent: true,
        autoScrollEditorIntoView: true,
      })
    );

    this.editor.on('change', (e) => {
      this.content = this.editor.getValue();
      if (this.file_id && this.change_by && this.change_by === this.ws_id) {
        let encoder = new TextEncoder();
        let lines = this.content.split('\n');
        let string = e.lines.join('\n');
        let from =
          lines
            .slice(0, e.start.row)
            .reduce((acc, l) => acc + encoder.encode(l).length + 1, 0) +
          encoder.encode(lines[e.start.row].slice(0, e.start.column)).length;
        let to = from + encoder.encode(string).length;
        let user_id = this.user ? this.user.id : '0';

        e.ws_id = this.ws_id;
        if (e.action === 'insert') {
          this.socket.sendObj({
            type: 'insert',
            args: [this.file_id, user_id, from, to, string, e],
          });
        } else if (e.action === 'remove') {
          this.socket.sendObj({
            type: 'remove',
            args: [this.file_id, user_id, from, to, e],
          });
        }
      }
      this.change_by = this.ws_id;
    });

    this.editor._insert = (range, string, ws_id) => {
      if (this.ws_id !== ws_id) {
        this.change_by = ws_id;
        this.editor.session.insert(range, string);
      }
    };

    this.editor._remove = (range, ws_id) => {
      if (this.ws_id !== ws_id) {
        this.change_by = ws_id;
        this.editor.session.remove(range);
      }
    };

    this.editor._set_cursor = (pos) => {
      this.cursors_marker.addCursor(pos.ws_id, pos);
    };

    this.editor.on('changeSelection', () => {
      if (!this.file_id) return;
      let pos = this.editor.getCursorPosition();
      this.socket.sendObj({
        type: 'set-user-pointer',
        args: [this.file_id, pos.row, pos.column],
      });
    });

    this.$store.dispatch('setEditor', this.editor);

    setTimeout(() => {
      this.cursors_marker = new CursorMaker(this.editor.session, this.cursors);
      this.editor.session.addDynamicMarker(this.cursors_marker, true);

      /*
      this.cursors_marker.addCursor('sher', {
        row: 3,
        column: 3,
        color: 'red',
      });
      this.cursors_marker.addCursor('noob', {
        row: 4,
        column: 4,
        color: 'blue',
      });
      */
    });
  },
  watch: {
    theme(newTheme) {
      this.editor.setTheme('ace/theme/' + newTheme);
    },
    lang(newLang) {
      this.editor.setOption('mode', 'ace/mode/' + newLang);
    },
    file_content(newVal) {
      if (newVal) {
        if (newVal.contents[0].content === '') {
          this.change_by = this.ws_id;
        } else {
          this.editor.setValue(newVal.contents[0].content);
        }
        this.editor.moveCursorTo(0, 0);
      }
    },
    cursors: {
      handler() {
        if (this.cursors_marker.redraw) {
          this.cursors_marker.redraw();
        }
      },
      deep: true,
    },
    $route(to) {
      if (!to.params.file_id) return;
      if (to.params.file_id.match(/\d+/)) {
        this.file_id = to.params.file_id;
        this.socket.sendObj({
          type: 'get',
          args: [this.file_id, false],
        });
      } else {
        this.file_id = null;
        this.$router.push('/home');
      }
    },
  },
  methods: {
    handleClick(file_id) {
      // console.log(file_id);
      this.$router.push(`/home/${file_id}`);
    },
    onReset() {
      while (this.consoleLogList.firstChild) {
        this.consoleLogList.removeChild(this.consoleLogList.firstChild);
      }
    },
    onRun() {
      const newLogItem = document.createElement('li');
      const newLogText = document.createElement('pre');

      newLogText.className = 'log log--string';
      newLogText.textContent = 'Code run here';

      newLogItem.appendChild(newLogText);

      this.consoleLogList.appendChild(newLogItem);
    },
    getThemeData(theme) {
      this.theme = theme.value;
    },
    getLangData(lang) {
      this.lang = lang.value;
    },
  },
};
</script>

<style scoped>
.editor {
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.editor__wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--editor-bg);
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 0.5em;
  border-radius: 3px;
  border: 1px solid #ccc;
}

.editor__body {
  flex: 1;
}

.editor__footer {
  display: flex;
}

.editor__footer--left {
  display: flex;
  flex-direction: column;
}

.editor__footer--right {
  flex: 1;
  margin-left: 10px;
  overflow: hidden;
}

.editor__btn {
  padding: 0.5em;
  background-color: #fff;
  border: 2px solid #333;
  border-radius: 5px;
  margin-top: 1em;
  width: 100px;
  /* cursor: pointer; */
  font-size: 18px;
}

.editor__console {
  background-color: #fff;
  width: 100%;
  height: 130px;
  margin-top: 0.9em;
  border: 1px solid var(--editor-border);
  overflow: auto;
}

.editor__code {
  position: relative;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 1px solid var(--editor-border);
}

/* Editor Console Logs */
.editor__console-logs {
  padding: 10px;
  list-style: none;
}

.editor__console-logs li pre {
  font-size: 0.9em;
  font-family: Inconsolata, sans-serif;
}

.ace_gutter {
  border-left: 5px solid var(--editor-border);
}

.btn a {
  color: white;
  text-decoration: none;
}
</style>
