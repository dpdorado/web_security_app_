<template>
  <div>     
    <CCard>      
      <CCardHeader>
        <h1><CIcon name="cil-list"/> <small>Lista de categorias de pruebas de penetración</small></h1>                            
      </CCardHeader>
      
      <CCardBody>        
          <div class="container-fluid" v-if="!create_category">
            <div class="row">
                <div class="col-10">
                    <div class="demo">
                      <form class="form-search">
                        <div class="input-group">                        
                            <input type="text" placeholder="Buscar categoria" class="form-control col-lg-9" v-model="name">                           
                            <div class="input-group-append">
                              <button  type="button" class="btn btn-primary"><CIcon name="cil-search"/></button>
                            </div>                                                                              
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
                                                <input  type="text" class="form-control" v-model="categor.category_name" id="category_name" name=category_name  placeholder="Nombre de la categoria">
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
                                                <textarea placeholder="Descripción de la categoria"  class="form-control overflow-auto" id="description" v-model="categor.description" name="description" rows="4" min="25" required></textarea>                    
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
                    <th scope="row">{{index+1}}</th> 
                    <td>
                      <div v-if = "index_edit != index">
                        <label @dblclick = "index_edit=-1"> {{category.category_name}} </label>
                      </div>
                      <input name="category_name" 
                        v-else-if = "index_edit == index" 
                        v-model = "category.category_name" 
                        v-on:blur= "item.edit=false;" 
                        @keyup.enter = "index_edit=-1; save_category(category)">
                    </td>
                    <td>
                      <div v-if = "index_edit != index">
                        <label @dblclick = "index_edit=-1"> {{category.description}} </label>
                      </div>
                      <input name="description" 
                        v-else-if = "index_edit == index" 
                        v-model = "category.description" 
                        v-on:blur= "item.edit=false;" 
                        @keyup.enter = "index_edit=-1; save_category(category)">
                    </td>                                                                                                  
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
                                <button  v-on:click="save_category(category)" class="btn btn-success btn-sm mr-3"><CIcon name="cil-check-alt"/></button>                                                                    
                                <button  v-on:click="cancel_edit()" class="btn btn-danger  btn-sm"><CIcon name="cil-x"/></button>                           
                            </div>
                        </div>                 

                        <div v-else>              
                            <div class="btn-toolbar text-right">                                                
                                <button  v-on:click="edit_category(index)" class="btn btn-primary btn-sm mr-3"><CIcon name="cil-pencil"/></button>                                                                    
                                <button  @click="darkModal = true, category_deleted = category" class="btn btn-danger  btn-sm"><CIcon name="cil-trash"/></button>                           
                            </div>                    
                        </div>                        
                    </td>
                  </tr>                  
                </tbody>                                
              </table>   

          </CRow>    
           <div class="card-footer row justify-content-end">
            <jw-pagination :items="search_categories" @changePage="onChangePage" :labels="customLabels"></jw-pagination>
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
            <CButton v-on:click="remove_category()" color="success">Eliminar</CButton>
          </template>
        </CModal>           
      </CCardBody>
       
    </CCard>    
  </div>               
</template>>

<script>
  import axios from "axios";
  //import Vuex from 'vuex';

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
        create_category: false,
        count_attacks_search:0,
        name:'',        
        _config: {
          headers: { 
              Authorization: 'Bearer ' 
          }
        }
        /*categories_prueba:[
          {
            id: 1,
            category_name: 'Categoria 1',
            state: true,    
            description: 'Categoria 1'                            

          },
          {
            id: 2,
            category_name: 'Categoria 2',
            state: true,    
            description: 'Categoria 2'                            

          },
          {
            id: 3,
            category_name: 'Categoria 3',
            state: true,    
            description: 'Categoria 3'                            

          },
        ]*/
      }
    }, 
    filters: {      
    },
    computed:{    
      search_categories: function () {       
        if (this.name==''){
          return this.categories;
        }else{                      
          return this.categories.filter((category) => category.category_name.includes(this.name));          
        }        
      }       
    },
    methods: {
      //...Vuex.mapActions('StoreAttack',['get_attacks', 'remove_attack','attack_aux']),
      clean_form(){
        this.categor.category_name='';
        this.categor.state=false;
        this.categor.description='';
      },
      send_form(e){          
          e.preventDefault();          

          axios.post(this.$server+'/pentesting/category_create/', this.categor,this._config)
          .then(response => {
              console.log(response)
              this.succed=true;
              this.success = [];    
              this.success.push({'message': 'La categoría:'+this.categor.category_name+' ha sido registrada correctamente.'});
              this.create_category= false;
              this.clean_form();
              this.get_categories()
          })
          .catch(error => {              
              console.log(error);                
              this.errored = true;
              this.errors = [];
              this.errors.push({'message':'No se ha podido realizar el registro, revise que la categoría no exista.'})            
          })
          .finally(() => this.loading = false);                           
      },
      get_categories(){
            const path = this.$server+'/pentesting/category_list/';                
            axios.get(path, this._config).then(response => {
                console.log(response);   
                this.categories = response.data;                            
            }).catch(error => {
                console.log(error);     
                this.errored= true;
                this.errors = [];
                this.errors.push({'message':'¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!'});                
            }).finally(() => this.loading = false);               
        },

      remove_category(){        
        this.darkModal = false;
        const path = this.$server+'/pentesting/category_delete/'+this.category_deleted.id;
        axios.delete(path, this._config).then(response => {                           
            console.log(response);   
            this.succed = true;
            this.success=[];
            this.success.push({'message':'¡La categoría '+this.category_deleted.category_name+' ha sido eliminada!'})
            this.get_categories();
        })
        .catch(error => {
            console.log(error); 
            this.succed = false;
            //this.get_categories();
            this.errored= true;
            this.errors=[];
            this.errors.push({'message':'¡La categoría no se ha podido eliminar, Intentelo más tarde o contacte con el administrador!!!'});                
            
        })
        .finally(() => this.loading = false);
      },      
      edit_category(index){    
          this.delete_errores_and_success();                    
          this.index_edit=index;             
      },
      save_category(category){       
        this.index_edit=-1;        
        axios.put(this.$server+'/pentesting/category_update/'+category.id, category, this._config)
          .then(response => {
              console.log(response); 
              this.succed  = true;
              this.errored = false;
              this.success = [];
              this.success.push({'message':'La categoria: '+category.category_name+' ha sido actualizada correctamente.'});                                       
              //this.$router.push('/category/list');
          })
          .catch(error => {
              console.log(error); 
              this.succed=false;             
              this.errored = true;
              this.errors = [];
              this.errors.push({'message':'No se ha podido actualizar la categoria, revise que los datos eran correctos.'})            
        })
        .finally(() => this.loading = false);  
      },
      cancel_edit(){
          this.index_edit=-1;          
      },      
      cancel_create(){
          this.create_category=false;
          this.clean_form();
      },                 
      create_category_(){          
          this.delete_errores_and_success();
          this.create_category = true;
      },
      delete_errores_and_success(){
        this.errored = false;
        this.succed=false;
      }
      ,
      onChangePage(pageOfItems) {
          // update page of items
          this.count_attacks_search = pageOfItems.length;
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
      var config = localStorage.getItem('config');            
      this._config = JSON.parse(config);    
      this.get_categories()
    }
  };  
</script>

<style scoped>
    .red{        
        color:red;
    }
    td {    
      width: 300px;  
    }
    th{
      width: 200px;
    }

</style>
