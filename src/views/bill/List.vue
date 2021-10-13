<template>
  <div>
    <CCard>
      <CCardHeader>
        <h1>
          <CIcon name="cil-list" />
          <small>Lista de ordenes</small>
        </h1>
      </CCardHeader>

      <CCardBody>
        <div class="container-fluid">
          <div class="row">
            <div class="col-10">
              <div class="demo">
                <form class="form-search">
                  <div class="input-group">
                    <div class="input-group">
                      <input
                        type="text"
                        placeholder="Buscar orden"
                        class="form-control col-lg-9"
                        v-model="name"
                      />
                      <div class="input-group-append">
                        <button type="button" class="btn btn-primary">
                          <CIcon name="cil-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="row" style="margin-top: 10px">
          <div class="col-12">
            <table id="grid"></table>
          </div>
        </div>

        <div v-if="errored_l">
          <div v-for="(err, index) in errors_l" v-bind:key="index">
            <div class="alert alert-danger" role="alert">
              {{ err.message }}
            </div>
          </div>
        </div>
        <div v-else-if="succed_l">
          <div v-for="(succ, index) in success_l" v-bind:key="index">
            <div class="alert alert-success" role="alert">
              {{ succ.message }}
            </div>
          </div>
        </div>

        <CRow>
          <div class="table-responsive"></div>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">Representante legal</th>
                <th scope="col">Estado</th>                
                <th scope="col">Opciones</th>
              </tr>
            </thead>

            <tbody>
              <tr  v-for="(bill, index) in pageOfItems" v-bind:key="bill.id">                
                <th scope="row">{{index}}</th>
                <td>{{bill.id}}</td>
                <td>{{bill.representante}}</td>
                <td>{{bill.estado}}</td>
                <td class="">
                  <div class="btn-toolbar text-right">                              
                    <button
                      v-on:click="show_bill(bill)"
                      class="btn btn-success btn-sm mr-3"
                    >
                    <CIcon name="bi-eye" />                    
                    </button>
                    <button
                      v-on:click="
                        (darkModal = true),
                          (bill_name_deleted = bill.name),
                          (bill_id_deleted = bill.id)
                      "
                      class="btn btn-danger btn-sm"
                    >
                      <CIcon name="cil-trash" />
                    </button>
                  </div>
                </td>
              </tr>              
            </tbody>
          </table>
        </CRow>
        <div class="card-footer row justify-content-end">
          <jw-pagination
            :items="search_bills"
            @changePage="onChangePage"
            :labels="customLabels"
          ></jw-pagination>
        </div>

        <CModal
          :show.sync="darkModal"
          :no-close-on-backdrop="true"
          :centered="true"
          title="Modal title 2"
          size="lg"
          color="dark"
        >
          Está seguro(a) de eliminar la prueba de penetración de nombre:
          {{ bill_name_deleted }}
          <template #header>
            <h6 class="modal-title">
              <CIcon name="cil-trash" /> Eliminar ataque
            </h6>
            <CButtonClose @click="darkModal = false" class="text-white" />
          </template>
          <template #footer>
            <CButton @click="darkModal = false" color="danger"
              >Cancelar</CButton
            >
            <CButton v-on:click="remove_bill()" color="success"
              >Eliminar</CButton
            >
          </template>
        </CModal>
      </CCardBody>
    </CCard>
  </div>
</template>>

<script>
import axios from "axios";
import Vuex from "vuex";

const customLabels = {
  first: "<<",
  last: ">>",
  previous: "<",
  next: ">",
};

export default {
  name: "Bill_list",
  components: {},
  data() {
    return {
      name: "",
      errored_l: false,
      errors_l: [],
      succed_l: true,
      success_l: [],
      loading_l: false,
      darkModal: false,
      bill_name_deleted: "",
      bill_id_deleted: -1,
      pageOfItems: [],
      customLabels,
      bills: [],
      users:[],
      user_names:[],
      dates_table: [],
      count_bills_search: 0,        
      _config: {
        headers: { 
            Authorization: 'Bearer ' 
        }
      }
    };
  },
  filters: {},
  computed: {
    // ...Vuex.mapState("Storebill", ["errored", "errors", "succed", "success"]),
    // ...Vuex.mapGetters("Storebill", ["get_success"]),
    search_bills: function () {
      if (this.name == "") {
        return this.dates_table;
      } else {
        return this.dates_table.filter((bill) => bill.id.includes(this.name));
      }
    },
  },
  methods: {
    //...Vuex.mapActions('Storebill',['get_bills', 'remove_bill','bill_aux','edit_loading']),
    // ...Vuex.mapActions("Storebill", ["edit_bills", "bill_aux"]),

    get_bills() {
      const path = "http://3.14.19.238:8000/shopping/InvoceList/";
      axios
        .get(path, this._config)
        .then((response) => {                    
          this.bills = response.data;
          for (var i = 0; i < this.bills.length;i++)
          {
            this.dates_table.push({
              id: this.bills[i].id,
              representante: '',
              estado: 'Completed',
              user_id:''
            });
          }   
          //this.get_users();         
          //this.get_all_users();        
        })
        .catch((error) => {
          console.log(error)
          this.succed_l = false;
          this.errored_l = true;
          this.errors_l = [];
          this.errors_l.push({
            message:
              "¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!",
          });
        })
        .finally(() => (this.loading_l = false));
    },
    getUserDefault(){
      const path = "http://3.14.19.238:8000/usuario/usuario/1";                              
        axios
          .get(path, this._config)
          .then((response) => {                    
            console.log(response.data.name);
              var name = response.data.name;
             for (var k = 0; k < this.dates_table.length;k++){
               this.dates_table[k].representante = name;
             }         
          })
          .catch((error) => {
            console.log(error)
            this.succed_l = false;
            this.errored_l = true;
            this.errors_l = [];
            this.errors_l.push({
              message:
                "¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!",
            });
          })
          .finally(() => (this.loading_l = false));        
    },
    get_users(){    
      const path = "http://3.14.19.238:8000/shopping/InvoceDetail/";      
      
      for (var k = 0; k < this.dates_table.length;k++){
        var path_aux = path + this.dates_table[k].id;        
        axios
          .get(path_aux, this._config)
          .then((response) => {                   
            var user = response.data['invoceDetail '][0].user;            
            this.users.push(user);                      
          })
          .catch((error) => {
            console.log(error)
            this.succed_l = false;
            this.errored_l = true;
            this.errors_l = [];
            this.errors_l.push({
              message:
                "¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!",
            });
          })
          .finally(() => (this.loading_l = false));
        }
    },
    get_all_users(){    
      const path = "http://3.14.19.238:8000/usuario/usuario/";  
      console.log('sadas')        ;
      console.log(this.users)        ;
      for (var j = 0; j < this.dates_table.length;j++){
        var path_aux = path + this.users[j];  
        console.log(path_aux);
        axios
          .get(path_aux, this._config)
          .then((response) => {                    
            console.log(response.data);          
            //this.dates_table[j].user_id = response.data;            
          })
          .catch((error) => {
            console.log(error)
            this.succed_l = false;
            this.errored_l = true;
            this.errors_l = [];
            this.errors_l.push({
              message:
                "¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!",
            });
          })
          .finally(() => (this.loading_l = false));
        }
    }
    ,
    remove_bill() {
    //   this.darkModal = false;
    //   const path =
    //     "http://3.14.19.238:8000/pentesting/bill_delete/" +
    //     this.bill_id_deleted;
    //   axios
    //     .delete(path)
    //     .then((response) => {
    //       console.log(response);
    //       this.errored_l = false;
    //       this.succed_l = true;
    //       this.success_l = [];
    //       this.success_l.push({
    //         message:
    //           "¡La prueba de penetración: " +
    //           this.bill_name_deleted +
    //           " ha sido eliminada correctamente!!!",
    //       });
    //       this.get_bills();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       this.succed_l = false;
    //       this.errored_l = true;
    //       this.errors_l = [];
    //       this.errors_l.push({
    //         message:
    //           "¡No se ha podido eliminar la prueba de penetración: " +
    //           this.bill_name_deleted +
    //           "!, intentelo más tarde.",
    //       });
    //     })
    //     .finally(() => (this.loading_l = false));
    },
    /**
     * Editar ataque con id
     */
    edit_bill(bill) {
      this.bill_aux(bill);
      this.$router.push({ path: "/bill/edit/" + bill.id });
    },
    /**
     * Mostrar un ataque ataque con id
     */
    show_bill(bill) {      
      console.log(bill.id);
      this.$router.push("/bill/show/" + bill.id );
      //this.$router.push('/bill/edit')
    },
    /**
     * Editar ataque con id
     */
    create_bill() {
      this.$router.push("/bill/create");
      //this.$router.push('/bill/edit')
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.count_bills_search = pageOfItems.length;
      this.pageOfItems = pageOfItems;
    },
    set_errors() {
      this.succed_l = this.succed;
      this.success_l = this.succed_l ? this.get_success : [];
    },
    show_order(){
        this.$router.push("/bill/show")
    }
  },
  mounted() {
    var config = localStorage.getItem('config');            
    this._config = JSON.parse(config);  
    // this.set_errors();
    this.get_bills();    
    this.getUserDefault();
  },
};
</script>

<style scoped>
td {
  width: 300px;
}
th {
  width: 200px;
}
</style>

