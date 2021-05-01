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
                                    <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
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
                                    <td>@mdo</td>
                                    <td>                    
                                        <!-- v-on:click="show_package(package_)"-->                                                  
                                        <button class="btn btn-transparent"><i class="cil-trash icon-red"/></button>                                    
                                    </td>
                                    </tr>
                                    <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
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
                                    <td>@mdo</td>
                                    <td>                                                                      
                                        <button class="btn btn-transparent"><i class="cil-trash icon-red"/></button>                                    
                                    </td>
                                    </tr>
                                    <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
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
                                    <td>@mdo</td>
                                    <td>                                                                      
                                        <button class="btn btn-transparent"><i class="cil-trash icon-red"/></button>                                    
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
                                <p class="text-right font-weight-bold">$ 500</p>
                            </div>
                        </div>
                        <div class="alert alert-dark" role="alert">
                            <div class="row">
                                <div class="col">
                                    <h3 class="text-left">Total</h3>
                                </div>
                                <div class="col">
                                    <h3 class="text-right font-weight-bold icon-red">$ 500</h3>
                                </div>
                            </div>
                        </div>                        
                        <button  class="col btn btn btn-outline-success btn-space">Finalizar compra</button>                        
                        <button  class="col btn btn-outline-primary btn-space">Seguir comprando</button>    
                        <button  class="col btn btn-outline-danger btn-space">Vaciar carrito</button>                                            
                    </div>
                </div>                
            </div>                  
        </div>                  
    </section>      
</template>

<script>
export default {
    name:'ShoppingCartList',
    data: function () {
        return {
            count: 1
        }
    },
    methods:{
        color_nav(){
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 ) {        
                document.getElementById("navbar").style.backgroundColor = "#22195b";                        
            } else {
                document.getElementById("navbar").style.backgroundColor = "#22195b";        
            }                        
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
        }

        
    },
    created () {
        window.addEventListener('scroll', this.color_nav);
    },
    destroyed () {
        window.removeEventListener('scroll', this.color_nav);
    },
    mounted(){
        this.color_nav()
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
