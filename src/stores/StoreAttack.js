
import axios from "axios";

export default{
    namespaced: true,
    state: {         
        attacks: [],
        errored: false,
        errors: [],
        succed: true,
        success: [],      
        loading: false,
        /*categories: [],*/
        attack:{
            name: '',
            state: false,    
            description: '',
            price: 0,
            owas_id: '',            
            script: '',
            category: ''                                    
        }           
    },
    mutations: { 
        fill_in_attacks(state, attacks_actions){
            state.attacks = attacks_actions
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
        set_attack(state, attack){
            state.attack = attack
        }        
        /*set_categories(state, categories){            
            state.caategories=categories
        },*/
    },
    actions: {                
        get_attacks({commit}){
            const path = 'http://3.14.19.238:8000/pentesting/attack_list/';                
            axios.get(path).then(response => {      
                const attacks = response.data;
                commit('fill_in_attacks', attacks);               
            }).catch(error => {
                console.log(error);     
                commit('set_errored', true);
                commit('set_errors', "¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!")       
            }).finally(() =>                 
                commit('set_loading', false));                                
        },
        remove_attack({commit}, id){
            const path = 'http://3.14.19.238:8000/pentesting/attack_delete/'+id;
            axios.delete(path).then(response => {    
                console.log(response);                       
                commit('set_errored', false);          
                commit('set_succed', true);                  
                commit('set_success', {'message':'¡Attaque eliminado correctamente!!!'});               
            })
            .catch(error => {
                console.log(error);                       
                commit('set_errored', true);
                commit('set_errors', {'message': '¡No se ha podido eliminar el ataque!, intentelo más tarde.'})                       
            })
            .finally(() => 
            console.log("True"),commit('set_loading', false));            
        },
        add_message_success({commit}, success){
            commit('set_succed', true);                  
            commit('set_success', success); 
        },
        attack_aux({commit}, attack){
            commit('set_attack', attack);
        },
        edit_loading({commit}, loading){
            commit('set_loading', loading);
        },
        edit_attacks({commit}, attacks){
            commit('fill_in_attacks', attacks); 
        }
    },
    getters: {
        get_success: state => {
            return state.success;
        },
    }
    
} 

         