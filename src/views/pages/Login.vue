<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>                
                <CForm>
                  <h1>Inicio de sesión</h1>
                  <p class="text-muted">Ingresa con tu cuenta</p>
                   <div v-if="errored_l">
                    <div v-for="(err, index) in errors_l" v-bind:key="index">
                      <div class="alert alert-danger" role="alert">
                        {{ err.message }}
                      </div>
                    </div>
                  </div>
                  <div v-else-if="succed_l">
                    <div v-for="(succ, index) in success_l" v-bind:key="index">
                      <div class="alert alert-success" role="alert">
                        {{ succ.message }}
                      </div>
                    </div>
                  </div>



                  <CInput
                    placeholder="Nombre de usuario"
                    autocomplete="username email"
                    v-model="send_user.username" 
                    id="username" 
                    name=username
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Contraseña"
                    type="password"
                    autocomplete="curent-password"
                    v-model="send_user.password" 
                    id="password" 
                    name=password
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton v-on:click="login()" color="primary" class="px-4">Ingresar</CButton>                      
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Olvidate tu contraseña?</CButton>
                      <CButton v-on:click="register()" color="link" class="d-lg-none">Registrate ahora!</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Registrate</h2>
                <p>Registrate en web security app para poder hacer tus compras.</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                  v-on:click="register()"
                >
                  Regstrarse ahora!
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";

export default {
  name: 'Login',
   data() {
    return {     
        errored_l: false,
        errors_l: [],
        succed_l: true,
        success_l: [],
        loading_l: false, 
         _config: {
          headers: { 
              Authorization: 'Bearer ' 
          }
        },
        _user : {
            token: '',
            userid: -1,
            username: '',
            email: '',
            name: '',      
            last_name: '',
            is_logged: false
        },
      send_user : {
        username: '',
        password: ''
      }        
    }
  },
  computed: {
    ...Vuex.mapState("StoreGlobal", ["user", "config"]),
    ...Vuex.mapGetters("StoreGlobal", ["get_user", "get_config"]), 
  },
  methods: {    
    ...Vuex.mapActions("StoreGlobal", ["change_user", "change_config"]),
     login(){       
        const path = this.$server+'/login/'; 
        
        axios.post(path, this.send_user).then(response => {
          let token = response.data.token;
          let userid = response.data.user.id;
          let username = response.data.user.username;
          let email = response.data.user.email;
          let name = response.data.user.name;
          let last_name = response.data.user.last_name;
          localStorage.setItem('token', token);
          localStorage.setItem('userid', userid);
          localStorage.setItem('username', username);
          localStorage.setItem('email', email);
          localStorage.setItem('name', name);
          localStorage.setItem('last_name', last_name);
          localStorage.setItem('is_logged', 1); 
          var config =  {
            headers: { 
                Authorization: 'Bearer '+ token
            }
          }      
          localStorage.setItem('config', JSON.stringify(config));         
          this.redirect_login();         
        }).catch(error => {
            this.succed_l = false;
            this.errored_l = true;
            this.errors_l = [];
            this.errors_l.push({
                message:
                "Usuario o contraseña invalido!",
            });            
        }).finally(() => this.loading_l=false)        
    },
    redirect_login(){        
      this.$router.push('/dashboard');
    }
    ,
    register(){
      this.$router.push('/pages/register');
    }
  } 
}
</script>
