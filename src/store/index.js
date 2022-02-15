import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      curUser: null,
      socket: null,
    };
  },
  getters: {
    user: (state) => {
      return state.curUser;
    },
    socket: (state) => {
      return state.socket;
    },
  },
  mutations: {
    userLogin(state, userLogin) {
      state.curUser = userLogin;
    },
    socket(state, sock) {
      state.socket = sock;
    },
  },
  actions: {
    handleUserLogin(context, newUserLogin) {
      context.commit('userLogin', newUserLogin);
    },
    setSocket(context, newSock) {
      context.commit('socket', newSock);
    },
  },
});

export default store;
