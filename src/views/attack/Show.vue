<template>
  <div>
    <CCard>      
      <CCardHeader class ="">
        <div class="row">
          <div class="col-10">
            <h1><CIcon name="cib-cassandra"/> <small>Vista de ataque </small></h1>    
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
                          <div class="card-header bg-dark text-white">Descripción de ataque</div>                                
                              <div class="card-body ">
                                  <form >
                                      <section v-if="errored">
                                      <div v-for="(err,index) in errors" v-bind:key="index">
                                          <div class="alert alert-danger" role="alert">
                                              {{err.message}}
                                          </div>    
                                      </div>
                                  </section>  
                                                                                        
                                      <div class="form-row">                                    
                                          <div class="col mb-3">                    
                                              <label for="name" >Nombre: </label>
                                              <input placeholder="Attack name" type="text" class="form-control overflow-auto" id="name" name=name :value="attack.name"  disabled>
                                          </div>                                                                                                                                                                                                       
                                      </div>                                                                            
                                        <div class="form-row">                                    

                                          <div class="col-md-6 mb-3">
                                            <label for="category_id">Id de categoria:</label>                                     
                                            <input placeholder="Attack category id" type="text" class="form-control overflow-auto" id="category_id" name=category_id :value="category.id"  disabled>                                              
                                          </div>    


                                          <div class="col-md-6 mb-3">
                                            <label for="category_name">Nombre de categoria:</label>                                     
                                            <input placeholder="Attack category name" type="text" class="form-control overflow-auto" id="category_name" name=category_name :value="category.category_name"  disabled>                                              
                                          </div>                                                
                                        </div>                               

                                        <div class="form-row">
                                            <div class="col mb-3">
                                              <label for="category_description">Descripción de categoria:</label>                                                                                 
                                              <textarea placeholder="Attack category _description"  class="form-control overflow-auto" id="category_description"  :value="category.description" name="category_description" rows="4" min="25" disabled></textarea>
                                            </div>
                                          </div>                                                                               
                                      
                                      
                                      <div class="form-row">                                            
                                          <div class="col mb-3">
                                              <label for="state">Estado:</label>                                                                                   
                                              <input placeholder="Attack state" type="text" class="form-control overflow-auto" id="state" name=state :value="state"  disabled>                                              
                                          </div>                                            
                                          
                                          <div class="col mb-3">
                                              <label for="owas_id">Id Owasd:<span class="red">*</span></label>
                                              <input placeholder="Id Owasd of the attack"  type="text" class="form-control overflow-auto" :value="attack.owas_id" id="owas_id" name="owas_id" disabled>
                                          </div>                                        
                                      </div>

                                      <div class="form-row ">
                                          <div class="col mb-3">
                                              <label for="description">Descripción:<span class="red">*</span></label>
                                              <textarea placeholder="Attack description"  class="form-control overflow-auto" id="description"  :value="attack.description" name="description" rows="4" min="25" disabled></textarea>  
                                          </div>
                                      </div>

                                      <div class="form-row ">
                                          <div class="col mb-3">
                                              <label for="script">Script:<span class="red">*</span></label>
                                              <textarea placeholder="Script of the attack" class="form-control overflow-auto" id="script" :value="attack.script" name="script" rows="10" min="25" disabled></textarea>             
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
  import axios from "axios";
  import Vuex from 'vuex';
  export default {
    name: 'Attack_show',   
    data () {
      return {
        state :'',  
        errored: false,
        loading: true,
        errors: [],
        category:{
          id: -1,
          state:false,
          category_name: '',
          description: ''
        }
      }
    }, 
    filters: {      
    },
    computed:{
      ...Vuex.mapState('StoreAttack',['attack']),   
      ...Vuex.mapGetters('StoreAttack', ['get_success'])  
    },
    methods: {
      get_category(){
        const path = 'http://3.14.19.238:8000/pentesting/category_search/'+this.attack.category;          
        
        axios.get(path).then(response => {   
          //console.log(response.data["Category"][0]);             
          this.category = response.data["Category"][0];
        })
        .catch(error => {
          //console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
      },
      set_state(){
        if (this.attack.state){
          this.state = 'Activo'
        }else{
          this.state = 'Inactivo'
        }
      },
      list_attack(){
        this.$router.push('/attack/list');
      }
    },         
    mounted() {
      this.attack_o = this.attack;      
      this.get_category();
      this.set_state();
    }
  };  
</script>

<style scoped>
  .margin_auto{
    margin: auto;
  }

</style>