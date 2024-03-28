<template>
  <div class="container mb-4">
    <h2 class="form-title">Thêm sản phẩm</h2>
    <form @submit.prevent="addProduct" class="add-product-form">
      <div class="form-group">
        <label for="name" class="form-label">Tên sản phẩm:</label>
        <input type="text" class="form-control" id="name" v-model="product.name" required>
      </div>
      <div class="form-group">
        <label for="description" class="form-label">Mô tả:</label>
        <textarea class="form-control" id="description" v-model="product.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="price" class="form-label">Giá:</label>
        <input type="number" class="form-control" id="price" v-model.number="product.price" required>
      </div>
      <div class="form-group">
        <label for="image" class="form-label">Ảnh:</label>
        <input type="file" class="form-control-file" id="image" @change="handleImageInput" accept="image/*" required>
      </div>
      <div class="form-group">
        <label for="category" class="form-label">Danh mục:</label>
        <select class="form-control" id="category" v-model="product.category" required>
          <option value="" disabled>Vui lòng chọn</option>
          <option v-for="category in categories" :value="category.name" :key="category.id">{{ category.name }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Thêm</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddProduct',
  data() {
    return {
      product: {
        name: '',
        description: '',
        price: 0,
        img: '',
        category: ''
      },
      selectedImage: null,
      categories: []
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios.get('http://localhost:3000/categories')
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
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
    addProduct() {
      this.product.id = this.generateId();
      axios.post('http://localhost:3000/products', this.product)
        .then(response => {
          console.log('Thêm sản phẩm thành công:', response.data);
          alert('Thêm sản phẩm thành công!');
          this.$router.push('/admin/products'); 
        })
        .catch(error => {
          console.error('Thêm sản phẩm không thành công', error);
          alert('Thêm sản phẩm không thành công ' + error.message);
        });
    },
    generateId() {
      return Math.random().toString(36).substr(2, 9);
    },
    isFormValid() {
      return (
        this.product.name &&
        this.product.description &&
        this.product.price &&
        this.selectedImage &&
        this.product.category
      );
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

.add-product-form {
  width: 50%;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.form-title {
  margin-bottom: 20px;
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
