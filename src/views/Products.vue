<template>
  <div class="container text-center">
    <SearchComponent @search="handleSearch"></SearchComponent>
    <h3 class="pb-3 pt-3">Sản Phẩm</h3>
    <div class="row">
      <div class="col-lg-3 col-md-4" v-for="product in filteredProducts" :key="product.name">
        <div class="card products">
          <div class="card-header">
            <h3>{{ product.name }}</h3>
          </div>
          <div class="card-body"><img :src="`${product.img}`"></div>
          <div class="card-footer">
            <h4>{{ formatPrice(product.price) }}</h4>
            <button class="btn btn-success">
              <router-link class="nav-link" :to="'/product/' + product.id">Xem chi tiết</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchComponent from '@/components/Search.vue';
import axios from 'axios';

export default {
  name:"ProductsView",
  components: {
    SearchComponent
  },
  data() {
    return {
      products: [],
      searchTerm: ''
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
    formatPrice(price) {
      return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchProducts();
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}

.pb-3 {
  padding-bottom: 1rem;
}

.pt-3 {
  padding-top: 1rem;
}

.card {
  width: 250px;
  text-align: center;
  margin-bottom: 20px;
  border: 1px solid #ccc; 
  border-radius: 10px; 
}

.card-header {
  background-color: #f0f0f0; 
  padding: 10px;
  border-bottom: 1px solid #ccc; 
}

.card-body {
  height: 250px;
  display: flex;
  justify-content: center; 
  align-items: center;
}

.card-body img {
  max-width: 100%; 
  max-height: 100%;
}

.card-footer {
  padding: 10px;
  background-color: #f0f0f0;
  border-top: 1px solid #ccc; 
  border-bottom-left-radius: 10px; 
  border-bottom-right-radius: 10px;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
  border: none; 
  border-radius: 5px;
  padding: 5px 15px; 
  cursor: pointer;
}

.btn-success:hover {
  background-color: #218838; 
}
</style>

