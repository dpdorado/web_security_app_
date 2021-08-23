<template>
  <section class="section-margin">      
    <div class="container col-md-12">        
      <div class="card">
        <div class="card-header">               
          <h2><CIcon name="cil-list"/> <small>Paquetes de pruebas de penetración</small></h2>
          <p>Elije el paquete que se adapte a tu bolsillo y tus necesidades.</p>
        </div>
        <div class="card-body">            
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-10">
                <div class="demo">
                  <form class="form-search">
                    <div class="input-group">
                      <div class="input-group">                        
                        <input type="text" placeholder="Buscar paquete" class="form-control col-lg-9" v-model="name">                           
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
            <div class="col-md-3 col-lg-3 mb-3 mb-lg-0" v-for="(package_) in pageOfItems" v-bind:key="package_.id">              
              <div class="card text-center card-pricing border">
                <div class="card-pricing__header">
                  <h4>{{package_.name}}</h4>
                  <p>{{package_.description}}</p>                  
                  <h1 class="card-pricing__price"><span>$</span>{{package_.price}}</h1>
                </div>

                <ul class="card-pricing__list">                                      
                    <div  v-for="(attack_,index) in package_.attacks" v-bind:key="index" >                      
                      <li><em class="ti-check">{{'1. ' + attack_}}</em></li> 
                    </div>                    
                </ul>               
                
                <div class="card-pricing__footer">
                  <button v-on:click="addToCart(package_.service_id,package_.name)" class="button button-light"><em class="cil-cart"/> Añadir al carrito</button> 
                </div>
              </div>              
            </div>                        
          </div>
          <div class="card-footer row justify-content-end">
            <jw-pagination :items="search_packages" @changePage="onChangePage" :labels="customLabels"></jw-pagination>
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
  name: "PackagesClient",
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
      packages: [],
      count_attacks_search: 0,
      name: "",    
      attacks_aux: {},
    };
  },
  filters: {},
  computed: {
    ...Vuex.mapState("StorePackage", [
      "loading",
      "errored",
      "errors",
      "succed",
      "success",
    ]),
    ...Vuex.mapGetters("StorePackage", ["get_success"]),
    search_packages: function () {
      if (this.name == "") {
        return this.packages;
      } else {
         return this.packages.filter((package_) => package_.name.includes(this.name)); 
      }
    }
  },
  methods: {
    ...Vuex.mapActions('StorePackage',['package_aux']),
    viewCart(){
      this.$router.push('/home/shoppingcart')
    },   
    addToCart(id, name){
     const path = 'http://3.14.19.238:8000/shopping/shoppingCartAdd/';   
      let info = {
        "users": 1,
        "services": id
      };                         
      axios.post(path, info).then(response => {
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
      }).finally(() => this.loading_l=false)                 
    },  
    get_packages(){
      const path = 'http://3.14.19.238:8000/pentesting/package_list/'                
      axios.get(path).then(response => { 
          console.log(response);       
          this.packages = response.data;          
      }).catch(error => {
          console.log(error);  
          this.succed_l=false; 
          this.errored_l =true; 
          this.errors_l=[];
          this.errors_l.push({'message':'¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!'});                
      }).finally(() => this.loading_l=false);                                
    },
    get_attacks(attacks){      
      const path = 'http://3.14.19.238:8000/pentesting/attack_search/';
      let promises = [];
      for (let i = 0; i < attacks.length; i++) {
        promises.push(
          axios.get(path+attacks[i]).then(response => {
              this.attacks_aux.push(response.data['Attack'][0]);  
              console.log('ssss: '+ this.attacks_aux);
          }).catch(error => {         
              this.succed_l=false; 
              this.errored_l =true; 
              this.errors_l=[];
              this.errors_l.push({'message':'¡Ocurrio un error al cargar algúna pruab de penetración!!!'});                
          }).finally(() => this.loading_l=false)
        );
      }
      Promise.all(promises);      
      console.log('asdadas');
      console.log(this.attacks_aux);
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
    this.color_nav();
    this.set_errors();
    this.get_packages();    
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
