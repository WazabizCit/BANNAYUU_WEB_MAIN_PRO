
export const state = () => ({
  
    navbar:{
        status_navbar:0
    }
})

export const actions = {
  
    setStatusnavbar({ commit }, data) {
        commit('SET_STATUS_NAVBAR', data)
    }
}

export const getters = {  
 
    getStatusnavbar(state) {
        return state.navbar.status_navbar
    }
}



export const mutations = {
    SET_STATUS_NAVBAR(state, data) {     
        state.navbar.status_navbar = data
    }
}
