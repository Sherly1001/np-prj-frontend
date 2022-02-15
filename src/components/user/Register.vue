<template>
  <div class="container">
    <div class="form-register form-wrap">
      <form @submit.prevent="handleSubmit">
        <h3>Sign Up</h3>
        <div v-show="error" class="alert alert-danger" role="alert">
          {{ errorMsg }}
        </div>
        <div class="form-group">
          <label for="">Username</label>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Username"
            required
          />
        </div>
        <div class="form-group">
          <label for="">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <label for="">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>
        <button class="btn btn-primary btn-block">Sign Up</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { api_url } from '../../utils/const';

export default {
  name: 'Register',

  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: false,
      errorMsg: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(`${api_url}/users/signin`, {
          username: this.username,
          email: this.email,
          passwd: this.password,
        });
        this.$store.getters.socket.sendObj({
          type: 'login',
          args: [response.data.data],
        });
        this.$router.push('home');
      } catch (err) {
        const msgs = err.response.data.message.split(':');
        this.error = true;
        this.errorMsg = msgs[msgs.length - 1];
      }
    },
  },
};
</script>
