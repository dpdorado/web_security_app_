<template>       
    <section class="hero-banner mb-30px">
        <div class="container">
            <div class="row">
            <div class="col-lg-7">
                <div class="hero-banner__img">
                <img class="img-fluid" src="@/assets/start/img/banner/hero-banner.png" alt="No img">
                </div>
            </div>
            <div class="col-lg-5 pt-5">
                <div class="hero-banner__content">
                <h1>Web Security App</h1>
                <p> Ofrecemos el mejor servicio de pruebas de penetración como servicio en la nube y contamos con la disponibilidad de las 95 pruebas de penetración según el OWASP.</p>
                <router-link class="button bg" v-bind:to="'/home/services/packages'">Comenzar</router-link>
                </div>
            </div>
            </div>
        </div>
    </section>    

    
</template>

<script>
export default {
  name: 'HeroBannerHome',  
  components: {
    
  },
  methods: {
    
  }
}
</script>