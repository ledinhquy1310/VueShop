<template>
  <div class="add-category">
    <h2 class="text-center">Thêm danh mục mới</h2>
    <form @submit.prevent="addCategory" class="form">
      <div class="form-group">
        <label for="categoryName" class="label">Tên danh mục:</label>
        <input type="text" id="categoryName" v-model="categoryName" class="input" required>
        <span v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</span>
      </div>
      <button type="submit" class="submit-button">Thêm danh mục</button>
      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    </form>
    <router-link to="/admin/category" class="back-link">Quay lại</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddCategory',
  data() {
    return {
      categoryName: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    addCategory() {
      // Reset error and success messages
      this.errorMessage = '';
      this.successMessage = '';

      // Check if category name is provided
      if (!this.categoryName) {
        this.errorMessage = 'Vui lòng nhập tên danh mục.';
        return;
      }

      axios.post('http://localhost:3000/categories', { name: this.categoryName })
        .then(() => {
          this.successMessage = 'Thêm danh mục thành công!';
          this.categoryName = ''; // Clear input field
          // Redirect to category management page after successful addition
          this.$router.push('/admin/category');
        })
        .catch(error => {
          console.error('Error adding category:', error);
          this.errorMessage = 'Đã xảy ra lỗi khi thêm danh mục!';
        });
    },
  },
};
</script>



<style >
.alert-danger {
  margin-top: 5px;
}
.alert-success {
  margin-top: 5px;
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: .75rem 1.25rem;
  margin-top: 5px;
  border: 1px solid transparent;
  border-radius: .25rem;
}
.add-category {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  max-width: 400px;
}

.text-center {
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
}

.submit-button,
.back-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3eb51e;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.submit-button:hover,
.back-link:hover {
  background-color: #099a3e;
}
</style>
