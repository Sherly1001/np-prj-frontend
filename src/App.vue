<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <!-- <section class="main--content">
      <div class="main__wrapper">
        <Editor />
      </div>
    </section> -->
  </div>
</template>

<script>
// import Editor from './components/editor/Editor.vue';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    // Editor,
    Header,
  },
  async created() {
    const ws = await new WebSocket(
      `wss://np-prj-services.herokuapp.com/ws?token=${localStorage.getItem(
        'token'
      )}`
    );
    ws.onmessage = (m) => {
      let serverRes = JSON.parse(m.data);
      this.$store.dispatch('handleUserLogin', serverRes.accept.user);
      // console.log(serverRes);
      console.log('user login:', serverRes.accept.user);
    };
  },
};
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

html,
body {
  height: 100%;
  width: 100%;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro',
    'monospace';
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

.form-wrap h3 {
  text-align: center;
}

.form-wrap {
  width: 40%;
  padding: 2rem;
  border: 1px solid #444859;
  border-radius: 10px;
}

.container {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
}
.form-group {
  margin-bottom: 1rem;
}
</style>
