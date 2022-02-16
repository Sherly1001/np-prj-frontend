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
    };
  },
  //   props: ['user_pers'],

  computed: {
    ...mapGetters(['user', 'socket', 'file_content']),
    consoleLogList() {
      return document.querySelector('.editor__console-logs');
    },
  },
  mounted() {
    // this.socket.sendObj({type:'create-file', args:['280719123468652544', 3, 0, 'content here dkshkj']})
    if (this.$route.params.file_id.match(/\d+/)) {
      this.file_id = this.$route.params.file_id;
      this.socket.sendObj({
        type: 'get',
        args: [this.file_id, false],
      });
    } else {
      this.file_id = null;
      this.$router.push('/home');
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

    this.editor.on('change', () => {
      this.content = this.editor.getValue();
    });

    this.editor.on('changeSelection', () => {
      this.cursors_marker.redraw();
    });

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
        this.editor.setValue(newVal.contents[0].content);
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
