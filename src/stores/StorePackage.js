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
        get_packages({commit}){
            const path = 'http://3.14.19.238:8000/pentesting/package_list/';                
            axios.get(path).then(response => {    
                //console.log(response.data)  ;
                const packages = response.data
                commit('fill_in_packages', packages)
            }).catch(error => {
                console.log(error);     
                commit('set_errored', true);
                commit('set_errors', "¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!")       
            }).finally(() => commit('set_loading', false))               
        },
        remove_package({commit}, id){
            const path = 'http://3.14.19.238:8000/pentesting/package_delete/'+id;
            axios.delete(path).then(response => {    
                //console.log(response);       
                commit('set_errored', false);          
                commit('set_succed', true);                  
                commit('set_success', {'message':'¡Paquete eliminado correctamente!!!'});               
            })
            .catch(error => {
                commit('set_errored', true);
                commit('set_errors', {'message': '¡No se ha podido eliminar el paquete!, intentelo más tarde.'})                       
            })
            .finally(() => commit('set_loading', false))
        },
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