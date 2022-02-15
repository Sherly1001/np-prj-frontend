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
export default {
  name: 'Login',
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      username: '',
      password: '',
      error: false,
      errorMsg: 'Username or password is wrong! Please try again!',
    };
  },
  methods: {
    async handleSubmit(e) {
      try {
        e.preventDefault();
        const response = await axios.post(
          'https://np-prj-services.herokuapp.com/users/login',
          {
            username: this.username,
            passwd: this.password,
          }
        );
        // console.log(response);
        localStorage.setItem('token', response.data.data);
        // console.log(localStorage);

        this.cookies.set('token', response.data.data);
        // let my_cookie_value = this.cookies.get("myCoookie");
        // console.log('LOGIN:', my_cookie_value);

        // let url = `wss://np-prj-services.herokuapp.com/ws?token=${response.data.data}`
        // console.log(url)
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

        this.$router.push('home');
      } catch (e) {
        this.error = true;
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
