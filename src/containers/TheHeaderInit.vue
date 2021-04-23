
<template>    
<!--================Header Menu Area =================-->
  <CHeader>
    <nav class="navbar navbar-expand-lg navbar-light bg-light col">
      <div class="container">    
      
        <a class="navbar-brand" href="@/assets/start/img/logo.png">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse navbar-right" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto ">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Feature</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Price</a>
            </li>            
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pages
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Contact</a>
            </li>
          </ul>      
          <ul class="navbar-right">                         
            <button class="button mr-3">Sign in</button>
            <button class="button">Sign up</button>
          </ul>             
        </div>
      </div>
    </nav>      
  </CHeader>  
</template>

<script>

export default {
  name: 'TheHeaderInit',
  components: {    
  }
}
</script>

<style scoped>



</style>

