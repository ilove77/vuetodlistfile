export const login = {
    namespaced:true,
    state: {
        // count:3,
        acc:'',
        flag: false,
    },
    mutations: {
        welcome(state,temp) {
            state.flag = true
            state.acc = temp.acc
        }
    },
    actions: {

    },

    getters: {

    }
}