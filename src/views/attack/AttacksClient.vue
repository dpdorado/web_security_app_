<template>
    <section class="section-margin">
      <div class="container">  
        Hola Mundo attacks
      </div>
    </section>      
</template>

<script>
export default {
    name:'AttacksClient',
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
</style>
