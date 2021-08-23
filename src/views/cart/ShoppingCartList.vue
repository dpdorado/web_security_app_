<template>
     <section class="section-margin">
        <div class="container-fluid">    
            <div class="card border-0 fon_card">
                <!--<img class="card-img-top" src="..." alt="Card image cap">-->
                <div class="card-header border-0 fon_card row">
                    <div class="col">
                        <h2 class="text-left"><i class="cil-cart"/> Mi carrito de compras</h2>
                    </div>
                    <div class="col">
                        <h3 class="text-right"><i class="cil-check-alt icon-green"/> Tu compra es 100 % segura</h3>
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
        
                <div class="card-body border-0  row">
                    <div class="col-md-8 card-body color_product_list">                          
                          <div class="tam_table overflow-auto">
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Servicio</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Total</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(service,index) in this.shoppingCartInfo" v-bind:key="index">                                        
                                        <th scope="row">{{index + 1}}</th>
                                        <td>{{service.service}}</td>
                                        <td>{{service.price}}</td>
                                        <td>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <button class="btn btn-transparent" type="button" v-on:click="minus_count_item()"><i class="cil-minus icon-red"></i></button>
                                                </div>
                                                <div class="">
                                                    <input class="text-center" type="text" size="6" :value="count" disabled>                                                
                                                </div>
                                                <div class="input-group-append">
                                                    <button class="btn btn-transparent" type="button" v-on:click="add_count_item()"><i class="cil-plus icon-blue"></i></button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{{service.price}}</td>
                                        <td>                                         
                                            <button v-on:click="removeServiceShoppingCart(service.id, service.service)" class="btn btn-transparent"><em class="cil-trash icon-red"/></button>
                                        </td>
                                    </tr>                                    
                                </tbody>
                            </table>                           
                         </div>                     
                    </div>
                    <div class="col-md-4 card-body color_total_list border-0">
                        <div class="row">
                            <div class="col">
                                <p class="text-left">Subtotal</p>
                            </div>
                            <div class="col">
                                <p class="text-right font-weight-bold">$ {{this.totalPrice.total_price}}</p>
                            </div>
                        </div>
                        <div class="alert alert-dark" role="alert">
                            <div class="row">
                                <div class="col">
                                    <h3 class="text-left">Total</h3>
                                </div>
                                <div class="col">
                                    <h3 class="text-right font-weight-bold icon-red">$ {{this.totalPrice.total_price}}</h3>
                                </div>
                            </div>
                        </div>                                                
                        <button  v-on:click="pay_method()" class="col btn btn btn-outline-success btn-space">Ir a pagar</button>
                        <button  v-on:click="keep_shopping()" class="col btn btn-outline-primary btn-space">Seguir comprando</button>    
                        <button  v-on:click="clean_shopping()" class="col btn btn-outline-danger btn-space">Vaciar carrito</button>                                            
                    </div>
                </div>                
            </div>                  
        </div>                  
    </section>      
</template>

<script>
import axios from "axios";

export default {
    name:'ShoppingCartList',
    data: function () {
        return {
            errored_l: false,
            errors_l: [],
            succed_l: true,
            success_l: [],
            loading_l: false,
            count: 1,
            shoppingCartInfo: {},
            totalPrice : 0
        }
    },
    methods:{      
        color_nav(){
             let color = "#22195b";
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
                color = "#22195b";
            }
            document.getElementById("navbar").style.backgroundColor = color;
        },
        add_count_item(){
            if(this.count<100){
                this.count+=1;
            }            
        },
        minus_count_item(){
            if(this.count>1){
                this.count-=1;
            }
        },
        keep_shopping(){
            this.$router.push('/home/services/attacks');
        },
        clean_shopping(){
            //TODO vaciar el carrito
        },
        pay_method(){
            //TODO ir al métod de pago
        },
        get_shopping_info(){
            console.log('entrando:    dsdcsd');
            const path = 'http://3.14.19.238:8000/shopping/shoppingCartList/';                            
            axios.get(path).then(response => {                
                this.shoppingCartInfo = response.data.shopping;  
                this.totalPrice = this.shoppingCartInfo.pop();
            }).catch(error => {            
                console.log('¡Ocurrio un error!');
            }).finally(() => this.loading_l=false)        
        },
        removeServiceShoppingCart(id, name){
            const path = 'http://3.14.19.238:8000/shopping/shoppingCartDelete/'+id;                            
            axios.delete(path).then(response => {                                
                console.log(response);
                 this.errored_l = false;
                this.succed_l = true;
                this.success_l = [];
                this.success_l.push({
                    message:
                    "¡El servicio: " +
                    name +
                    " ha sido eliminada correctamente!!!",
                });
                this.get_shopping_info();
            }).catch(error => {            
                console.log('¡Ocurrio un error!');
                console.log(error);
                this.succed_l = false;
                this.errored_l = true;
                this.errors_l = [];
                this.errors_l.push({
                    message:
                    "¡Ha ocurrido un error al eliminar el servicio!!!",
                });
            }).finally(() => this.loading_l=false)
        }
    },
    created () {
        window.addEventListener('scroll', this.color_nav);
    },
    destroyed () {
        window.removeEventListener('scroll', this.color_nav);
    },
    mounted(){
        this.color_nav(),        
        this.get_shopping_info()
    }
}
</script>

<style scoped>   
    .hero_banner_tam{
        height:100px;        
    }    
    .fon_card{
        background-color:#ededed33;
    }   
    .color_product_list{
        background-color: #ededed33;
    }
    .color_total_list{
        background-color: #ededed33;
    }
    .icon-green {
        color: green;
    }
    .icon-red {
        color: red;
    }
    .icon-blue {
        color: blue;
    }
    .btn-transparent{
        background-color:transparent
    }
    .tam_table{
        max-height: 300x;
    }
    .btn-space {
        margin: 5px;
    }
</style>
