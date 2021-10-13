<template>
    <div class="section-margin">
        <div class="container">

            <br>
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

          <br>
            <div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <img src="@/assets/start/img/paquete.png" alt="" srcset="" height="500px" width="500px">
                    <div class="card-pricing__footer">
                        <button v-on:click="addToCart()" class="button button-light"><em class="cil-cart"/> Añadir al carrito</button> 
                    </div>
                </div> 

                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="">
                        <span class="">
                            <strong class="">SKU:</strong>
                            <span class="">PP001</span>
                        </span>
                    </div>
                    <div class="">
                        <h1 class="">{{this.package.name}}</h1>
                    </div>
                    <div class="">
                        <p class="">Decsripciion: {{this.package.description}}</p>                           
                    </div>
                    <div class="">
                        <span class="">
                            <strong class="">PRECIO:</strong>
                            <span class="">${{this.package.price}}</span>
                        </span>
                    </div>
                    <div class="">
                        <div>
                            <h2 class="">Pruebas de penetracion</h2> 
                        </div>
                        <div class="">
                           <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripcion</th>                                    
                                    <th scope="col">Precio usual</th>
                                    <th scope="col">Descuento</th>
                                    <th scope="col">Precio enpaquete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(attack_,index) in this.package.attacks" v-bind:key="index">
                                        <th scope="row">{{index+1}}</th>
                                        <td>{{attack_.name}}</td>
                                        <td>{{attack_.description}}</td>
                                        <td>${{attack_.price}}</td> 
                                        <td>{{attack_.discount}}%</td>
                                        <td>${{attack_.priceInPacket}}</td>                                                                            
                                    </tr>         
                                     <tr>
                                        <th scope="row"></th>
                                        <td></td>
                                        <td><strong>Total sin descuento:</strong></td>
                                        <td>${{this.total_total}}</td>                    
                                        <td><strong>Total con descuento:</strong></td>
                                        <td>${{this.total_discount}}</td>                                                                            
                                    </tr>                                    
                                </tbody>
                                </table>            
                        </div>                                          
                    </div>
                </div>             
            </div>                                        
        </div>
    </div>
</template>


<script>

import axios from "axios";

export default {
    name:'ViewPackage',
    data () {
        return { 
            errored_l: false,
            errors_l: [],
            succed_l: true,
            success_l: [],
            loading_l: false,  
            package: {},   
            package_id : 0,
            total_discount:0,
            total_total:0,
            index:0,        
            _config: {
                headers: { 
                    Authorization: 'Bearer ' 
                }
            }
        }
    },
    methods: {
        color_nav: function() {
            let color = "#22195b";
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
                color = "#22195b";
            }
            document.getElementById("navbar").style.backgroundColor = color;
        },
        getIndex(){
            this.index +=1;
            return this.index;
        },
        get_package(){
            const path = this.$server+'/pentesting/package_search/'+this.package_id;
            axios.get(path,this._config).then(response => {                      
                this.package = response.data['Package'][0];
                this.calculate_totals();
                console.log( this.package);                        
            }).catch(error => {
                console.log(error);  
                this.succed_l=false; 
                this.errored_l =true; 
                this.errors_l=[];
                this.errors_l.push({'message':'¡Lo sentimos los datos no estan disponibles en estos momentos, intentalo más tarde!!!'});                
                window.scrollTo(0, 0);
            }).finally(() => this.loading_l=false);                                
        },  
        calculate_totals(){
            let attacks = this.package.attacks;
            let total = 0;
            let discount = 0;
            attacks.forEach( function(attack) {
                total += attack.price;
                discount += attack.priceInPacket;
            });
            this.total_total = total;
            this.total_discount = discount;
        }, 
        addToCart(){
            const path = this.$server+'/shopping/shoppingCartAdd/';   
            let info = {
                "users": 1,
                "services": this.package.service_id
            };                         
            axios.post(path, info, this._config).then(response => {
                console.log(response);
                this.errored_l = false;
                this.succed_l = true;
                this.success_l = [];
                this.success_l.push({
                    message:
                    "¡El servicio: " +
                    this.package.name +
                    " ha sido agregado al carrito!!!",
                });      
                window.scrollTo(0, 0);    
            }).catch(error => {            
                console.log('¡Ocurrio un error!');
                console.log(error);
                this.succed_l = false;
                this.errored_l = true;
                this.errors_l = [];
                this.errors_l.push({
                    message:
                    "¡Ha ocurrido un error el servicio: "+ name + "al carrito, revise si no se ha agregado antes!!!",
                });
                window.scrollTo(0, 0);
            }).finally(() => this.loading_l=false)                 
        },  
    },
    created() {
        window.addEventListener("scroll", this.color_nav);
    },
    destroyed() {
        window.removeEventListener("scroll", this.color_nav);
    },
    mounted() {
        var config = localStorage.getItem('config');            
        this._config = JSON.parse(config);
        this.package_id = this.$route.params.id;        
        this.color_nav();    
        this.get_package();
    }    
}

</script>

<style scoped>  

</style>