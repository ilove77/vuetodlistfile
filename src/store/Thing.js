export const thing = {
    namespaced: true,
    state: {
        class: 'd-none',
        body: '',
        // items必須是陣列
        items:[],
        eachprojectitems:[],
        edit:0,
        index:'',
        addoredit:true,
        inputoredit:false,
        editindex:'',
        // checked:[]
        // project:[],
    },
    mutations: {
        block(state) {

            state.class = 'd-flex'
        },
        editstate(state,temp){
            // console.log(14545)
            // edit累加
            state.edit += 1
            state.index = temp
        }
    },
    actions: {

    },

    getters: {
       
    }
}