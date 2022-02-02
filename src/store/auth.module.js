export const GET_USER = 'GET_USER';
export const GET_IS_AUTHENTICATED = 'GET_IS_AUTHENTICATED';
export const GET_USER_PROFILE = "GET_USER_PROFILE"
export const SET_AUTH_SUCCESS = 'SET_AUTH_SUCCESS';
export const SET_AUTH_LOGOUT = 'SET_AUTH_LOGOUT'
export const SET_AUTH_LOADING = "SET_AUTH_LOADING"
export const GET_AUTH_LOADING = 'GET_AUTH_LOADING'
export const SET_USER_PROFILE = "SET_USER_PROFILE"


export default {
    namespaced: true,
    state: {
        isAuthenticated: false,
        currentUser: {},
        loading: false,
    },
    getters: {
          [GET_USER](state) {
            return state.currentUser
          },
          [GET_IS_AUTHENTICATED](state) {
            return state.isAuthenticated
          },
          [GET_AUTH_LOADING](state) {
            return state.loading
          },
    },
    mutations: {
          [SET_AUTH_LOGOUT](state) {
            state.isAuthenticated = false
            state.loading = false
            state.currentUser = {}
            state.profile = {}
          },
          [SET_AUTH_SUCCESS](state, user) {
            state.isAuthenticated = true
            state.currentUser = user
          },
          [SET_AUTH_LOADING](state, loading) {
            state.loading = loading
          },
    }
}
