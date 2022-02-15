import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      curUser: null,
      socket: null,
      file_content: null,
    };
  },
  getters: {
    user: (state) => state.curUser,
    socket: (state) => state.socket,
    file_content: (state) => state.file_content,
  },
  mutations: {
    userLogin(state, userLogin) {
      state.curUser = userLogin;
    },
    socket(state, sock) {
      state.socket = sock;
    },
    file_content(state, content) {
      state.file_content = content;
    },
  },
  actions: {
    handleUserLogin(context, newUserLogin) {
      context.commit('userLogin', newUserLogin);
    },
    setSocket(context, newSock) {
      context.commit('socket', newSock);
    },
    setContent(context, newContent) {
      context.commit('file_content', newContent);
    },
  },
});

export default store;
