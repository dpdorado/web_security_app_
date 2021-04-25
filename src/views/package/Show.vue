<template>
  <div>
    <CCard>      
      <CCardHeader class ="">        
        <div class="row">
          <div class="col-10">
            <h1><CIcon name="cil-pencil"/> <small>Editar ataque </small></h1>            
          </div>
          <div class="col">
            <button id="btnList" v-on:click="list_package()" class="btn btn-primary btn text-right"><CIcon name="cil-list"/></button>                                            
          </div>            
        </div>                  
      </CCardHeader>
      

      <CCardBody>      
          <div>          
                <!--<div style="height: 30px;"></div>-->
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                        <div class="card shadow-lg p-3 mb-5 bg-white border-0">
                            <div class="card-header bg-dark text-white">Formulario de edición</div>                                
                                <div class="card-body">
                                    <form >
                                       <section v-if="errored">
                                        <div v-for="(err,index) in errors" v-bind:key="index">
                                            <div class="alert alert-danger" role="alert">
                                                {{err.message}}
                                            </div>    
                                        </div>
                                    </section>                 
                                        
                                        <div class="form-row">                                    
                                            <div class="col-md-6 mb-3">                    
                                                <label for="name" >Nombre:</label>
                                                <input  type="text" class="form-control" :value="package_.name" id="name" name=name disabled>
                                            </div>
                                              
                                        
                                            <div class="col mb-3">
                                                <label for="state">Estado:</label>       
                                                <input placeholder="Package state" type="text" class="form-control overflow-auto" id="state" name=state :value="state"  disabled>
                                            </div>                                                                                   
                                        </div>                                        
                                        
                                        <div class="form-row">                                    
                                          <div class="col mb-3">                    
                                              <label for="price" >Precio ($): </label>
                                              <input placeholder="Package price" type="text" class="form-control overflow-auto" id="price" name=price :value="package_.price"  disabled>
                                          </div>                                                                                                                                                                                                       
                                        </div>    

                                       <div class="form-row ">
                                            <div class="col mb-3">
                                                <label for="description">Descripción:</label>
                                                <textarea placeholder="package description"  class="form-control overflow-auto" id="description" :value="package_.description" name="description" rows="4" min="25" disabled></textarea>                    
                                            </div>
                                        </div>
                                         
                                        <div class="form-row">                                           
                                            <label for="">Lista de ataques:</label>
                                            <div class="table-responsive">
                                                <div class="tam_table overflow-auto">
                                                    <table class="table table-striped">
                                                        <thead class="thead-dark">
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Nombre</th>  
                                                                <th scope="col">Descripción</th>  
                                                                <th scope="col">Id Owasd</th>  

                                                            </tr>
                                                        </thead>
                                                        <tbody >
                                                            <tr v-for="(attack_,index) in attacks_sel" v-bind:key="index">                    
                                                                <th scope="row"> {{index+1}}</th>
                                                                <td>{{attack_.name}}</td>
                                                                <td>{{attack_.description}}</td>
                                                                <td>{{attack_.owas_id}}</td>     
                                                            </tr>                                                                                                                        
                                                        </tbody>
                                                    </table>
                                                </div>                    
                                            </div>                                                                                                               
                                        </div>                                                                                                                       
                                    </form>
                                </div>   
                            </div>   
                        </div>   
                    </div>
                </div>       
            </div>                          

      </CCardBody>
    </CCard>            
  </div>
    
</template>>

<script>
  //import axios from "axios";
  import Vuex from 'vuex';


  export default {
    name: 'Package_show',   
    data () {
      return {
          errored: false,
          loading: true,
          errors: [],                 
          succed: false,
          package_o:{
            id: -1,
            name: '',
            state: false,    
            description: '',
            attacks:[

            ]                                  
        },
        attacks_sel:[],
        state :'',
      }
    }, 
    filters: {      
    },
    computed:{
        ...Vuex.mapState('StorePackage',['package_']),     
        ...Vuex.mapState('StoreAttack',['attacks'])
    },
    methods: {      
        ...Vuex.mapActions('StoreAttack',['get_attacks']),
        set_state(){
            if (this.package_.state){
                this.state = 'Activo'
            }else{
                this.state = 'Inactivo'
            }
        },
        list_package(){
            this.$router.push('/package/list');
        },          
        set_attacks_sel(){         
            var id =-1;               
            for(var i=0; i<this.package_o.attacks.length;i++){
                id = this.package_o.attacks[i];                                                             
                for(var j=0;j<this.attacks.length;j++){                                        
                    if (id==this.attacks[j].id){                        
                        this.attacks_sel.push(this.attacks[j]);                         
                    }
                }
            }                  
        }
    }, 
    mounted() {
      this.package_o = this.package_;    
      this.get_attacks();
      this.set_attacks_sel();
      this.set_state();
    }
  };  
</script>

<style scoped>
    .red{        
        color:red;
    }
    .tam_table{
        max-height: 600px;
    }
    
</style>