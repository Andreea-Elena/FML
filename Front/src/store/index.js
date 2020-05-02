import Vue from 'vue'
import Vuex from 'vuex'

import appUtils from './app-utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    appUtils
  }
})

export default store