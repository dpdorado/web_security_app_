import Vue from 'vue'
import Vuex from 'vuex'
import StoreAttack from './stores/StoreAttack'
import StorePackage from './stores/StorePackage'

Vue.use(Vuex)

const state = {
  //StoreAttack: StoreAttack,
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  count: 1
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  }
}

const modules = {
  StoreAttack,
  StorePackage
}

export default new Vuex.Store({
  state,
  mutations,
  modules
})