<template>
  <div class="c-app">
    <TheSidebar/>
    <CWrapper>
      <TheHeader/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade" mode="out-in">
              <router-view :key="$route.path"></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <TheFooter/>
    </CWrapper>
  </div>
</template>

<script>
import TheSidebar from './TheSidebarInit'
import TheHeader from './TheHeaderInit'
import TheFooter from './TheFooterInit'
//import "@/assets/start/css/style.css";

export default {
  name: 'TheContainerInit',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter
  },
  mounted() {        
    }
}
</script>

<style scoped>
</style>