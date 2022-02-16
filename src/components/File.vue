<template>
  <div class="container">
    <div class="table__wrap">
      <button class="btn btn-primary">
        <router-link to="/home">Return</router-link>
      </button>
      <table v-if="user_pers.length" class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Owner Files</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in owner_files" :key="file">
            <td>{{ file.file_id }}</td>
            <td>
              <button
                class="btn btn-sm btn-primary"
                @click="handleClick(file.file_id)"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th scope="col">Shared Files</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in shared_files" :key="file">
            <td>{{ file.file_id }}</td>
            <td>
              <button
                class="btn btn-sm btn-primary"
                @click="handleClick(file.file_id)"
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
  computed: {
    owner_files: function () {
      return this.user_pers.filter((file) => file.is_owner);
    },
    shared_files: function () {
      return this.user_pers.filter((file) => !file.is_owner);
    },
  },
  methods: {
    handleClick(file_id) {
      // console.log(file_id);
      this.$router.push(`/home/${file_id}`);
    },
  },
};
</script>
<style scoped>
.table__wrap {
  width: 60%;
}

.btn a {
  color: white;
  text-decoration: none;
}
</style>
