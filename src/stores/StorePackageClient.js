import axios from "axios";

export default{
    namespaced: true,
    state: {         
        packages: [],
        errored: false,
        errors: [],
        succed: true,
        success: [],      
        loading: true,
        /*categories: [],*/
        package_:{
            id: -1,
            name: '',
            state: false,    
            description: '',
            price: 0,
            attacks:[

            ]                                  
        }
    },
    mutations: { 
        fill_in_packages(state, packages){
            state.packages = packages
        },
        set_errors(state, error){
            state.error=[];
            state.errors.push(error)
        },
        add_errors(state, error){
            state.errors.push(error)
        },
        set_errored(state, errored){
            state.errored=errored
        },
        set_loading(state, loading){
            state.loading=loading
        },
        set_success(state, success){
            state.success=[];
            state.success.push(success)
        },        
        add_success(state, success){
            state.success.push(success)
        },
        set_succed(state, succed){
            state.succed=succed
        },
        set_package(state, package_){
            state.package_ = package_
        }
        /*set_categories(state, categories){            
            state.caategories=categories
        },*/
    },
    actions: {                       
        add_message_success({commit}, success){
            commit('set_succed', true);                  
            commit('set_success', success); 
        },
        package_aux({commit}, package_){
            commit('set_package', package_);
        }
    },
    
    getters: {  
        get_success: state => {
            return state.success;
        },        
    }
    
} 