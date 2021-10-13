<template>
  
    <div class="container">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <router-link class="" v-bind:to="'/home'"
                ><img
                  src="@/assets/start/img/web_security_app_.png"
                  alt=""
                  width="150"
                  height="50"
              /></router-link>
            </div>

            <div class="col text-right">
              <h2>FACTURA</h2>
              <h3><small>Factura #00{{this.bill_id}}</small></h3>
            </div>
          </div>

          <hr />

          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header background">
                  <div class="row">
                    <div class="col-md-2 font-weight-bold">De:</div>
                    <div class="col-md-10 font-weight-bold text-primary">
                      Web Security App
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="card-text">Dirrección: Popayán Cauca</div>
                  <div class="card-text">Detalles: web security app</div>
                  <div class="card-text">Más detalles: web security app</div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-header background">
                  <div class="row">
                    <div class="col-md-8 font-weight-bold text-right">
                      Para :
                    </div>
                    <div
                      class="col-md-4 font-weight-bold text-primary text-left"
                    >
                      Cliente
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="card-text">Dirrección: Popayán Cauca</div>
                  <div class="card-text">Detalles: ---</div>
                  <div class="card-text">Más detalles: --- </div>
                </div>
              </div>
            </div>
          </div>

          <!--detalles de la factura-->
          <div>
            <table class="table table-bordered">
              <thead>
                <tr class="background">
                  <th>
                    <h4>Servicio</h4>
                  </th>
                  <th>
                    <h4>Descripción</h4>
                  </th>
                  <th>
                    <h4>Hrs / Cantidad</h4>
                  </th>
                  <th>
                    <h4>Tarifa / Precio</h4>
                  </th>
                  <th>
                    <h4>Sub-Total</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(detail, index) in this.details" v-bind:key="index">
                  <td>{{detail.service}}</td>
                  <td><a href="#"> {{detail.service}} </a></td>
                  <td class="text-right">1</td>
                  <td class="text-right">${{detail.price}}</td>
                  <td class="text-right">${{detail.price}}</td>
                </tr>                
                <tr></tr>
                <tr class="border-hidden">
                  <td class="border-hidden"></td>
                  <td class="border-hidden"></td>
                  <td class="border-hidden"></td>
                  <td class="text-right font-weight-bold border-hidden">
                    Sub Total:
                  </td>
                  <td class="text-right font-weight-bold border-hidden">
                    $ {{this.total}}
                  </td>
                </tr>
                <tr class="border-hidden">
                  <td class="border-hidden"></td>
                  <td class="border-hidden"></td>
                  <td class="border-hidden"></td>
                  <td class="text-right font-weight-bold border-hidden">
                    Impuestos (IVA 21%):
                  </td>
                  <td class="text-right font-weight-bold border-hidden">
                    $ 0
                  </td>
                </tr>
                <tr class="border-hidden">
                  <td class="border-hidden"></td>
                  <td class="border-hidden"></td>
                  <td class="border-hidden"></td>
                  <td class="text-right font-weight-bold border-hidden">
                    Total:
                  </td>
                  <td class="text-right font-weight-bold border-hidden">
                    $ {{this.total}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr />

          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header background">
                  <div class="font-weight-bold">Datos bancarios</div>
                </div>
                <div class="card-body">
                  <div class="card-text">{{this.user.name}}</div>
                  <div class="card-text">Nombre del banco:</div>
                  <div class="card-text">SWIFT: -----</div>
                  <div class="card-text">Número de cuenta: ------</div>
                  <div class="card-text">IBAN: ----</div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-header background">
                  <div class="font-weight-bold">Datos de contacto</div>
                </div>
                <div class="card-body">
                  <div class="card-text">Email: {{this.user.email}}</div>
                  <div class="card-text">Móvil: +92123456789</div>
                  <div class="card-text">
                    Twitter:
                    <a href="https://twitter.com/suTwitter">@suTwitter</a>
                  </div>
                  <div class="card-text">
                    Suweb:
                    <a href="http://www.suweb.com/author/usted">
                      http: //www. suweb.com/author/usted /
                    </a>
                  </div>
                  <div class="card-text">
                    El pago debe ser por transferencia bancaria
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>

        <div class="row">
          <div class="col text-right">
            <img
              src="@/assets/start/img/barras.png"
              alt=""
              width="200"
              height="80"
            />
          </div>
          <div class="col">
            <router-link class="" v-bind:to="'/home'"
              ><img
                src="@/assets/start/img/web_security_app_.png"
                alt=""
                width="120"
                height="30"
            /></router-link>
            <p>DD</p>
          </div>
        </div>
      </div>
    </div>
  
</template>

<script>
import axios from "axios";

export default {
  name: "Bill",
   data() {
    return {
      bill_id: '',
      user : {},
      details:[],
      total:0,        
      _config: {
        headers: { 
            Authorization: 'Bearer ' 
        }
      }
    };
  },
  
  methods: {
    getUserDefault(){
      var userId = localStorage.getItem('userid'); 
      const path = this.$server+'/usuario/usuario/'+userId;                              
        axios
          .get(path,this._config)
          .then((response) => {                    
            console.log(response);
            this.user = response.data;             
          })
          .catch((error) => {
            console.log(error)            
          })
          .finally(() => (this.loading_l = false));        
    },
    get_details(){    
      console.log('details');
      const path = this.$server+'/shopping/InvoceDetail/'+this.bill_id;                       
        axios
          .get(path, this._config)
          .then((response) => {     
            console.log('invoice deetails');
            console.log(response.data);
            this.details = response.data['invoceDetail '];           
            for (var i = 0; i < this.details.length; i++){
              this.total+=this.details[i].price;
            }            
          })
          .catch((error) => {           
          })
          .finally(() => (this.loading_l = false));        
    }
  },
  mounted() {  
    var config = localStorage.getItem('config');            
    this._config = JSON.parse(config);  
    this.bill_id = this.$route.params.id;
    this.getUserDefault();
    this.get_details();
  },
};
</script>

<style scoped>
.background {
  background-color: #f2f2f2;
}
.border-hidden {
  border: hidden;
}
</style>
