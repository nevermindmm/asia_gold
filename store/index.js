import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)

export default () => new Vuex.Store({
  state: () => ({
    typeInput:[],
  }),
  mutations: {
    setTypeInput(state,payload){
      state.typeInput[payload.index]=payload.value
      console.log(state.typeInput)
    },
    setTypeInputSize(state,payload){
      state.typeInput.splice(payload)
    }
  },
  actions: {
    
  },
  modules: {
   
  }
})