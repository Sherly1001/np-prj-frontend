<template>
  <div class="container">
    <div class="form-login form-wrap">
      <form @submit="handleSubmit">
        <h3>Login</h3>
        <div v-show="error" class="alert alert-danger" role="alert">
          {{ errorMsg }}
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            class="form-control"
            v-model="username"
            placeholder="Username"
          />
        </div>
        <div class="form-group">
          <label for="">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block">Login</button>
          <router-link to="/register">Create new account?</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { api_url } from '../../utils/const';

export default {
  name: 'Login',
  props: {
    ws: WebSocket,
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      username: '',
      password: '',
      error: false,
      errorMsg: '',
    };
  },
  mounted() {
    if (this.$store.state.curUser != null) {
      this.$router.push('home');
    }
  },
  methods: {
    async handleSubmit(e) {
      try {
        e.preventDefault();
        const response = await axios.post(`${api_url}/users/login`, {
          username: this.username,
          passwd: this.password,
        });
        this.cookies.set('token', response.data.data);
        this.$store.getters.socket.sendObj({
          type: 'login',
          args: [response.data.data],
        });
        this.$router.push('home');
      } catch (err) {
        console.log(err);
        const msgs = err.response.data.message.split(':');
        this.error = true;
        this.errorMsg = msgs[msgs.length - 1];
      }
    },
  },
};
</script>

<style scoped>
.btn {
  margin-right: 10px;
}
</style>
