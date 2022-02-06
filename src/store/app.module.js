export const SET_EDIT_ITEM = 'SET_EDIT_ITEM';
export const GET_EDIT_ITEM = 'GET_EDIT_ITEM';

export default {
    namespaced: true,
    state: {
        editItem: {},
    },
    getters: {
        [GET_EDIT_ITEM](state) {
            return state.editItem
        },
    },
    mutations: {
        [SET_EDIT_ITEM](state, app) {
            state.editItem = app;
        },
    }
}
