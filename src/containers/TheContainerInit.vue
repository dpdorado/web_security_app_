<template>
  <div class="c-app row">        
    <TheHeader />         
    <main class="col-12">            
        <transition name="fade" mode="out-in">
          <router-view :key="$route.path"></router-view>
        </transition>              
    </main>    
    <TheFooter class="col-12"/>            
  </div>  
</template>

<script>

import TheHeader from './TheHeaderInit'
import TheFooter from './TheFooterInit'

import "@/assets/start/css/style.css";

export default {
  name: 'TheContainerInit',
  components: {
    //TheSidebar,
    TheHeader,
    TheFooter
  },
  mounted() {        
    }
}
</script>

<style scoped>
  .red{        
      color:red;
  }
</style>