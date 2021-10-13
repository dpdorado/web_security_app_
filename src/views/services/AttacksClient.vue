<template>
  <section class="section-margin">      
    <div class="container col-md-12">        
      <div class="card">
        <div class="card-header">               
          <h2><CIcon name="cil-list"/> <small>Pruebas de penetración</small></h2>
          <p>Elije la prueba que se adapte a tu bolsillo y tus necesidades.</p>
        </div>
        <div class="card-body">            
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-10">
                <div class="demo">
                  <form class="form-search">
                    <div class="input-group">
                      <div class="input-group">                        
                        <input type="text" placeholder="Buscar prueba" class="form-control col-lg-9" v-model="name">
                        <div class="input-group-append">
                          <button  type="button" class="btn btn-primary"><em class="cil-search"/></button>
                        </div>                                                                              
                      </div>
                    </div>
                  </form>
                </div>                    
              </div>

              <div class="col-md-2">                    
                  <button id="btnAdd" v-on:click="viewCart()" class="btn btn-success btn text-right"><em class="cil-cart"/> Ir al Carrito</button> 
              </div>
            </div>            
          </div>    
            
          <br>

           <div v-if="errored_l">
            <div v-for="(err,index) in errors_l" v-bind:key="index">
              <div class="alert alert-danger" role="alert">
                  {{err.message}}
              </div>    
            </div>
          </div>          
          <div v-else-if="succed_l">                        
            <div v-for="(succ,index) in success_l" v-bind:key="index">
              <div class="alert alert-success" role="alert">
                  {{succ.message}}
              </div>    
            </div>            
          </div>

          <br>
          
          <div class="row">
            <div class="col-md-3 col-lg-3 mb-3 mb-lg-0" v-for="(attack_) in pageOfItems" v-bind:key="attack_.id">              
              <div class="card text-center card-pricing border">
                <div class="card-pricing__header">
                  <h4>{{attack_.name}}</h4>
                  <p>{{attack_.description}}</p>                  
                  <h1 class="card-pricing__price"><span>$</span>{{attack_.price}}</h1>
                </div>                
                
                <div class="card-pricing__footer">
                  <button v-on:click="addToCart(attack_.service_id, attack_.name)" class="button button-light">Añadir al carrito</button>
                </div>

              </div>              
            </div>                        
          </div>
          <div class="card-footer row justify-content-end">
            <jw-pagination :items="search_attacks" @changePage="onChangePage" :labels="customLabels"></jw-pagination>
          </div>               
        </div>    
      </div>
    </div>              
  </section>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";
import NavbarService from './NavbarService';

const customLabels = {
  first: "<<",
  last: ">>",
  previous: "<",
  next: ">",
};

export default {
  name: "AttackClient",
  components: {
    NavbarService
  },
  data() {
    return{
      errored_l: false,
      errors_l: [],
      succed_l: true,
      success_l: [],
      loading_l: false,
      darkModal: false,
      pageOfItems: [],
      customLabels,
      attacks: [],
      count_attacks_search: 0,
      name: "",  
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
        is_logged: false,        
        _config: {
          headers: { 
              Authorization: 'Bearer ' 
          }
        }
      },
    };
  },
  filters: {},
  computed: {
    ...Vuex.mapState("StoreAttack", [
      "loading",
      "errored",
      "errors",
      "succed",
      "success",
    ]),
    ...Vuex.mapGetters("StoreAttack", ["get_success"]),
    ...Vuex.mapState("StoreGlobal", ["user", "config"]),
    ...Vuex.mapGetters("StoreGlobal", ["get_user", "get_config"]),
     search_attacks: function () {       
        if (this.name==''){
          return this.attacks;
        }else{                      
          return this.attacks.filter((attack) => attack.name.includes(this.name));
        }        
      }
  },
  methods: {
    ...Vuex.mapActions('StoreAttack',['attack_aux']),
    ...Vuex.mapActions("StoreGlobal", ["change_user", "change_config"]),
    viewCart(){
      this.$router.push('/home/shoppingcart');
    },    
    addToCart(id, name){
      const path = this.$server+'/shopping/shoppingCartAdd/';   
      let info = {
        "users": 1,
        "services": id
      };                         
      axios.post(path, info, this._config).then(response => {
          console.log(response);
          this.errored_l = false;
          this.succed_l = true;
          this.success_l = [];
          this.success_l.push({
              message:
              "¡El servicio: " +
              name +
              " ha sido agregado al carrito!!!",
          });  
          window.scrollTo(0, 0);        
      }).catch(error => {            
          console.log('¡Ocurrio un error!');
          console.log(error);
          this.succed_l = false;
          this.errored_l = true;
          this.errors_l = [];
          this.errors_l.push({
              message:
              "¡Ha ocurrido un error el servicio: "+ name + "al carrito, revise si no se ha agregado antes!!!",
          });
          window.scrollTo(0, 0);
      }).finally(() => this.loading_l=false)             
    },  
    get_attacks(){
      const path = this.$server+'/pentesting/attack_list/'                
      axios.get(path, this._config).then(response => { 
          console.log(response);       
          this.attacks = response.data;                       
      }).catch(error => {
          console.log(error);  
          this.succed_l=false; 
          this.errored_l =true; 
          this.errors_l=[];
          this.errors_l.push({'message':'¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!'});                
          window.scrollTo(0, 0);
      }).finally(() => this.loading_l=false);                                
    },
    onChangePage(pageOfItems) {
        // update page of items
        this.count_attacks_search = pageOfItems.length;
        this.pageOfItems = pageOfItems;
    },
    set_errors(){
      this.succed_l=this.succed;           
      this.success_l= this.succed_l;        
    },
    color_nav: function() {
      let color = "#22195b";
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        color = "#22195b";
      }
      document.getElementById("navbar").style.backgroundColor = color;
    },
  },
  created() {
    window.addEventListener("scroll", this.color_nav);
  },
  destroyed() {
    window.removeEventListener("scroll", this.color_nav);
  },
  mounted() {
    var config = localStorage.getItem('config');            
    this._config = JSON.parse(config);   
    console.log(this._config);
    //this._user = this.user
    //this._config.headers.Authorization = 'Bearer '+this._user.token
    this.color_nav();
    this.set_errors();
    this.get_attacks();    
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .vertical-nav {
    position: fixed;
    top: 56px;
    left: 0;
    width: 300px;
    height: 100%;
    background-color: #f8f8f8;
    overflow-y: auto;
    padding-top: 40px;
  }
}
</style>
