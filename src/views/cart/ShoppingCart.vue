<template>
    <section class="hero-banner hero_banner_tam mb-30px">        
        <div class="container">  
            <div class="hero-banner--sm__content">
                <h1>Cargando...</h1>                 
            </div>                                                  
        </div>
    </section>      
</template>

<script>

import axios from "axios";
import ShoppingCartEmpty from './ShoppingCartEmpty'
import ShoppingCartList from './ShoppingCartList'

export default {
    name:'ShoppingCart',
    components: {    
        ShoppingCartEmpty,
        ShoppingCartList
    },
    data () {
      return {       
        shoppingCartInfo: {}
      }
    }, 
    methods:{
        redirect(route){
            this.$router.push(route);
        },
        shopping_cart_info(){
            console.log('entrando:    dsdcsd');
            const path = 'http://3.14.19.238:8000/shopping/shoppingCartList/';                            
            axios.get(path).then(response => {                
                this.shoppingCartInfo = response.data.shopping;                                           
                
                if (this.shoppingCartInfo.length > 1){
                    this.redirect('/home/shoppingcartlist');
                }else{
                    this.redirect('/home/shoppingcartempty');
                }
            }).catch(error => {            
                console.log('¡Ocurrio un error!');
            }).finally(() => this.loading_l=false)                                   
        }
    },
    mounted() {          
      this.shopping_cart_info()
    }
}


</script>

<style scoped>    
</style>
