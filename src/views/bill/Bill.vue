<template>
    <section class="section-margin">
      <div class="container">  
        <div class="card">
          <div class="card-body">          
            <div class="row">
              <div class="col">
                <router-link class="" v-bind:to="'/home'"><img src="@/assets/start/img/web_security_app_.png" alt="" width="150" height="50"></router-link>            
              </div>  
              
              <div class="col text-right">
                <h2>FACTURA</h2>
                <h3><small>Factura #001</small></h3>
              </div>
            </div>        

            <hr />         
        
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-header background">
                    <div class="row">
                      <div class="col-md-2 font-weight-bold">De : </div>                
                      <div class="col-md-10 font-weight-bold text-primary">Web Security App</div>
                    </div>                
                  </div>
                  <div class="card-body">               
                    <div class="card-text">Dirrección: </div>
                    <div class="card-text">Detalles: </div>
                    <div class="card-text">Más detalles: </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card">
                  <div class="card-header background">
                    <div class="row">
                      <div class="col-md-8 font-weight-bold  text-right">Para : </div>                
                      <div class="col-md-4 font-weight-bold text-primary  text-left">Cliente</div>
                    </div>   
                  </div>
                  <div class="card-body">
                    <div class="card-text">Dirrección: </div>
                    <div class="card-text">Detalles: </div>
                    <div class="card-text">Más detalles: </div>
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
                  <tr>
                    <td>Artículo</td>
                    <td><a href="#"> Título de su artículo aquí </a></td>
                    <td class=" text-right ">-</td>
                    <td class=" text-right ">200.00 €</td>
                    <td class=" text-right ">200.00 €</td>
                  </tr>
                  <tr>
                    <td>Plantilla de diseño</td>
                    <td><a href="#"> Detalles del proyecto aquí </a></td>
                    <td class="text-right">10</td>
                    <td class="text-right ">75.00 €</td>
                    <td class="text-right ">750.00 €</td>
                  </tr>
                  <tr>
                    <td>Desarrollo</td>
                    <td><a href="#"> Plugin WordPress </a></td>
                    <td class="text-right ">5</td>
                    <td class="text-right">50.00 €</td>
                    <td class="text-right">250.00 €</td>
                  </tr>
                  <tr></tr>
                  <tr class="border-hidden">
                    <td class="border-hidden" ></td>
                    <td class="border-hidden" ></td>
                    <td class="border-hidden"></td>
                    <td class="text-right font-weight-bold border-hidden">Sub Total:</td>
                    <td class="text-right font-weight-bold border-hidden">1,200.00 €</td>
                  </tr>
                  <tr class="border-hidden">
                    <td class="border-hidden" ></td>
                    <td class="border-hidden" ></td>
                    <td class="border-hidden"></td>
                    <td class="text-right font-weight-bold border-hidden">Impuestos (IVA 21%):</td>
                    <td class="text-right font-weight-bold border-hidden">252.00 €</td>
                  </tr>
                  <tr class="border-hidden">
                    <td class="border-hidden" ></td>
                    <td class="border-hidden" ></td>
                    <td class="border-hidden"></td>
                    <td class="text-right font-weight-bold border-hidden">Total:</td>
                    <td class="text-right font-weight-bold border-hidden">1,452.00 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <hr/>

            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-header background">                
                    <div class="font-weight-bold">Datos bancarios</div> 
                  </div>
                  <div class="card-body">               
                    <div class="card-text">Su nombre </div>
                    <div class="card-text">Nombre del banco: </div>
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
                    <div class="card-text">Email: usted@ejemplo.com </div>
                    <div class="card-text">Móvil: +92123456789</div>
                    <div class="card-text">Twitter: <a href="https://twitter.com/suTwitter">@suTwitter</a></div>
                    <div class="card-text">Suweb: <a href="http://www.suweb.com/author/usted"> http: //www. suweb.com/author/usted / </a></div>
                    <div class="card-text"> El pago debe ser por transferencia bancaria</div>                                
                  </div>
                </div>
              </div>
            </div>
            <hr/>
          </div>
          
          <div class="row">
            <div class="col text-right">
              <img src="@/assets/start/img/barras.png" alt="" width="200" height="80">
            </div>     
            <div class="col">
              <router-link class="" v-bind:to="'/home'"><img src="@/assets/start/img/web_security_app_.png" alt="" width="120" height="30"></router-link>            
              <p>DD</p>
            </div>          
          </div>          
        </div>        
      </div>
    </section>      
</template>

<script>
export default {
    name:'Bill',
    methods:{
      color_nav(){
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 ) {        
            document.getElementById("navbar").style.backgroundColor = "#22195b";                        
        } else {
            document.getElementById("navbar").style.backgroundColor = "#22195b";        
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
      this.color_nav();
    }
}


</script>

<style scoped>
  .background{
    background-color: #F2F2F2;
  }
  .border-hidden{
    border: hidden;
  }
</style>
