<template>
  <section class="header">
    <div class="header__wrapper">
      <div class="header--left">
        <router-link to="/home">Collaborative coding</router-link>
      </div>
      <div class="header--right">
        <button
          type="button"
          class="btn btn-primary header--right_item"
          @click="handleShare()"
        >
          Share
          <fa icon="user-plus" />
        </button>
        <div v-if="user">
          <div
            class="header--right_item"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <a href="javascript:void(0)">
              <span class="username">{{ user.username }}</span>
              <fa icon="sort-down" />
            </a>
          </div>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a
                style="color: black"
                href="javascript:void(0)"
                @click="handleLogout"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
        <div class="d-flex" v-else>
          <div class="header--right_item">
            <router-link to="/register">Register</router-link>
          </div>
          <div class="header--right_item">
            <router-link to="/login">Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { useCookies } from 'vue3-cookies';
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  methods: {
    handleLogout() {
      this.cookies.remove('token');
      this.$store.dispatch('handleUserLogin', null);
      this.$store.dispatch('setUserPers', []);
      this.$router.push('login');
    },
    handleShare() {
      if (this.$store.getters.user && !this.$store.getters.file_content) {
        this.$store.getters.socket.sendObj({
          type: 'create-file',
          args: [
            this.$store.getters.user.id,
            3,
            0,
            this.$store.getters.content,
          ],
        });
      } else if (!this.$store.getters.file_content) {
        this.$store.getters.socket.sendObj({
          type: 'create-file',
          args: ['0', 3, 0, this.$store.getters.content],
        });
      }
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: center;
  background: #444859;
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  height: 60px;
  width: 90%;
}

.header--left {
  font-family: 'Courier New', Courier, monospace;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
}

.header--right {
  display: flex;
  text-align: center;
  align-items: center;
}

a {
  color: #fff;
  text-decoration: none;
  margin-left: 15px;
}

a:hover {
  color: rgb(214, 197, 197);
}

.username {
  margin-right: 5px;
}
</style>
