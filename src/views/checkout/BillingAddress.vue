<template>
    <div  class="section-margin">
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
                    <label for="firstName" class="form-label">Nombre<span class="red">*</span></label>
                    <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
                    <div class="invalid-feedback">
                        El nombre es requerido.
                    </div>
                    </div>

                    <div class="col-sm-6">
                    <label for="lastName" class="form-label">Apellido<span class="red">*</span></label>
                    <input type="text" class="form-control" id="lastName" placeholder="" value="" required="">
                    <div class="invalid-feedback">
                        El apellido es requerido.
                    </div>
                    </div>
                

                    <div class="col-12">
                    <label for="email" class="form-label">Email<span class="red">*</span></label>
                    <input type="email" class="form-control" id="email" placeholder="you@example.com">
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

                <button v-on:click="send_billling()" class="w-100 btn btn-primary btn-lg" type="submit">Confirmar dirección de facturación</button>
            </form>

            <hr class="my-4">

            <form id="server">
                <h4 class="mb-3">Datos del Servidor</h4>

                 <div class="col-12">
                    <label for="domain_name" class="form-label">Dominio<span class="red">*</span></label>
                    <input type="text" class="form-control" id="domain_name" placeholder="domain.example" required="">
                    <div class="invalid-feedback">
                        El dominio es requerido.
                    </div>
                </div>

                <div class="col-12">
                    <label for="url" class="form-label">Url<span class="red">*</span></label>
                    <input type="text" class="form-control" id="url" placeholder="https://domain.example" required="">
                    <div class="invalid-feedback">
                        La url es requerida.
                    </div>
                </div>

                <div class="col-12">
                    <label for="ipServer" class="form-label">Ip del servidor<span class="red">*</span></label>
                    <input type="text" class="form-control" id="ipServer" placeholder="127.0.0.1" required="">
                    <div class="invalid-feedback">
                        La ip del servidor es requerida.
                    </div>
                </div>                

                <br>

                <div class="row">
                    <button v-on:click="active_formbilling()" type="button" class="w-100 col btn btn-dark">Paso anterio</button>
                    <button v-on:click="send_server()" class="w-100 col btn btn-primary" type="submit">Confirmar datos del servidor</button>
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
                    <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked="" required="">
                    <label class="form-check-label" for="credit">Credit card</label>
                    </div>
                    <div class="form-check">
                    <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required="">
                    <label class="form-check-label" for="debit">Debit card</label>
                    </div>
                    <div class="form-check">
                    <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required="">
                    <label class="form-check-label" for="paypal">PayPal</label>
                    </div>
                </div>

                <div class="row gy-3">
                    <div class="col-md-6">
                    <label for="cc-name" class="form-label">Name on card</label>
                    <input type="text" class="form-control" id="cc-name" placeholder="" required="">
                    <small class="text-muted">Full name as displayed on card</small>
                    <div class="invalid-feedback">
                        Name on card is required
                    </div>
                    </div>

                    <div class="col-md-6">
                    <label for="cc-number" class="form-label">Credit card number</label>
                    <input type="text" class="form-control" id="cc-number" placeholder="" required="">
                    <div class="invalid-feedback">
                        Credit card number is required
                    </div>
                    </div>

                    <div class="col-md-3">
                    <label for="cc-expiration" class="form-label">Expiration</label>
                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required="">
                    <div class="invalid-feedback">
                        Expiration date required
                    </div>
                    </div>

                    <div class="col-md-3">
                    <label for="cc-cvv" class="form-label">CVV</label>
                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required="">
                    <div class="invalid-feedback">
                        Security code required
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
            totalPrice : 0
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
        goToConfrmation(){
           this.$router.push('/home/orderconfirmation');
        },
        validateForms(){
            //TODO: validate form billing and after validate payment
            const path = 'http://3.14.19.238:8000/shopping/buyService/';                            
            axios.post(path).then(response => {                                
                console.log('Compra');
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
            $('#server').show();
        },
        send_server(){
            //TODO send form            
            this.readonly_formserver();
            $('#payment').show();
        },
        readonly_formbilling(){
            $('#firstName').attr('readonly', true);
            $('#lastName').attr('readonly', true);
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
            $('#firstName').attr('readonly', false);
            $('#lastName').attr('readonly', false);
            $('#email').attr('readonly', false);
            $('#address').attr('readonly', false);
            $('#country').attr('readonly', false);
            $('#state').attr('readonly', false);
        },
        active_formserver(){
            $('#payment').hide();
            $('#domain_name').attr('readonly', false);
            $('#url').attr('readonly', false);
            $('#ipServer').attr('readonly', false);
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