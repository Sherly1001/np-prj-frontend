import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      curUser: null,
      ws_id: null,
      socket: null,
      file_content: null,
      user_pers: [],
      editor: null,
    };
  },
  getters: {
    user: (state) => state.curUser,
    socket: (state) => state.socket,
    file_content: (state) => state.file_content,
    user_pers: (state) => state.user_pers,
    ws_id: (state) => state.ws_id,
    editor: (state) => state.editor,
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
    user_pers(state, userPer) {
      state.user_pers = userPer;
    },
    ws_id(state, ws_id) {
      state.ws_id = ws_id;
    },
    editor(state, editor) {
      state.editor = editor;
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
    setUserPers(context, newUserPer) {
      context.commit('user_pers', newUserPer);
    },
    setWsid(context, ws_id) {
      context.commit('ws_id', ws_id);
    },
    setEditor(context, editor) {
      context.commit('editor', editor);
    },
  },
});

export default store;
