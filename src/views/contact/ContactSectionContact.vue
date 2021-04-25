<template>       
  <section class="section-margin">
    <div class="container">      
      <div class="row">
        <h1 style="text-align: center;">Ubicación de las oficinas de  Web Security App</h1>
        <GoogleMap :latitude= 2.4422295 :longitude= -76.6072368 :title="'Popayán'" />
      </div>      

      <br>

      <div class="row">
        <div class="col-md-4 col-lg-3 mb-4 mb-md-0">
          <div class="media contact-info">
            <span class="contact-info__icon"><i class="ti-home"></i></span>
            <div class="media-body">
              <h3>Colombia</h3>
              <p>Popayán - Cauca</p>
            </div>
          </div>
          <br>
          <div class="media contact-info">
            <span class="contact-info__icon"><i class="ti-headphone"></i></span>
            <div class="media-body">
              <h3><a href="Cel: 316 3270 921">316 3270 921</a></h3>
              <p>Barrio centro</p>
            </div>
          </div>
          <br>
          <div class="media contact-info">
            <span class="contact-info__icon"><i class="ti-email"></i></span>
            <div class="media-body">
              <h3><a href="mailto:web_security_app@gmail.com">web_security_app@gmail.com</a></h3>
              <p>¡Envíanos tu consulta en cualquier momento!</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-8 col-lg-9">
          <form action="#/" class="form-contact contact_form" method="post" id="contactForm" novalidate="novalidate">
            <div class="row">
              <div class="col-lg-5">
                <div class="form-group">
                  <label for="name">Nombre:<span class="red">*</span></label>                                     
                  <input class="form-control" name="name" id="name" type="text" placeholder="Ingrese su nombre">
                </div>
                <div class="form-group">
                  <label for="email">E-mail:<span class="red">*</span></label>                                     
                  <input class="form-control" name="email" id="email" type="email" placeholder="Ingrese su e-mail">
                </div>
                <div class="form-group">
                   <label for="subject">Asunto:<span class="red">*</span></label>                                     
                  <input class="form-control" name="subject" id="subject" type="text" placeholder="Ingrese el asunto">
                </div>
              </div>
              <div class="col-lg-7">
                <div class="form-group">
                     <label for="message">Mensaje:<span class="red">*</span></label>                                     
                    <textarea class="form-control different-control w-100 overflow-auto" name="message" id="message" cols="30" rows="9" placeholder="Ingrese el mensaje"></textarea>                    
                </div>
              </div>
            </div>
            <div class="form-group text-center text-md-right mt-3">
              <button type="submit" class="button button-contactForm">Enviar mensaje</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GoogleMap from "../maps/GoogleMap";

export default {
  name: 'ContactSectionContact',  
  components: {
    GoogleMap
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .red{        
      color:red;
  }
</style>