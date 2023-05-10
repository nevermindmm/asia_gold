import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)

export default () => new Vuex.Store({
  state: () => ({
    typeInput: [],
    salesTitle: {},
    total_price_all:0

  }),
  mutations: {
    setTypeInput(state, payload) {
      state.total_price_all=0
      state.typeInput[payload.index] = payload.value
      for(let i =0;i<state.typeInput.length;i++){
        state.total_price_all+=state.typeInput[i].total_price
      }
      // console.log(state.typeInput)
      // console.log(state.total_price_all)
    },
    setTypeInputSize(state, payload) {
      state.total_price_all=0
      state.typeInput.splice(payload)
      for(let i =0;i<state.typeInput.length;i++){
        state.total_price_all+=state.typeInput[i].total_price
      }
    },
    setSalesTitle(state, payload) {
      state.salesTitle = payload
    }
  },
  actions: {

  },
  modules: {

  }
})