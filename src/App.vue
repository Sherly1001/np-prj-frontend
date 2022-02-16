<template>
  <div id="app">
    <Header />
    <router-view :user_pers="user_pers" />
  </div>
</template>

<script>
import { useCookies } from 'vue3-cookies';
import Header from './components/Header.vue';
import { ws_url } from './utils/const';
// import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      user_pers: [],
    };
  },
  components: {
    Header,
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  computed: {
    // ...mapGetters(['user_pers']),
  },
  created() {
    const ws = new WebSocket(`${ws_url}/ws?token=${this.cookies.get('token')}`);

    ws.sendObj = (data) => {
      try {
        ws.send(JSON.stringify(data));
      } catch (err) {
        setTimeout(() => ws.sendObj(data));
      }
    };
    ws.sendObj({ type: 'get-user-pers', args: [] });

    ws.onmessage = (m) => {
      let data = JSON.parse(m.data);
      // console.log(data["get-user-pers"]);

      if (data.accept) {
        this.$store.dispatch('handleUserLogin', data.accept.user);
      } else if (data.get) {
        if (data.get.error) {
          // handler when can't open file
          alert(data.get.error);
          this.$router.push('/home');
        } else {
          this.$store.dispatch('setContent', data.get);
        }
      }
      if (data['get-user-pers']) {
        this.user_pers = data['get-user-pers'];
        // this.$store.dispatch('setUserPers', data["get-user-pers"]);
        console.log(this.user_pers);
      }
    };
    this.$store.dispatch('setSocket', ws);

    // ws.onmessage = (m) => {
    //     let data = JSON.parse(m.data);
    //     // this.user_pers = data["get-user-pers"]
    //     // console.log(data["get-user-pers"]);
    //     console.log(data)
    //     this.$store.dispatch('setUserPers', null);
    // }
  },
};
</script>

<style>
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
