import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            curUser: null,
        }
    },
    getters: {
        user: (state) => {
            return state.curUser;
        }
    },
    mutations: {
        userLogin(state, userLogin) {
            state.curUser = userLogin;
        },
    },
    actions: {
        handleUserLogin(context, newUserLogin) {
            context.commit('userLogin', newUserLogin);
        },
    }
})

export default store;
