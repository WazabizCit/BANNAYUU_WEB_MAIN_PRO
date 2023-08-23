
export const state = () => ({
    register_member: {
  
        phonenumber:  '',    
        uuiduser:'',    
        tokenuser:'',    
        firstname:'',    
        lastname:'',    
        phonenumber:'',
        address:'',
        companyname:'',
        companycode:''
        
    
    }
    
    
})

export const actions = {
    setRegisterMember({ commit }, data) {
        commit('SET_REGISTER_MEMBER', data)
    },
  
}

export const getters = {
    
    getRegisterMember(state) {     
        return state.register_member     
    }

 
}



export const mutations = {
    SET_REGISTER_MEMBER(state, data) {
        state.register_member = {
            ...state.register_member, ...data
        }
    }
}
