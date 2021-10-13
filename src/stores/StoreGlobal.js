
import axios from "axios";
//import { storage } from '../storage';

export default{
    namespaced: true,
    state: {                         
        user : {
            // token:  storage.getLocalStorageToken || '',
            // userid: storage.getLocalStorageId || -1,
            // username: storage.getLocalStorageUsername || '',
            // email: storage.getLocalStorageEmail || '',
            // name: storage.getLocalStorageName || '',      
            // last_name: storage.getLocalStorageLastName || '',
            // is_logged: storage.getLocalStorageLogged || false
            token:  '',
            userid: -1,
            username: '',
            email: '',
            name:'',      
            last_name: '',
            is_logged: false
        },
        config: {
            headers: { 
                Authorization: 'Bearer ' 
            }
        }
    },
    mutations: {        
        set_user(state, user){
            state.user = user
            // storage.getLocalStorageToken = user.token
            // storage.getLocalStorageId = user.userid
            // storage.getLocalStorageUsername = user.username
            // storage.getLocalStorageEmail = user.email
            // storage.getLocalStorageName = user.name
            // storage.getLocalStorageLastName = user.last_name
            // storage.getLocalStorageLogged = user.is_logged
        },
        set_config(state, config){
            state.config = config
        }                
    },
    actions: {                       
        change_user({commit}, user){                         
            commit('set_user', user); 
        }, 
        change_config({commit}, config){                          
            commit('set_config', config);
        }        
    },
    getters: {
        get_user: state => {
            return state.user;
        },
        get_config: state => {
            return state.config;
        }
    } 
} 