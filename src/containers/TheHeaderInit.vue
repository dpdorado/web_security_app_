
<template>
  <header class="header_area">
    <div id="navbar" class="main_menu fixed-top">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container box_1620">
          <!-- Brand and toggle get grouped for better mobile display -->
          <a class="navbar-brand logo_h" href="index.html"><img src="@/assets/start/img/logo.png" alt=""></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
            <ul class="nav navbar-nav menu_nav justify-content-end">
              <li class="nav-item active"><router-link class="nav-link" v-bind:to="'/home'">Home</router-link></li>               
              <li class="nav-item"><a class="nav-link" href="feature.html">Feature</a></li> 
              <li class="nav-item"><a class="nav-link" href="pricing.html">Price</a>
              <li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                  aria-expanded="false">Pages</a>
                <ul class="dropdown-menu">
                  <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
                  <li class="nav-item"><a class="nav-link" href="blog-details.html">Blog Details</a></li>
                </ul>
							</li>
              <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
            </ul>

            <!--<ul class="navbar-right">              
              <li class="nav-item">
                <button class="button button-header bg">Sign in</button>                
              </li>              
            </ul>-->
            <ul class="navbar-right">                            
              <li class="col nav-item">                
                <button v-on:click="sign_in()" class="button button-header bg">Sign in</button>                
              </li>               
            </ul>
          </div> 
        </div>
      </nav>
    </div>
  </header>
</template>

<script>

export default {
  name: 'TheHeaderInit',
  components: {    
  },
  created () {
    window.addEventListener('scroll', this.scrollFunction);
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollFunction);
  },
  methods:{    
    scrollFunction() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 ) {        
        document.getElementById("navbar").style.backgroundColor = "#412fb3";                        
      } else {
        document.getElementById("navbar").style.backgroundColor = "transparent";        
      }
    },
    sign_in(){
      this.$router.push('/pages/login')
    }
  }
}
</script>

<style scoped>

</style>

