<template>
  <Header />
  <section class="main--content">
    <div class="main__wrapper">
      <Editor />
    </div>
  </section>
</template>

<script>
import Editor from './components/editor/Editor.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Editor,
    Header,
  }
}
</script>

<style>
#app {
  
}

:root {
    --editor-bg: #eee;
    --editor-border: #3f87a6;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html, body {
    height: 100%;
    width: 100%;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
}

.main--content {
    height: 100%;
    display: flex;
    justify-content: center;
    background: var(--editor-bg);
}

.main__wrapper {
    height: 100%;
    width: 90%;
    display: flex;
}
</style>
