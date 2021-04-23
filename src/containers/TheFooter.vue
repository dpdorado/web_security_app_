<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://coreui.io" target="_blank">Web Security App</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}.</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="">DD</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
