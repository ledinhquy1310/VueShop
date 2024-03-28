<template>
  <div class="edit-category">
    <h2 class="text-center">Edit Category</h2>
    <form @submit.prevent="editCategory" class="edit-category-form">
      <div class="form-group">
        <label for="name">Category Name:</label>
        <input type="text" v-model="categoryName" id="name" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary mb-3">Save Changes</button>
      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    </form>
    <div class="back-link-container">
      <router-link to="/admin/category" class="back-link" >Quay lại</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categoryId: '', // ID của danh mục được chỉnh sửa
      categoryName: '', // Tên mới của danh mục
      successMessage: '', // Thông báo thành công
      errorMessage: '' // Thông báo lỗi
    };
  },
  methods: {
    editCategory() {
      // Kiểm tra xem tên danh mục đã được nhập hay chưa
      if (!this.categoryName) {
        this.errorMessage = 'Vui lòng nhập tên danh mục';
        return;
      }

      const editedCategory = {
        name: this.categoryName
      };

      axios.put(`http://localhost:3000/categories/${this.categoryId}`, editedCategory)
        .then(response => {
          console.log('Cập nhập danh mục thành công:', response.data);
          // Cập nhật thông báo thành công và xóa thông báo lỗi (nếu có)
          this.successMessage = 'Cập nhập danh mục thành công';
          this.errorMessage = '';
          // Điều hướng người dùng đến trang quản lý danh mục sau khi chỉnh sửa thành công
          // this.$router.push('/admin/category');
        })
        .catch(error => {
          console.error('Cập nhập danh mục không thành công:', error);
          // Cập nhật thông báo lỗi và xóa thông báo thành công (nếu có)
          this.errorMessage = 'Cập nhập danh mục không thành công';
          this.successMessage = '';
        });
    }
  },
  created() {
    this.categoryId = this.$route.params.id;
  }
};
</script>


<style scoped>
.edit-category {
  margin: 20px;
}

.edit-category-form {
  width: 50%;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  background-color: #3eb51e;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #099a3e;
}

.back-link-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

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

.back-link:hover {
  background-color: #099a3e;
}
</style>
