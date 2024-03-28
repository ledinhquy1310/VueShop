<template>
  <AdminLayout></AdminLayout>
  <div class="admin-product">
    <h1 class="title">Danh sách sản phẩm</h1>
    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="product-row">
          <td>{{ product.id }}</td>
          <td><img :src="`${product.img}`" alt="Product Image" class="product-image"></td>
          <td>{{ product.name }}</td>
          <td>{{ formatPrice(product.price) }}</td>
          <td>
            <router-link :to="'/admin/product/edit/' + product.id" class="action-button edit-button">Sửa</router-link> |
            <button @click="confirmDelete(product.id)" class="action-button delete-button">Xóa</button>
          </td>
          
        </tr>
      </tbody>
    </table>
    <div class="action-buttons" style="display: flex; justify-content: flex-end;">
      <router-link to="/admin/product/add" class="add-product-link">Thêm sản phẩm mới</router-link>
    </div>
    
  </div>
</template>

<script>
import AdminLayout from "@/components/LayoutAdmin.vue";
import axios from 'axios';

export default {
  name: 'AdminProduct',
  components:{
    AdminLayout
  },
  data() {
    return {
      products: []
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:3000/products')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    formatPrice(price) {
      return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    },
    confirmDelete(productId) {
      if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
        this.deleteProduct(productId);
      }
    },
    deleteProduct(productId) {
      axios.delete(`http://localhost:3000/products/${productId}`)
        .then(() => {
          // Xóa sản phẩm khỏi danh sách và cập nhật giao diện
          this.products = this.products.filter(product => product.id !== productId);
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    }
  }
};
</script>

<style scoped>
.admin-product {
  padding: 20px;
}

.title {
  margin-bottom: 20px;
  text-align: center;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.product-table th, .product-table td {
  padding: 15px;
}

.product-table thead {
  background-color: #f2f2f2;
}


.product-image {
  max-width: 100px;
  display: block;
  margin: 0 auto;
}

.action-link {
  color: blue;
  text-decoration: none;
  margin-right: 10px;
  transition: color 0.3s;
}

.action-link:hover {
  color: darkblue;
}

.action-button {
  padding: 8px 12px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  text-decoration: none; 
}

.action-button:hover {
  filter: brightness(90%);
}

.edit-button {
  background-color: blue;
}

.delete-button {
  background-color: red;
}




.add-product-link {
  display: block;
  margin-top: 20px;
  padding: 12px 20px;
  background-color:  #3eb51e;
  color: white;
  text-decoration: none;
  width: fit-content;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.add-product-link:hover {
  background-color: #099a3e;
}
</style>
