
<template>
  <header class="header_area">
    <div id="navbar" class="main_menu fixed-top">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container box_1620">
          <router-link class="navbar-brand logo_h" v-bind:to="'/home'"><img src="@/assets/start/img/web_security_app.png" alt=""></router-link>
          
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          
          <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
            <ul class="nav navbar-nav menu_nav justify-content-end">
              <li class="nav-item active"><router-link class="nav-link" v-bind:to="'/home'">Home</router-link></li>               
              <li class="nav-item submenu dropdown">
                <router-link class="nav-link dropdown-toggle" 
                  data-toggle="dropdown" 
                  role="button" 
                  aria-haspopup="true" 
                  aria-expanded="false" 
                  v-bind:to="'/home/services/attacks'">
                  Servicios
                </router-link>                
                <ul class="dropdown-menu">
                  <li class="nav-item"><router-link class="nav-link" v-bind:to="'/home/services/attacks'">Pruebas</router-link></li>
                  <li class="nav-item"><router-link class="nav-link" v-bind:to="'/home/services/packages'">Paquetes</router-link></li>
                </ul>
							</li>              
              <li class="nav-item"><router-link class="nav-link" v-bind:to="'/home/contact'">Contacto</router-link></li>
              <li class="nav-item">
                  <button v-on:click="sign_in()" class="button boton_1 button-header bg mr-1"><em class="cil-user"/> Mi cuenta</button> 
                  <button v-on:click="shopping_cart()" class="button boton_1 button-header bg"><em class="cil-cart"/> Mi carrito</button> 
              </li>                    
            </ul>
          </div>          
        </div>
      </nav>
      
    </div>
  </header> 
  <!--<nav class="navbar navbar-expand-lg navbar-light bg-light"  v-bind:class=" { 'navbarOpen': show }">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
   aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
   v-on:click="toggleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent"
  v-bind:class="{ in: show }"
 >
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>-->
</template>

<script>
import Vuex from "vuex";

export default {
  name: 'TheHeaderInit',
  props: {
    msg: String
  },
  data() {
    return {
      navbarOpen: true,
      _user : {
            token: '',
            userid: -1,
            username: '',
            email: '',
            name: '',      
            last_name: '',
            is_logged: false
        }
    }
  },  
  components: {    
  },
  computed: {
    ...Vuex.mapState("StoreGlobal", ["user"]),
    ...Vuex.mapGetters("StoreGlobal", ["get_user"])   
  },
  created () {
    window.addEventListener('scroll', this.scrollFunction);
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollFunction);
  },
  methods:{  
    ...Vuex.mapActions("StoreStore", ["change_user"]), 
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    },
    scrollFunction() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 ) {        
        document.getElementById("navbar").style.backgroundColor = "#412fb3";                        
      } else {
        document.getElementById("navbar").style.backgroundColor = "transparent";        
      }
    },
    sign_in(){
      let is_logged = localStorage.getItem('is_logged');      
      if (is_logged == 1){
        this.$router.push('/dashboard')
      }else{
        this.$router.push('/pages/login')
      }      
    },
    shopping_cart(){
      let is_logged = localStorage.getItem('is_logged'); 
      if (is_logged == 1){
        this.$router.push('/home/shoppingcart')
      }else{
        this.$router.push('/pages/login')
      }      
    }
  }
}
</script>

<style scoped>


</style>

