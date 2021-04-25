<template>
  <div>     
    <CCard>      
      <CCardHeader>
        <h1><CIcon name="cil-list"/> <small>Lista de ataques informáticos</small></h1>                            
      </CCardHeader>
      
      <CCardBody >        
          <div class="container-fluid">
            <div class="row">
                <div class="col-10">
                    <div class="demo">
                      <form class="form-search">
                        <div class="input-group">
                          <input id="txtName" type="text" placeholder="Attack to search" class="form-control col-12 col-m-6 col-lg-8 mb-2 mr-sm-2 mb-sm-0" />                                         
                          <button class="btn btn-primary"><CIcon name="cil-search"/></button>
                        </div>
                      </form>
                    </div>                    
                </div>

                <div class="col">                    
                    <button id="btnAdd" v-on:click="create_attack()" class="btn btn-success btn text-right"><CIcon name="cil-plus"/></button>                    
                </div>
            </div>            
        </div>    

        <div class="row" style="margin-top: 10px">
          <div class="col-12">
              <table id="grid"></table>
          </div>
        </div>                
                  
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
      

          <CRow>               
            <div  class="table-responsive"></div>
              <table class="table table-striped">
                <thead class="thead-dark">
                  <tr >
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>                    
                    <th scope="col">Id Owasp</th>
                    <th scope="col">Precio ($)</th>                  
                    <th scope="col">Opciones</th>                  
                    <!--<th colspan = 2>Opciones</th>-->
                  </tr>
                </thead>
          
                <tbody>                  
                  <tr v-for="(attack,index) in pageOfItems" v-bind:key="attack.id">
                    <th scope="row">{{index+1}}</th>
                    <td>{{attack.name}}</td>
                    <td>{{attack.owas_id}}</td>                    
                    <td>$ {{attack.price}}</td>                    
                    <td  class="">
                      <div class="btn-toolbar text-right">                        
                        <button  v-on:click="show_attack(attack)" class="btn btn-success btn-sm mr-3"><CIcon name="cib-cassandra"/></button>                                            
                        <button  v-on:click="edit_attack(attack)" class="btn btn-primary btn-sm mr-3"><CIcon name="cil-pencil"/></button>                                                                    
                        <button  v-on:click="darkModal = true, attack_name_deleted = attack.name,attack_id_deleted = attack.id" class="btn btn-danger  btn-sm"><CIcon name="cil-trash"/></button>                           
                      </div>                    
                    </td>
                  </tr>                  
                </tbody>                                
              </table>                                                         
          </CRow>    
           <div class="card-footer row justify-content-end">
            <jw-pagination :items="attacks" @changePage="onChangePage" :labels="customLabels"></jw-pagination>
          </div>               
                            
         <CModal
          :show.sync="darkModal"
          :no-close-on-backdrop="true"
          :centered="true"
          title="Modal title 2"
          size="lg"
          color="dark"
            >
            Está seguro(a) de eliminar el ataque con de nombre: {{attack_name_deleted}}
          <template #header>
            <h6 class="modal-title"><CIcon name="cil-trash"/> Eliminar ataque</h6>
            <CButtonClose @click="darkModal = false" class="text-white"/>
          </template>
          <template #footer>
            <CButton @click="darkModal = false" color="danger">Cancelar</CButton>
            <CButton v-on:click="remove_attack()" color="success">Eliminar</CButton>
          </template>
        </CModal>           
      </CCardBody>
       
    </CCard>    
  </div>               
</template>>

<script>
  import axios from "axios";
  import Vuex from 'vuex';

  const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
  };

  export default {
    name: 'Attack_list', 
    components: {   
    },  
    data () {
      return {       
        errored_l: false,
        errors_l: [],
        succed_l: true,
        success_l: [],      
        loading_l: false,                             
        darkModal: false,
        attack_name_deleted:'',
        attack_id_deleted:-1,         
        pageOfItems: [],
        customLabels,
        attacks:[]
      }
    }, 
    filters: {      
    },
    computed:{
      ...Vuex.mapState('StoreAttack',['errored', 'errors', 'succed','success']),    
      ...Vuex.mapGetters('StoreAttack', ['get_success'])
    },
    methods: {
      //...Vuex.mapActions('StoreAttack',['get_attacks', 'remove_attack','attack_aux','edit_loading']),
      ...Vuex.mapActions('StoreAttack',['edit_attacks','attack_aux']),
      
      get_attacks(){
        const path = 'http://3.14.19.238:8000/pentesting/attack_list/';                
        axios.get(path).then(response => {      
            console.log(response);  
            this.attacks = response.data;
            this.edit_attacks(this.attacks);                
        }).catch(error => {
            console.log(error);  
            this.succed_l=false; 
            this.errored_l =true; 
            this.errors_l=[];
            this.errors_l.push({'message':'¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!'});                
        }).finally(() => this.loading_l=false);                                
      },
      remove_attack(){
          this.darkModal = false;
          const path = 'http://3.14.19.238:8000/pentesting/attack_delete/'+this.attack_id_deleted;
          axios.delete(path).then(response => {    
              console.log(response);   
              this.errored_l =false;
              this.succed_l=true;
              this.success_l=[];
              this.success_l.push({'message':'¡El attaque: '+this.attack_name_deleted+' ha sido eliminado correctamente!!!'});
              this.get_attacks();
          })
          .catch(error => {
            console.log(error);  
            this.succed_l=false; 
            this.errored_l =true; 
            this.errors_l=[];
            this.errors_l.push({'message': '¡No se ha podido eliminar el ataque: '+this.attack_name_deleted+'!, intentelo más tarde.'});               
          })
          .finally(() => this.loading_l=false);            
      },
      /**
       * Editar ataque con id
       */
      edit_attack(attack){
          this.attack_aux(attack);
          this.$router.push({ path: '/attack/edit/'+attack.id})          
      },
        /**
       * Mostrar un ataque ataque con id
       */
      show_attack(attack){
          this.attack_aux(attack);
          this.$router.push({ path: '/attack/show/'+attack.id })
          //this.$router.push('/attack/edit')
      },
      /**
       * Editar ataque con id
       */
      create_attack(){
          this.$router.push('/attack/create')
          //this.$router.push('/attack/edit')
      },
      onChangePage(pageOfItems) {
          // update page of items
          this.pageOfItems = pageOfItems;
      },
      set_errors(){
        this.succed_l=this.succed;           
        this.success_l= this.succed_l?this.get_success:[];        
      }
    },
    mounted() {    
      this.set_errors();       
      this.get_attacks();        
    }
  };  
</script>

<style scoped>


</style>



