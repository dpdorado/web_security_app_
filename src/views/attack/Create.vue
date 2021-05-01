<template>
    <div>
    <CCard>      
      <CCardHeader class ="">        
        <div class="row">
          <div class="col-10">
            <h1><CIcon name="cil-plus"/> <small>Registrar prueba de penetración </small></h1>       
          </div>
          <div class="col">
            <button id="btnList" v-on:click="list_attack()" class="btn btn-primary btn text-right"><CIcon name="cil-list"/></button>                                            
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
                            <div class="card-header bg-dark text-white">Formulario de registro</div>                                
                                <div class="card-body">
                                    <form v-on:submit.prevent="send_form">
                                       <section v-if="errored">
                                        <div v-for="(err,index) in errors" v-bind:key="index">
                                            <div class="alert alert-danger" role="alert">
                                                {{err.message}}
                                            </div>    
                                        </div>
                                    </section>                 
                                        
                                        <div class="form-row">                                    
                                            <div class="col-md-6 mb-3">                    
                                                <label for="name" >Nombre:<span class="red">*</span></label>
                                                <input  type="text" class="form-control" v-model="attack.name" id="name" name=name  placeholder="Nombre de la prueba" required >
                                            </div>
                                              
                                        
                                            <div class="col-md-6 mb-3">
                                                <label for="category">Categoria:<span class="red">*</span></label>                                     
                                                
                                                <select class="custom-select" id="category" v-model="attack.category" name="category" required>                       
                                                    <option selected="true" v-for="category in categories"  v-bind:key="category.id" :value="category.id">{{category.category_name}}</option>           
                                                </select>
                                            </div>                                                                               
                                        </div>
                                        
                                        <div class="form-row">                                            
                                            <div class="col mb-3">
                                                <label for="state">Estado:<span class="red">*</span></label>                                     
                                                
                                                <select class="custom-select" id="state" v-model="attack.state" name="state" required>                       
                                                    <option selected="true" :value="false">Inactivo</option>           
                                                    <option :value="true">Activo</option>           
                                                </select>
                                            </div>                                            
                                            
                                            <div class="col mb-3">
                                                <label for="owas_id">Id Owasd:<span class="red">*</span></label>
                                                <input placeholder="Id Owasd de la prueba"  type="text" class="form-control" v-model="attack.owas_id" id="owas_id" name="owas_id" required>
                                            </div>                                        
                                        </div>

                                        <div class="form-row">                                                                                                                                    
                                            <div class="col mb-3">
                                                <label for="price">Precio ($):<span class="red">*</span></label>
                                                <input placeholder="Precio de la prueba"  type="text" class="form-control" v-model="attack.price" id="price" name="price" required>
                                            </div>                                        
                                        </div>

                                       <div class="form-row ">
                                            <div class="col mb-3">
                                                <label for="description">Descripción:<span class="red">*</span></label>
                                                <textarea placeholder="Descripción de la prueba"  class="form-control overflow-auto" id="description" v-model="attack.description" name="description" rows="4" min="25" required></textarea>                    
                                            </div>
                                        </div>

                                        <div class="form-row ">
                                            <div class="col mb-3">
                                                <label for="script">Script:<span class="red">*</span></label>
                                                <textarea placeholder="Script de la prueba" class="form-control overflow-auto" id="script" v-model="attack.script" name="script" rows="10" min="25" required></textarea>             
                                            </div>
                                        </div>      

                                       <!-- <div class="form-group">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                                                <label class="form-check-label" for="invalidCheck">Acepto términos y condiciones</label>
                                                <div class="valid-feedback">¡Aceptado!</div>
                                            </div>
                                        </div>-->
                                    
                                        <div class="form-row">                       
                                            <button class="btn btn-primary mr-3 mb-3" type="submit" name="submit">Guardar</button>
                                            <button class="btn btn-success mb-3" type="reset" name="reset">Limpiar</button>
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
  import axios from "axios";
  import Vuex from 'vuex';

  export default {
    name: 'Attack_create',   
    data() {
        return{            
            errored: false,
            loading: true,
            errors: [],
            categories: null,
            attack:{
                name: '',
                state: false,    
                description: '',
                owas_id: '',
                script: '',
                category: ''                                    
            },           
        }
    },    
    methods:{       
        ...Vuex.mapActions('StoreAttack',['add_message_success']),
        get_categories(){
            const path = 'http://3.14.19.238:8000/pentesting/category_list/';          
          
          axios.get(path).then(response => {      
            console.log(response)
            this.categories = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
        },
        send_form(e){
            e.preventDefault();                      
            axios.post('http://3.14.19.238:8000/pentesting/attack_create/', this.attack)
            .then(response => {
                console.log(response);  
                this.add_message_success({'message':'La prueba de penetración: '+this.attack.name+' ha sido registrada correctamente.'});                  
                this.$router.push('/attack/list');
            })
            .catch(error => {        
                console.log(error);                      
                this.errored = true;
                this.errors = [];
                this.errors.push({'message':'No se ha podido realizar el registro, revise que el id owasd o el nombre no este repetidos.'})            
          })
          .finally(() => this.loading = false);
                                       
        },
        list_attack(){
            this.$router.push('/attack/list');
        } 
    },
    mounted() {
      this.get_categories()      
    },    
  };  
</script>

<style scoped>
    .red{        
        color:red;
    }
    
</style>

