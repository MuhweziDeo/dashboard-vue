import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth.module'
import drawer from './drawer.module'
import app from './app.module';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
      auth,
      drawer,
      app
  }
})

export default store;
