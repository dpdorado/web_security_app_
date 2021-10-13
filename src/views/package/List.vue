<template>
  <div>     
    <CCard>      
      <CCardHeader>
        <h1><CIcon name="cil-list"/> <small>Lista de paquetes de pruebas de penetración</small></h1>                            
      </CCardHeader>
      
      <CCardBody>        
          <div class="container-fluid">
            <div class="row">
                <div class="col-10">
                    <div class="demo">
                      <form class="form-search">
                        <div class="input-group">
                          <div class="input-group">                        
                            <input type="text" placeholder="Buscar paquete" class="form-control col-lg-9" v-model="name">                           
                            <div class="input-group-append">
                              <button  type="button" class="btn btn-primary"><CIcon name="cil-search"/></button>
                            </div>                                                                              
                          </div>
                        </div>
                      </form>
                    </div>                    
                </div>

                <div class="col">                    
                    <button id="btnAdd" v-on:click="create_package()" class="btn btn-success btn text-right"><CIcon name="cil-plus"/></button>                    
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
                    <th scope="col">Ataques</th>                  
                    <th scope="col">Estado</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
          
                <tbody>                  
                  <tr v-for="(package_,index) in pageOfItems" v-bind:key="package_.id">
                    <th scope="row">{{index+1}}</th>
                    <td>{{package_.name}}</td>
                    <td>{{package_.attacks.length}}</td>
                    <td>
                      <section v-if="package_.state"> 
                        <span class="badge badge-pill badge-primary">Activo</span>
                      </section>
                      <section v-else>
                          <span class="badge badge-pill badge-danger">Inactivo</span>
                      </section>                                              
                    </td>
                    <td>$ {{package_.price}}</td>
                    <td  class="">
                      <div class="btn-toolbar text-right">                        
                        <button  v-on:click="show_package(package_)" class="btn btn-success btn-sm mr-3"><CIcon name="cib-cassandra"/></button>                                            
                        <button  v-on:click="edit_package(package_)" class="btn btn-primary btn-sm mr-3"><CIcon name="cil-pencil"/></button>                                                                    
                        <button  v-on:click="darkModal = true, package_name_deleted = package_.name,package_id_deleted = package_.id" class="btn btn-danger  btn-sm"><CIcon name="cil-trash"/></button>                           
                      </div>                    
                    </td>
                  </tr>                  
                </tbody>                                
              </table>                                                         
          </CRow>    
           <div class="card-footer row justify-content-end">
            <jw-pagination :items="search_packages" @changePage="onChangePage" :labels="customLabels"></jw-pagination>
          </div>               
                            
         <CModal
          :show.sync="darkModal"
          :no-close-on-backdrop="true"
          :centered="true"
          title="Modal title 2"
          size="lg"
          color="dark"
            >
            Está seguro(a) de eliminar el paquete con de nombre: {{package_name_deleted}}
          <template #header>
            <h6 class="modal-title"><CIcon name="cil-trash"/> Eliminar ataque</h6>
            <CButtonClose @click="darkModal = false" class="text-white"/>
          </template>
          <template #footer>
            <CButton @click="darkModal = false" color="danger">Cancelar</CButton>
            <CButton v-on:click="remove_package()" color="success">Eliminar</CButton>
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
    name: 'Package_list', 
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
        package_name_deleted:'',
        package_id_deleted:'',         
        pageOfItems: [],
        customLabels,
        packages:[],
        count_attacks_search:0,
        name:'',                
        _config: {
          headers: { 
              Authorization: 'Bearer ' 
          }
        }
      }
    }, 
    filters: {      
    },
    computed:{
      ...Vuex.mapState('StorePackage',['loading', 'errored', 'errors', 'succed','success']),    
      ...Vuex.mapGetters('StorePackage', ['get_success']),
      search_packages: function () {       
        if (this.name==''){
          return this.packages;
        }else{                      
          return this.packages.filter((package_) => package_.name.includes(this.name));          
        }        
      }
    },
    methods: {
      ...Vuex.mapActions('StorePackage',['package_aux']),
      
      get_packages(){
        const path = this.$server+'/pentesting/package_list/'                
        axios.get(path, this._config).then(response => { 
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
      remove_package(){
          this.darkModal = false;
          const path = this.$server+'/pentesting/package_delete/'+this.package_id_deleted;
          axios.delete(path,this._config).then(response => {    
              console.log(response);   
              this.errored_l =false;
              this.succed_l=true;
              this.success_l=[];
              this.success_l.push({'message':'¡El paquete: '+this.package_name_deleted+' ha sido eliminado correctamente!!!'});
              this.get_packages();
          })
          .catch(error => {
            console.log(error);  
            this.succed_l=false; 
            this.errored_l =true; 
            this.errors_l=[];
            this.errors_l.push({'message': '¡No se ha podido eliminar el ataque: '+this.package_name_deleted+'!, intentelo más tarde.'});               
          })
          .finally(() => this.loading_l=false);            
      },
      /**
       * Editar ataque con id
       */
      edit_package(package_){
          this.package_aux(package_);
          this.$router.push({ path: '/package/edit/'+package_.id})
          //this.$router.push('/package/edit')
      },
        /**
       * Mostrar un ataque ataque con id
       */
      show_package(package_){
          this.package_aux(package_);
          this.$router.push({ path: '/package/show/'+package_.id })
          //this.$router.push('/package/edit')
      },
      /**
       * Editar ataque con id
       */
      create_package(){
          this.$router.push('/package/create')
          //this.$router.push('/package/edit')
      },
      onChangePage(pageOfItems) {
          // update page of items
          this.count_attacks_search = pageOfItems.length;
          this.pageOfItems = pageOfItems;
      },
      set_errors(){
        this.succed_l=this.succed;           
        this.success_l= this.succed_l?this.get_success:[];        
      }
    },
    mounted() {
              var config = localStorage.getItem('config');            
        this._config = JSON.parse(config);   
      this.set_errors();
      this.get_packages();
    }
  };  
</script>

<style scoped>
  td {    
    width: 300px;  
  }
  th{
    width: 200px;
  }
  

</style>
