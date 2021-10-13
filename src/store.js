import Vue from 'vue'
import Vuex from 'vuex'
import StoreAttack from './stores/StoreAttack'
import StorePackage from './stores/StorePackage'
import StorePackageClient from './stores/StorePackageClient'
import StoreGlobal from './stores/StoreGlobal'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const state = {
  //StoreAttack: StoreAttack,
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  count: 1,
  isLoading: false,
  num: ['1']
}

const mutations = {
  loading(state, str) {
    let list = []
    list.push(str)
    state.num = [...state.num, ...list]
    console.log('ok');
  },
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
  StorePackage,
  StorePackageClient,
  StoreGlobal
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  mutations,
  modules
})