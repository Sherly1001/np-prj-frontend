<template>
  <div id="app">
    <Header />
    <router-view
      :user_pers="user_pers"
      :old_file="file_content ? file_content.file_id : ''"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters(['editor', 'ws_id', 'file_content']),
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

    ws.onmessage = (m) => {
      let data = JSON.parse(m.data);
      // console.log(data);

      if (data.accept) {
        if (data.accept.user) ws.sendObj({ type: 'get-user-pers', args: [] });
        this.$store.dispatch('handleUserLogin', data.accept.user);
        this.$store.dispatch('setWsid', data.accept.ws_id);
      } else if (data.get) {
        if (data.get.error) {
          // handler when can't open file
          console.log(data.get.error);
          alert(data.get.error);
          this.$router.push('/home');
        } else {
          this.$store.dispatch('setContent', data.get);
        }
      } else if (data.insert) {
        if (data.insert.error) {
          console.log(data.insert.error);
          this.editor._remove(data.event, null);
        } else {
          this.editor._insert(
            data.event.start,
            data.insert.string,
            data.event.ws_id
          );
        }
      } else if (data.remove) {
        if (data.remove.error) {
          console.log(data.remove.error);
          this.editor._insert(
            data.event.start,
            data.event.lines.join('\n'),
            null
          );
        } else {
          this.editor._remove(data.event, data.event.ws_id);
        }
      } else if (data['get-user-pers']) {
        this.$store.dispatch('setUserPers', data['get-user-pers']);
      } else if (data['set-user-pointer']) {
        let pos = data['set-user-pointer'];
        this.editor._set_cursor(pos);
      } else if (data['create-file']) {
        alert(`file created with id: ${data['create-file'].file_id}`);
        this.$store.dispatch('setContent', data['create-file']);
        this.$router.push(`/home/${data['create-file'].file_id}`);
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
