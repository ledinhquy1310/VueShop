<template>
    <div>
    <AdvertisementView></AdvertisementView>
        <Products></Products>

    </div>
</template>
<script>
import Products from './Products.vue';
import AdvertisementView from "@/components/Advertisement.vue"

export default {
  name: 'HomeView',
  components: {
    AdvertisementView,
    Products
  }
}
</script>
<style>
</style>