<template>
  <div class="container">
    <div class="form-register form-wrap">
      <form @submit.prevent="handleSubmit">
        <h3>Sign Up</h3>
        <div class="form-group">
          <label for="">Username</label>
          <input
            type="text"
            class="form-control"
            v-model="username"
            placeholder="Username"
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
          />
        </div>
        <div class="form-group">
          <label for="">Confirm password</label>
          <input
            type="tepasswordxt"
            class="form-control"
            v-model="password_confirm"
            placeholder="Confirm password"
          />
        </div>
        <button class="btn btn-primary btn-block">Sign Up</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Register',

  data() {
    return {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
    };
  },
  methods: {
    async handleSubmit() {
      // console.log('data');

      // const data = {
      //     username: this.username,
      //     email: this.email,
      //     passwd: this.password,
      //     password_confirm: this.password_confirm
      // }
      // console.log(data);

      await axios.post('https://np-prj-services.herokuapp.com/users/signin', {
        username: this.username,
        email: this.email,
        passwd: this.password,
        password_confirm: this.password_confirm,
      });
      this.$router.push('login');
      // console.log(response);
    },
  },
};
</script>
