<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <router-view></router-view>
    <FooterConponent></FooterConponent>
  </div>
</template>

<script>
import FooterConponent from "@/components/Footer.vue";
import HeaderComponent from "@/components/Header.vue";
export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterConponent
  }
}
</script>

<style>

</style>
