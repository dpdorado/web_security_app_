<template>
    <section class="hero-banner hero_banner_tam mb-30px">
        <div class="container">  
            <div class="hero-banner--sm__content">
                <h1>Tu carrito está vacío</h1>
                <p>En Web security App tenemos 95 puebas de penetración y más de 20 paquetes de pruebas para que elijas de acuerdo a tus necesidades.</p>
                <p><em class="cil-check-alt"/> Tu compra es 100 % segura</p>
                <nav aria-label="breadcrumb" class="banner-breadcrumb">
                    <ul>                                            
                        <li class="nav-item">                             
                            <button v-on:click="keep_shopping()" class="button button-header bg"><em class="cil-cart"/> Sigue comprando</button>                             
                        </li>   
                    </ul>                
                </nav>               
            </div>                                      
        </div>
    </section>      
</template>

<script>
export default {
    name:'ShoppingCartEmpty',
    methods:{
        keep_shopping(){
            this.$router.push('/home/services/attacks');
        }
    }
}


</script>

<style scoped>
    body{
     padding: 2rem 0rem;
    }
    .hero_banner_tam{
        height:700px;        
    }       
</style>
