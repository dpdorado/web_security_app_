<template>       
 <section class="hero-banner hero-banner--sm mb-30px">
    <div class="container">
      <div class="hero-banner--sm__content">
        <h1>Contactanos</h1>
        <nav aria-label="breadcrumb" class="banner-breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link class="" v-bind:to="'/home'">Home</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">Contacto
              <!--<a class="sr-only sr-only-focusable" href="#contenido">Ir al contenido</a>-->
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroBannerContact',  
  components: {
    
  },
  methods: {
    
  }
}
</script>