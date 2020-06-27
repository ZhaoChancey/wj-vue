<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/> <!--这里和 App.vue 一样，写入了一个 <router-view/>，也就是子页面（组件）显示的地方。-->
  </div>
</template>

<script>
  import NavMenu from './common/NavMenu'
  export default {
    name: 'Home',
    components: {NavMenu}
  }
</script>

<style scoped>

</style>
