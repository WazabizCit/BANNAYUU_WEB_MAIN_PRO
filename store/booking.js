
export const state = () => ({
  
    info_booking_visitor: {   
        uuiduser:'',    
        
    
    },
    
})

export const actions = {   

    setInfoBookgin({ commit }, data) {
        commit('SET_INFO_BOOKING', data)
    },
  
}

export const getters = {    
 
    getInfoBooking(state) {     
        return state.info_booking_visitor     
    },


 
}



export const mutations = {
  
    SET_INFO_BOOKING(state, data) {
        state.info_booking_visitor = {
            ...state.info_booking_visitor, ...data
        }
    }
}
