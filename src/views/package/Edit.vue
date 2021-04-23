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
                                                <input  type="text" class="form-control" v-model="package_o.name" value="package.name" id="name" name=name  placeholder="package name" required >
                                            </div>
                                              
                                        
                                            <div class="col mb-3">
                                                <label for="state">Estado:<span class="red">*</span></label>                                                                                     
                                                <select class="custom-select" id="state" v-model="package_o.state" name="state" required>        
                                                    <option selected="true" value="package.state">
                                                    <section v-if="package_.state"> Activo
                                                    </section>
                                                    <section v-else>Inactivo
                                                    </section>
                                                  </option>               
                                                    <option selected="true" :value="false">Inactivo</option>           
                                                    <option :value="true">Activo</option>           
                                                </select>
                                            </div>                                                                                   
                                        </div>                                        

                                       <div class="form-row ">
                                            <div class="col mb-3">
                                                <label for="description">Descripción:<span class="red">*</span></label>
                                                <textarea placeholder="package description"  class="form-control overflow-auto" id="description" v-model="package_o.description" value="package_.description" name="description" rows="4" min="25" required></textarea>                    
                                            </div>
                                        </div>
                                         
                                        <div class="row">
                                            <div class="col-6">
                                                <label for="">Ataques seleccionados:</label>
                                                <div class="tam_table overflow-auto">
                                                    <table class="table table-striped">
                                                        <thead class="thead-dark">
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Nombre</th>                                                                                    
                                                            </tr>
                                                        </thead>
                                                        <tbody >
                                                            <tr v-for="(attack_,index) in attacks_sel" v-bind:key="index">                    
                                                                <th scope="row"> {{index+1}}</th>
                                                                <td>{{attack_.name}}</td>                                                                                                                                
                                                            </tr>                                                                                                                        
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            
                                            <div class="col-6 panel-body">  
                                                <label for="">Ataques disponibles:</label>
                                                <ul class="list-group overflow-auto" >                                                
                                                    <div v-for="(attack,index) in attacks" v-bind:key="attack.id">
                                                        <div v-if="is_attack_add(attack)">
                                                            <li  v-on:click="state_attack(attack)" class="list-group-item list-group-item-action active">{{index+1}}.  {{attack.name}}</li> 
                                                        </div>
                                                        <div v-else>
                                                            <li  v-on:click="state_attack(attack)" class="list-group-item list-group-item-action">{{index+1}}.  {{attack.name}}</li> 
                                                        </div>                                                        
                                                    </div>                                                                                                                                          
                                                </ul>
                                            </div>    
                                        </div>                                    
                                    
                                        <div class="form-row">                       
                                            <button class="btn btn-primary mr-3 mb-3" type="submit" name="submit">Guardar</button>
                                            <button class="btn btn-success mb-3" v-on:click="reset_form()" type="reset" name="reset">Limpiar</button>
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
    name: 'Package_edit',   
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
        attacks_sel:[]  
      }
    }, 
    filters: {      
    },
    computed:{
        ...Vuex.mapState('StorePackage',['package_']),     
        ...Vuex.mapState('StoreAttack',['attacks'])
    },
    methods: {
        ...Vuex.mapActions('StorePackage',['add_message_success']),
        ...Vuex.mapActions('StoreAttack',['get_attacks']),
        send_form(e){
            e.preventDefault();          
            this.set_id_attacks();
            axios.put('http://3.14.19.238:8000/pentesting/package_update/'+this.package_o.id, this.package_o)
            .then(response => {                
                this.add_message_success({'message':'El paquete: '+this.package_o.name+' ha sido actualizado correctamente.'});
                this.$router.push('/package/list');                
            })
            .catch(error => {
                //Mirar los errores que esta devolviendo
                console.log(error);
                this.succed=false;
                this.errored = true;
                this.errors = [];
                this.errors.push({'message':'No se ha podido actualizar el paquete: '+this.package_o.name+', verifique la información.'});            
        })
        .finally(() => this.loading = false);
            
            //revisar por que despues del axion, no sigue esto de imadiato
            if (this.succed){
                this.$router.push('/package/list');
            }                   
        },
        list_package(){
            this.$router.push('/package/list');
        },
        reset_form(){
            this.attacks_sel=[];
        },
        set_id_attacks(){
            this.package_o.attacks=[];
            for (var i=0;i<this.attacks_sel.length;i++){
                this.package_o.attacks.push(this.attacks_sel[i].id);
            }
        },        
        list_package(){
            this.$router.push('/package/list');
        },      
        state_attack(attack){
            if(this.is_attack_add(attack)){
                this.delete_attack_add(attack);                 
            }
            else{
                this.attacks_sel.push(attack);                 
            }           
        },
        delete_attack_add(attack){        
            for(var i=0; i<this.attacks_sel.length;i++){
                if (attack.id == this.attacks_sel[i].id){
                    this.attacks_sel.splice(i,1);                    
                    break;
                }
            }
        },
        is_attack_add(attack){
            //return this.attacks_sel.includes(attack);
            var result = false;
            for(var i=0; i<this.attacks_sel.length;i++){                
                if(attack.id == this.attacks_sel[i].id){
                    result=true;
                    break;
                }
            }            
            return result;
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
    }
  };  
</script>

<style scoped>
    .red{        
        color:red;
    }.list-group{
        max-height: 300px;      
    }
    .tam_table{
        max-height: 300px;
    }
    
</style>

