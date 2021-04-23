<template>
  <div>     
    <CCard>      
      <CCardHeader>
        <h1><CIcon name="cil-list"/> <small>Lista de categorias de ataques informáticos</small></h1>                            
      </CCardHeader>
      
      <CCardBody>        
          <div class="container-fluid" v-if="!create_category">
            <div class="row">
                <div class="col-10">
                    <div class="demo">
                      <form class="form-search">
                        <div class="input-group">
                          <input id="txtName" type="text" placeholder="Category to search" class="form-control col-12 col-m-6 col-lg-8 mb-2 mr-sm-2 mb-sm-0" />                                         
                          <button class="btn btn-primary"><CIcon name="cil-search"/></button>
                        </div>
                      </form>
                    </div>                    
                </div>

                <div class="col" >                    
                    <button id="btnAdd" v-on:click="create_category_()" class="btn btn-success btn text-right"><CIcon name="cil-plus"/></button>                    
                </div>
            </div>            
        </div>    

        <div class="row" style="margin-top: 10px">
          <div class="col-12">
              <table id="grid"></table>
          </div>
        </div>                
        
        <section v-if="errored">
          <div v-for="(err,index) in errors" v-bind:key="index">
            <div class="alert alert-danger" role="alert">
                {{err.message}}
            </div>    
          </div>
        </section>                 

        <section v-else>              
           <section v-if="succed">
            <div v-for="(succ,index) in success" v-bind:key="index">
              <div class="alert alert-success" role="alert">
                  {{succ.message}}
              </div>    
            </div>
            </section> 
        </section>  

        <div v-if="create_category">
              <div>          
                <!--<div style="height: 30px;"></div>-->
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                        <div class="card shadow-lg p-3 mb-5 bg-white border-0">
                            <div class="card-header bg-dark text-white">Formulario de registro</div>                                  
                                <div class="card-body">
                                    <form ref="f_" v-on:submit.prevent="send_form">                                         
                                        
                                        <div class="form-row">                                    
                                            <div class="col-md-6 mb-3">                    
                                                <label for="category_name" >Nombre:<span class="red">*</span></label>
                                                <input  type="text" class="form-control" v-model="categor.category_name" id="category_name" name=category_name  placeholder="Category name" required >
                                            </div>
                                              
                                        
                                            <div class="col mb-3">
                                                <label for="state">Estado:<span class="red">*</span></label>                                     
                                                
                                                <select class="custom-select" id="state" v-model="categor.state" name="state" required>                       
                                                    <option selected="true" :value="false">Inactivo</option>           
                                                    <option :value="true">Activo</option>           
                                                </select>
                                            </div>                                                                             
                                        </div>                                                                              

                                       <div class="form-row ">
                                            <div class="col mb-3">
                                                <label for="description">Descripción:<span class="red">*</span></label>
                                                <textarea placeholder="Category description"  class="form-control overflow-auto" id="description" v-model="categor.description" name="description" rows="4" min="25" required></textarea>                    
                                            </div>
                                        </div>
                                                                           
                                        <div class="form-row">                       
                                            <button class="col-0 btn btn-primary mr-3 mb-3" type="submit" name="submit">Guardar</button>
                                            <button class="col-0 btn btn-danger mb-3" v-on:click="cancel_create()" type="reset" name="reset">Cancelar</button>                              
                                        </div>                  
                                    </form>
                                </div>   
                            </div>   
                        </div>   
                    </div>
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
                    <th scope="col">Descripción</th>                  
                    <th scope="col">Estado</th> 
                    <th scope="col">Opciones</th>                                     
                  </tr>
                </thead>
          
                <tbody >                  
                  <tr v-for="(category,index) in pageOfItems" v-bind:key="category.id">                    
                    <th scope="row"> {{index+1}}</th>
                    <td>{{category.category_name}}</td>
                    <td>{{category.description}}</td>                                              
                    <td>                        
                        <section v-if="category.state"> 
                            <span class="badge badge-pill badge-primary">Activo</span>
                        </section>
                        <section v-else>
                            <span class="badge badge-pill badge-danger">Inactivo</span>
                        </section>                        
                    </td>                
                  
                    <td>
                        <div v-if="index_edit== index">
                            <div class="btn-toolbar text-right">                                                
                                <button  v-on:click="save_category(category, index)" class="btn btn-success btn-sm mr-3"><CIcon name="cil-check-alt"/></button>                                                                    
                                <button  v-on:click="cancel_edit()" class="btn btn-danger  btn-sm"><CIcon name="cil-x"/></button>                           
                            </div>
                        </div>                 

                        <div v-else>              
                            <div class="btn-toolbar text-right">                                                
                                <button  v-on:click="edit_category(category, index)" class="btn btn-primary btn-sm mr-3"><CIcon name="cil-pencil"/></button>                                                                    
                                <button  @click="darkModal = true, category_deleted = category" class="btn btn-danger  btn-sm"><CIcon name="cil-trash"/></button>                           
                            </div>                    
                        </div>                        
                    </td>
                  </tr>                  
                </tbody>                                
              </table>   

          </CRow>    
           <div class="card-footer row justify-content-end">
            <jw-pagination :items="categories" @changePage="onChangePage" :labels="customLabels"></jw-pagination>
          </div>               
                             
         <CModal
          :show.sync="darkModal"
          :no-close-on-backdrop="true"
          :centered="true"
          title="Modal title 2"
          size="lg"
          color="dark"
            >
            Está seguro(a) de eliminar la categoría de nombre: {{category_deleted.category_name}}, si elimina esta categoría se borrarán los ataques asociados a ella.
          <template #header>
            <h6 class="modal-title"><CIcon name="cil-trash"/> Eliminar categoria</h6>
            <CButtonClose @click="darkModal = false" class="text-white"/>
          </template>
          <template #footer>
            <CButton @click="darkModal = false" color="danger">Cancelar</CButton>
            <CButton v-on:click="delete_category()" color="success">Eliminar</CButton>
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
    name: 'Category_list', 
    components: {   
    },  
    data () {
      return {    
        categories : [],
        loading: false,
        errored: false,
        errors: [],
        succed: true,
        success: [],                                   
        darkModal: false,
        category_deleted:'',         
        pageOfItems: [],
        customLabels,    
        selectedUser: null,
        index_edit: -1,
        categor:{
            category_name: '',
            state: false,    
            description: ''                            
        },
        create_category: false
      }
    }, 
    filters: {      
    },
    computed:{           
    },
    methods: {
      //...Vuex.mapActions('StoreAttack',['get_attacks', 'remove_attack','attack_aux']),
        send_form(e){
            e.preventDefault();          

            axios.post('http://3.14.19.238:8000/pentesting/category_create/', this.categor)
            .then(response => {
                //console.log(response)
                this.succed=true;
                this.success = [];    
                this.success.push({'message': 'La categoría:'+this.categor.category_name+' ha sido registrada correctamente.'});
                this.create_category= false;
                this.get_categories()
            })
            .catch(error => {
                //Mirar los errores que esta devolviendo
                console.log(error);
                
                this.errored = true;
                this.errors = [];
                this.errors.push({'message':'No se ha podido realizar el registro, revise que la categoría no exista.'})            
            })
            .finally(() => this.loading = false);                           
        },
      get_categories(){
            const path = 'http://3.14.19.238:8000/pentesting/category_list/';                
            axios.get(path).then(response => {    
                //console.log(response);   
                this.categories = response.data;                            
            }).catch(error => {
                console.log(error);     
                this.errored= true;
                this.errors=[];
                this.errors.push({'message':'¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!'});                
            }).finally(() => this.loading = false);               
        },

      delete_category(){        
        this.darkModal = false;
        const path = 'http://3.14.19.238:8000/pentesting/category_delete/'+this.category_deleted.id;
        axios.delete(path).then(response => {                           
            this.succed = true;
            this.success=[];
            this.success.push({'message':'¡La categoría '+this.category_deleted.category_name+' ha sido eliminada!'})
            this.get_categories();
        })
        .catch(error => {
             this.succed = false;
            this.get_categories();
            this.errored= true;
            this.errors=[];
            this.errors.push({'message':'¡La categoría no se ha podido eliminar, Intentelo más tarde o contacte con el administrador!!!'});                
            
        })
        .finally(() => this.loading = false);
      },
      /**
       * Editar ataque con id
       */
      edit_category(category, index){
          this.index_edit=index;
          console.log('la tenemos');
          /*this.attack_aux(attack);
          this.$router.push({ path: '/attack/edit/'+attack.id})*/
          //this.$router.push('/attack/edit')
      },
      save_category(category){
        this.index_edit=-1;
      },
      cancel_edit(){
          this.index_edit=-1;
      },      
      cancel_create(){
          this.create_category=false;
          this.$f_.reset();
      },   
        /**
       * Mostrar un ataque ataque con id
       */
      show_category(category){
          /*this.attack_aux(attack);
          this.$router.push({ path: '/attack/show/'+attack.id })*/
          //this.$router.push('/attack/edit')
      },
      /**
       * Editar ataque con id
       */
      create_category_(){
          this.create_category = true;
      },
      onChangePage(pageOfItems) {
          // update page of items
          this.pageOfItems = pageOfItems;
      },
      getBadge (state) {
        var status = state ? 'Active':'Inactive';
        console.log(status);  
        return status === 'Active' ? 'success'
            : status === 'Inactive' ? 'secondary'
            : status === 'Pending' ? 'warning'
                : status === 'Banned' ? 'danger' : 'primary'
        }
    },
    mounted() {
      this.get_categories()
    }
  };  
</script>

<style scoped>
    .red{        
        color:red;
    }

</style>
