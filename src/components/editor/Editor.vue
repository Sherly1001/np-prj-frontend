<template>
    <div class="editor">
        <div class="editor__wrapper">
            <div class="editor__body">
                <div id="editorCode" class="editor__code">
                    <v-ace-editor
                        v-model:value="content"
                        :theme="theme"
                        :lang="lang"
                        :mode="lang"
                        style="height: 650px; font-size:15px"
                        :enableLiveAutocompletion="true"
                        :enableBasicAutocompletion="true"
                        :autoComplete="true"/>
                </div>
            </div>
            <div class="editor__footer">
                <div class="editor__footer--left">
                    <button @click="onRun()" class="editor__btn editor__run">Run</button>
                    <button @click="onReset()" class="editor__btn editor__reset">Reset</button>
                </div>
                <div class="editor__footer--right">
                    <div class="editor__console">
                        <ul class="editor__console-logs">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Settings @get-theme="getThemeData" @get-lang="getLangData"/>
</template>

<script>
import { VAceEditor } from 'vue3-ace-editor';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-idle_fingers';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-crimson_editor';
import 'ace-builds/src-noconflict/theme-nord_dark';
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-cobalt';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-ruby';





import Settings from '../Settings.vue'

export default {
    name: 'Editor',
    components: {
        VAceEditor,
        Settings,
    },
    data() {
        return {
            content: '',
            consoleMessages : {
                message: "Code run here",
                class: "log log--string"
            },
            theme: "dracula",
            lang: "javascript"
        }
    },
    computed: {
        consoleLogList() {
            return document.querySelector('.editor__console-logs')
        }
    },
    methods: {
        onReset() {
            this.content = '';

            while (this.consoleLogList.firstChild) {
            this.consoleLogList.removeChild(this.consoleLogList.firstChild);
        } 
        },
        onRun() {
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.className = "log log--string";
            newLogText.textContent = "Code run here";

            newLogItem.appendChild(newLogText);

            this.consoleLogList.appendChild(newLogItem);
        },
        getThemeData(theme) {
            this.theme = theme.value
        },
        getLangData(lang) {
            this.lang = lang.value;
        }
    },
}
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
    padding: 2em;
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
    border: 0;
    padding: .5em;
    background-color: #fff;
    border: 2px solid #333;
    border-radius: 5px;
    margin-top: 1em;
    width: 100px;
    cursor: pointer;
    font-size: 18px;
}

.editor__console {
    background-color: #fff;
    width: 100%;
    height: 130px;
    margin-top: .9em;
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
    font-size: .9em;
    font-family: Inconsolata, sans-serif;
}

.ace_gutter {
    border-left: 5px solid var(--editor-border);
}

.log--default {
    color: #000;
}

.log--string {
    color: #48BF0A;
}

.log--number {
    color: #48BF0A;
}

.log--boolean {
    color: blue;
}

.log--undefined {
    color: grey;
}

.log--error {
    color: red;
}

.log--object {
    color: darkcyan;
}

.log--array {
    color: darkblue;
}

.log--function {
    color: yellow;
}.editor {
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
    padding: 2em;
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
    border: 0;
    padding: .5em;
    background-color: #fff;
    border: 2px solid #333;
    border-radius: 5px;
    margin-top: 1em;
    width: 100px;
    cursor: pointer;
    font-size: 18px;
}

.editor__console {
    background-color: #fff;
    width: 100%;
    height: 130px;
    margin-top: .9em;
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
    font-size: .9em;
    font-family: Inconsolata, sans-serif;
}

.ace_gutter {
    border-left: 5px solid var(--editor-border);
}

.log--default {
    color: #000;
}

.log--string {
    color: #48BF0A;
}

.log--number {
    color: #48BF0A;
}

.log--boolean {
    color: blue;
}

.log--undefined {
    color: grey;
}

.log--error {
    color: red;
}

.log--object {
    color: darkcyan;
}

.log--array {
    color: darkblue;
}

.log--function {
    color: yellow;
}
</style>