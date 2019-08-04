import axios from 'axios'
const apiUrl = process.env.API_URL || 'http://localhost:80'

export const state = () => ({
    statesList: {}
})
  
export const getters = {
    
    statesList(state) {
      return state.statesList;
    },
  }

export const mutations = {
    ADD_STATES (state, statesList){
        state.statesList = statesList
    },

    EMPTY_STATES(state){
        state.statesList = []
    }
 
}

export const actions = {
    async nuxtServerInit ({ commit }) {
        axios.get(`${apiUrl}/api/states`)
        .then(res=>{ 
            res.data.map((item)=>{
                item.thumbnail = JSON.parse(item.thumbnail)[0];
                item.thumbnail= `${apiUrl}/storage/${item.thumbnail}`
            })
            commit('ADD_STATES', res.data)  
        })
        .catch(err =>{
            console.log(err)
        })
    }
}