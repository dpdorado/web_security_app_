<template>
    <div  class="section-margin" v-if="!orderActive">
        <div class="container">
        <div class="py-5 text-center">
        <img class="d-block mx-auto mb-4" src="@/assets/start/img/web_security_app_.png" alt="" width="350" height="70">
        <h2>Formulario de facturación</h2>
        <p class="lead">Dotos de facturación en Web Security App.</p>
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
        

        <div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Tu carrito</span>
            <span class="badge bg-primary rounded-pill">{{this.shoppingCartInfo.length}}</span>
            </h4>
            <ul class="list-group mb-3" v-for="(service,index) in this.shoppingCartInfo" v-bind:key="index">
                <li class="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                    <h6 class="my-0">{{service.service}}</h6>
                    <small class="text-muted">Brief description</small>
                    </div>
                    <span class="text-muted">${{service.price}}</span>
                </li>                
            </ul>
            <li class="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${{this.totalPrice.total_price}}</strong>
            </li>

            <br>

            <form class="card p-2">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Promo code">
                <button type="submit" class="btn btn-secondary">Redeem</button>
            </div>
            </form>
        </div>
        <div class="col-md-7 col-lg-8">
            <h4 class="mb-3">Datos de facturación</h4>
            <form class="needs-validation" novalidate="">
                <div class="row g-3">
                    <div class="col-sm-6">
                    <label for="name" class="form-label">Nombre<span class="red">*</span></label>
                    <input type="text" class="form-control overflow-auto" id="name" name=name value="user.name" v-model="user.name" placeholder="Nombre" required>
                    <div class="invalid-feedback">
                        El nombre es requerido.
                    </div>
                    </div>

                    <div class="col-sm-6">
                    <label for="last_name" class="form-label">Apellido<span class="red">*</span></label>                    
                    <input type="text" class="form-control overflow-auto" id="last_name" name=last_name value="user.last_name" v-model="user.last_name" placeholder="Apellido" required>
                    <div class="invalid-feedback">
                        El apellido es requerido.
                    </div>
                    </div>
                

                    <div class="col-12">
                    <label for="email" class="form-label">Email<span class="red">*</span></label>                    
                    <input type="email" class="form-control overflow-auto" id="email" name=email value="user.email" v-model="user.email" placeholder="you@example.com" required>
                    <div class="invalid-feedback">
                    El correo es requerido.
                    </div>
                    </div>

                    <div class="col-12">
                    <label for="address" class="form-label">Dirección<span class="red">*</span></label>
                    <input type="text" class="form-control" id="address" placeholder="1234 Main St" required="">
                    <div class="invalid-feedback">
                        La dirección es requerida.
                    </div>
                    </div>                

                    <div class="form-group col-md-12">
                        <label for="country" class="form-label">País<span class="red">*</span></label>

                        <select class="form-control col-md-12" id="country" required="">
                            <!-- <option value="">Seleccione el país</option> -->
                            <!-- <option value="Argentina">Argentina</option>
                            <option value="Brazil">Brazil</option> -->
                            <option value="Colombia">Colombia</option>
                            <!-- <option value="Ecuador">Ecuador</option>                    
                            <option value="Peru">Perú</option>                     -->
                        </select>
                        <div class="invalid-feedback">
                            El pais esobligatorio, por favor selecciona uno.
                        </div>
                    </div>

                    <div class="form-group col-md-12">
                        <label for="state" class="form-label">Departamento<span class="red">*</span></label>
                        <select class="form-control col-md-12" id="state" required="">
                            <option value="">Selecciona un departamento</option>
                            <option postcode="76999" value="Antioquia">Antioquia</option>
                            <option postcode="76990" value="Cundinamarca">Cundinamarca</option>
                            <option postcode="766654" value="Cauca">Cauca</option>                        
                            <option postcode="760039" value="Valle del Cauca">Valle del Cauca</option>

                        </select>                
                        <div class="invalid-feedback">
                            Please provide a valid state.
                        </div>
                    </div>

                    <div class="form-group col-md-12">
                        <label for="zip" class="form-label">Codigo postal<span class="red">*</span></label>
                        <input type="text" class="form-control col-md-12" id="zip" placeholder="" required="" readonly>
                        <div class="invalid-feedback">
                            El codigo postal es requerido.
                        </div>
                    </div>
                </div>        

                <button id="btnBilling" v-on:click="send_billling()" class="w-100 btn btn-primary btn-lg" type="submit">Confirmar dirección de facturación</button>
            </form>

            <hr class="my-4">

            <form id="server">
                <h4 class="mb-3">Datos del Servidor</h4>

                 <div class="col-12">
                    <label for="domain_name" class="form-label">Dominio<span class="red">*</span></label>                    
                    <input type="text" class="form-control overflow-auto" id="domain_name" name=domain_name value="server.domain_name" v-model="server.domain_name" placeholder="domain.example" required>
                    <div class="invalid-feedback">
                        El dominio es requerido.
                    </div>
                </div>

                <div class="col-12">
                    <label for="url" class="form-label">Url<span class="red">*</span></label>                    
                    <input type="text" class="form-control overflow-auto" id="url" name=url value="server.url" v-model="server.url" placeholder="https://domain.example" required>
                    <div class="invalid-feedback">
                        La url es requerida.
                    </div>
                </div>

                <div class="col-12">
                    <label for="ipServer" class="form-label">Ip del servidor<span class="red">*</span></label>                    
                    <input type="text" class="form-control overflow-auto" id="ipServer" name=ipServer value="server.ipServer" v-model="server.ipServer" placeholder="127.0.0.1" required>
                    <div class="invalid-feedback">
                        La ip del servidor es requerida.
                    </div>
                </div>                

                <br>

                <div class="row">
                    <button id="btnBackBilling" v-on:click="active_formbilling()" type="button" class="w-100 col btn btn-dark">Paso anterio</button>
                    <button id="btnServer" v-on:click="send_server()" class="w-100 col btn btn-primary" type="submit">Confirmar datos del servidor</button>
                </div>                 
            </form>

            <hr class="my-4">

            <form id="payment">
                <h4 class="mb-3">Payment</h4>

                <div class="row">               
                    <div class="inlineimage"> <img class="img-responsive images" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Mastercard-Curved.png"> <img class="img-responsive images" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Discover-Curved.png"> <img class="img-responsive images" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Paypal-Curved.png"> <img class="img-responsive images" src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/American-Express-Curved.png"> </div>
                </div>

                <div class="my-3">
                    <div class="form-check">
                        <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked="" required="" value="Credito">
                        <label class="form-check-label" for="credit">Credit card</label>                    
                    </div>
                    <div class="form-check">
                        <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required="" value="Debito">
                        <label class="form-check-label" for="debit">Debit card</label>
                    </div>
                    <div class="form-check">
                        <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required="" value="Paypal">
                        <label class="form-check-label" for="paypal">PayPal</label>
                    </div>
                </div>
                                                           

                <div class="row gy-3">

                    <div class="col-md-6">
                    <label for="name_targe" class="form-label">Nombre tarjeta</label>                    
                    <input type="text" class="form-control overflow-auto" id="name_targe" name=name_targe value="target.name_targe" v-model="target.name_targe" placeholder="Visa" required readonly>                                        
                    <div class="invalid-feedback">
                        Número de tarjeta es requerido
                    </div>
                    </div>


                    <div class="col-md-6">
                    <label for="number_targe" class="form-label">Número de tarjeta</label>                    
                    <input type="text" class="form-control overflow-auto" id="number_targe" name=number_targe value="target.number_targe" v-model="target.number_targe" placeholder="12345678989" required>                                        
                    <div class="invalid-feedback">
                        Número de tarjeta es requerido
                    </div>
                    </div>

                    <div class="col-md-6">
                    <label for="code_segurity" class="form-label">Clave</label>                    
                    <input type="text" class="form-control overflow-auto" id="code_segurity" name=code_segurity value="target.code_segurity" v-model="target.code_segurity" placeholder="1234" required>                                        
                    <div class="invalid-feedback">
                       La clave es requerida
                    </div>
                    </div>                    
                </div>
                           
                <br>

                <div class="row">
                    <button v-on:click="active_formserver()" type="button" class="col btn btn-dark">Paso anterio</button>
                    <button v-on:click="validateForms()" class="col btn btn-primary" type="submit">Continue to checkout</button>
                </div>                

                <hr class="my-4">
            </form>
        </div>
        </div></div>
  </div>
    <div class="section-margin" v-else>
          <div class="container mt-5 mb-5">
            <div class="row d-flex justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="text-left logo p-2 px-5"> <img src="@/assets/start/img/web_security_app_.png" lenght="50" width="150"> </div>
                        <div class="invoice p-5">
                            <h5>Tu orden esta completada!</h5> <span class="font-weight-bold d-block mt-4">Hola, {{user.name}}</span> <span>Tu orden ha sido confirmada, nos pondremos en contacto pronto!</span>
                            <div class="payment border-top mt-3 mb-3 border-bottom table-responsive">
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="py-2"> <span class="d-block text-muted">Fecha Orden</span> <span>12 Jan,2018</span> </div>
                                            </td>
                                            <td>
                                                <div class="py-2"> <span class="d-block text-muted">Orden No</span> <span>MT12332345</span> </div>
                                            </td>
                                            <td>
                                                <div class="py-2"> <span class="d-block text-muted">Pago</span> <span>{{target.name_targe}}</span> </div>
                                            </td>
                                            <td>
                                                <div class="py-2"> <span class="d-block text-muted">Email</span> <span>{{user.email}}</span> </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p><strong>Dominio del servidor: </strong>{{server.domain_name}}</p>
                            <p><strong>Url: </strong>{{server.url}}</p>    
                            <hr>                         
                            <div class="product border-bottom table-responsive">
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr v-for="(service,index) in this.shoppingCartInfo" v-bind:key="index">
                                            <td width="20%"> <img src="@/assets/start/img/paquete.png" width="90"> </td>
                                            <td width="60%"> <span class="font-weight-bold">{{service.service}}</span>
                                                <div class="product-qty"> <span class="d-block">Quantity:1</span></div>
                                            </td>
                                            <td width="20%">
                                                <div class="text-right"> <span class="font-weight-bold">{{service.price}}</span> </div>
                                            </td>
                                        </tr>                                       
                                    </tbody>
                                </table>
                            </div>
                            <div class="row d-flex justify-content-end">
                                <div class="col-md-5">
                                    <table class="table table-borderless">
                                        <tbody class="totals">
                                            <tr>
                                                <td>
                                                    <div class="text-left"> <span class="text-muted">Subtotal</span> </div>
                                                </td>
                                                <td>
                                                    <div class="text-right"> <span>${{this.totalPrice.total_price}}</span> </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="text-left"> <span class="text-muted">Shipping Fee</span> </div>
                                                </td>
                                                <td>
                                                    <div class="text-right"> <span>$</span> </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="text-left"> <span class="text-muted">Tax Fee</span> </div>
                                                </td>
                                                <td>
                                                    <div class="text-right"> <span>$</span> </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="text-left"> <span class="text-muted">Discount</span> </div>
                                                </td>
                                                <td>
                                                    <div class="text-right"> <span class="text-success">$</span> </div>
                                                </td>
                                            </tr>
                                            <tr class="border-top border-bottom">
                                                <td>
                                                    <div class="text-left"> <span class="font-weight-bold">Subtotal</span> </div>
                                                </td>
                                                <td>
                                                    <div class="text-right"> <span class="font-weight-bold">${{this.totalPrice.total_price}}</span> </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <p>Enviaremos un email de confirmación cuando se empece con el proceso!</p>
                            <p class="font-weight-bold mb-0">Gracias por tu compra!</p> <span>Web Security App</span>
                        </div>
                        <div class="d-flex justify-content-between footer p-3"> <span>Si necesitas ayuda? visita nuestro <a href="#">centro de ayuda </a></span> <span>03 Octubre, 2021</span> </div>
                    </div>
                </div>
            </div>
    </div>
    </div>

</template>

<script>

import axios from "axios";
import $ from 'jquery';

export default {
    name:'BillingAddress',
   data: function () {
        return {
            errored_l: false,
            errors_l: [],
            succed_l: true,
            success_l: [],
            loading_l: false,
            count: 1,
            shoppingCartInfo: {},
            totalPrice : 0,
            user: {},
            server: {
                state: true,
                domain_name: '',
                url: '',
                ipServer: '',
                user: 1
            },
            target: {
                state: true,
                code_segurity: '',
                number_targe: '',
                name_targe: 'Credito',
                user: 1,
                Invoce: 13
            },
            orderActive: false
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
        get_shopping_info(){            
            const path = 'http://3.14.19.238:8000/shopping/shoppingCartList/';                            
            axios.get(path).then(response => {                
                this.shoppingCartInfo = response.data.shopping;  
                this.totalPrice = this.shoppingCartInfo.pop();
            }).catch(error => {            
                console.log('¡Ocurrio un error!');
            }).finally(() => this.loading_l=false)        
        },
        get_custom_user(){
            const path = 'http://3.14.19.238:8000/usuario/usuario/1';                            
            axios.get(path).then(response => {                
                console.log(response.data);
                this.user = response.data;
                this.loadFormUser();
                // this.shoppingCartInfo = response.data.shopping;  
                // this.totalPrice = this.shoppingCartInfo.pop();
            }).catch(error => {            
                console.log('¡Error al obtener los datos del usuario!');
            }).finally(() => this.loading_l=false)
        },
        loadFormUser(){
            $("#state").val("Cauca").trigger("change");
        },
        goToConfrmation(){
           //this.$router.push('/home/orderconfirmation');
           this.orderActive = true;           
        },
        validateForms(){
            //TODO: validate form billing and after validate payment            
            const path = 'http://3.14.19.238:8000/shopping/buyService/';
            const path_1 = 'http://3.14.19.238:8000/target/server_create/';
            const path_2 = 'http://3.14.19.238:8000/target/target_create/';

            console.log(this.target);
            axios.post(path_1, this.server)
            .then(response => {
                console.log(response);            
                this.succed=true;
                this.success = [];    
                this.success.push({'message': 'Ocurrio un error revise los datos'});
                this.errored = false;
                this.errors = [];                        
            })
            .catch(error => {              
                console.log(error); 
                this.succed=false;             
                this.errored = true;
                this.errors = [];
                this.errors.push({'message':'No se ha podido actualizar la prueba de penetración, revise que el id owasd o el nombre no este repetidos.'});                
            })
            .finally(() => this.loading = false);               

            axios.post(path_2, this.taget)
            .then(response => {
                console.log(response);            
                this.succed=true;
                this.success = [];    
                this.success.push({'message': 'Ocurrio un error revise los datos'});
                this.errored = false;
                this.errors = [];                        
            })
            .catch(error => {              
                console.log(error); 
                this.succed=false;             
                this.errored = true;
                this.errors = [];
                this.errors.push({'message':'Datos de tarjeta invalidos'});                
            })
            .finally(() => this.loading = false);               

            
            axios.post(path).then(response => {     
                console.log('Servicio comprado');                
                this.goToConfrmation();                               
            }).catch(error => {            
                console.log('¡Ocurrio un error!');
                console.log(error);
                this.succed_l = false;
                this.errored_l = true;
                this.errors_l = [];
                this.errors_l.push({
                    message:
                    "¡Validar los datos, ha ocuurrido un error!!!",
                });     
                console.log('EErrorcompra');     
                 this.goToConfrmation();                                                                                         
            }).finally(() => this.loading_l=false)            
        },
        send_billling(){
            //TODO send form
            this.readonly_formbilling();
            $('#btnBilling').prop('disabled', true);
            $('#server').show();
        },
        send_server(){
            this.readonly_formserver();
            $('#btnBackBilling').prop('disabled', true);
            $('#btnServer').prop('disabled', true);
            $('#payment').show();    
            $('#name_targe').val('Credito');        
        },
        readonly_formbilling(){
            $('#name').attr('readonly', true);
            $('#last_name').attr('readonly', true);
            $('#email').attr('readonly', true);
            $('#address').attr('readonly', true);
            $('#country').attr('readonly', true);
            $('#state').attr('readonly', true);
        },
        readonly_formserver(){
            $('#domain_name').attr('readonly', true);
            $('#url').attr('readonly', true);
            $('#ipServer').attr('readonly', true);
        },    
        active_formbilling(){
            $('#server').hide();
            $('#name').attr('readonly', false);
            $('#last_name').attr('readonly', false);
            $('#email').attr('readonly', false);
            $('#address').attr('readonly', false);
            $('#country').attr('readonly', false);
            $('#state').attr('readonly', false);
            $('#btnBilling').prop('disabled', false);            
        },
        active_formserver(){
            $('#payment').hide();
            $('#domain_name').attr('readonly', false);
            $('#url').attr('readonly', false);
            $('#ipServer').attr('readonly', false);
            $('#btnBackBilling').prop('disabled', false);
            $('#btnServer').prop('disabled', false);            
        }
    },
    created() {
        window.addEventListener("scroll", this.color_nav);
    },
    destroyed() {
        window.removeEventListener("scroll", this.color_nav);
    },
    mounted() {
        
        this.color_nav(); 
        this.get_shopping_info();
        this.get_custom_user();                

        $('#state').on('change', function(e) {
            let post = [
                "",
                "76999",                
                "766654",
                "766654",
                "766654"                
            ]                                    
            document.getElementById("zip").value =  post[e.target.selectedIndex];                             
        });
        $('#server').hide();
        $('#payment').hide();                

        $("#credit").change(function() {
            if(this.checked) {
                $('#name_targe').val(this.defaultValue).trigger();
            }
        });
        $("#debit").change(function() {
            if(this.checked) {
                $('#name_targe').val(this.defaultValue).trigger();
            }
        });
        $("#paypal").change(function() {
            if(this.checked) {
                $('#name_targe').val(this.defaultValue).trigger();
            }
        });
    }    
}

</script>

<style scoped>  
.inlineimage {
    max-width: 470px;
    margin-right: 8px;
    margin-left: 10px
}

.images {
    display: inline-block;
    max-width: 98%;
    height: auto;
    width: 22%;
    margin: 1%;
    left: 20px;
    text-align: center
}
.red{        
        color:red;
    }
</style>