<template>
  <div class="container mb-4">
    <h2 class="form-title">Edit Product</h2>
    <form @submit.prevent="updateProduct" class="edit-product-form">
      <div class="form-group">
        <label for="name" class="form-label">Name:</label>
        <input type="text" class="form-control" id="name" v-model="product.name" required>
      </div>
      <div class="form-group">
        <label for="description" class="form-label">Description:</label>
        <textarea class="form-control" id="description" v-model="product.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="price" class="form-label">Price:</label>
        <input type="number" class="form-control" id="price" v-model.number="product.price" required>
      </div>
      <div class="form-group">
        <label for="image" class="form-label">Product Image:</label>
        <input type="file" class="form-control-file" id="image" @change="handleImageInput">
      </div>
      <button type="submit" class="btn btn-primary">Update Product</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditProduct',
  data() {
    return {
      product: {
        id: '',
        name: '',
        description: '',
        price: 0,
        img: ''
      },
      selectedImage: null
    };
  },
  created() {
    // Lấy thông tin sản phẩm từ API hoặc store Vuex
    const productId = this.$route.params.id;
    this.getProduct(productId);
  },
  methods: {
    getProduct(productId) {
      axios.get(`http://localhost:3000/products/${productId}`)
        .then(response => {
          this.product = response.data;
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          alert('Error fetching product: ' + error.message);
        });
    },
    handleImageInput(event) {
      const fileList = event.target.files;
      if (fileList && fileList.length > 0) {
        this.selectedImage = fileList[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.product.img = reader.result;
        };
        reader.readAsDataURL(this.selectedImage);
      }
    },
    updateProduct() {
      axios.put(`http://localhost:3000/products/${this.product.id}`, this.product)
        .then(response => {
          console.log('Chỉnh sửa sản phẩm thành công:', response.data);
          alert('Chỉnh sửa sản phẩm thành công!');
          this.$router.push('/admin/products'); 
        })
        .catch(error => {
          console.error('Chỉnh sửa sản phẩm không thành công:', error);
          alert('Chỉnh sửa sản phẩm không thành công: ' + error.message);
        });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.form-title {
  margin-bottom: 20px;
}

.edit-product-form {
  width: 50%;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

textarea.form-control {
  height: 100px;
}

.form-control-file {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  padding: 10px 20px;
  background-color: #3eb51e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #099a3e;
}
</style>
