export const GET_DRAWER_OPEN = 'GET_DRAWER_OPEN';

export const SET_DRAWER_OPEN = "SET_DRAWER_OPEN"


export default {
    namespaced: true,
    state: {
        isOpen: false,
    },
    getters: {
          [GET_DRAWER_OPEN](state) {
            return state.isOpen
          },
    },
    mutations: {
          [SET_DRAWER_OPEN](state) {
            state.isOpen = !state.isOpen;
          },
    }
}
