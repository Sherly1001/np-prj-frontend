<template>
  <div class="container">
    <div class="table__wrap">
      <button class="btn btn-primary">
        <router-link to="/home">Return</router-link>
      </button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">File Id</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user_per in user_pers" :key="user_per">
            <td>{{ user_per.file_id }}</td>
            <td>
              <button
                class="btn btn-sm btn-primary"
                @click="handleClick(user_per.file_id)"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'File',
  props: ['user_pers'],
  methods: {
    handleClick(file_id) {
      // console.log(file_id);
      this.$router.push(`/home/${file_id}`);
    },
  },
};
</script>
<style scoped>
.table {
  /* width: 60%; */
}

.table__wrap {
  width: 60%;
}

.btn a {
  color: white;
  text-decoration: none;
}

.btn-return {
}
</style>
