<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <div class="form-group">
            <label for="">Username</label>
            <input type="text" class="form-control" v-model="username" placeholder="Username">
        </div>
        <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password">
        </div>
        <button class="btn btn-primary btn-block">Login</button>
    </form>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async handleSubmit() {
            const response = await axios.post('https://np-prj-services.herokuapp.com/users/login', {
                username: this.username,
                passwd: this.password
            });
            console.log(response.data.data);
            // console.log('sha');
        }
    }
}
</script>