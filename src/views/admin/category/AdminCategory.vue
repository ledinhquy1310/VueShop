<template>
  <AdminLayout></AdminLayout>
  <div class="admin-category">
    <h1 class="text-center " style="margin-bottom: 20px;">Danh mục sản phẩm</h1>
    <div v-if="categories.length === 0" class="empty-category">
      <h3 class="empty-category-message">Danh mục sản phẩm trống!</h3>
      <router-link to="/admin/category/add" class="add-category-link">Thêm danh mục mới</router-link>
    </div>
    <div v-else>
      <table class="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>
              <router-link :to="'/admin/category/edit/' + category.id" class="action-button edit-button">Sửa</router-link> |
              <button @click="deleteCategory(category.id)" class="action-button delete-button">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="action-buttons" style="display: flex; justify-content: flex-end;">
        <router-link to="/admin/category/add" class="add-category-link">Thêm danh mục mới</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AdminLayout from "@/components/LayoutAdmin.vue";
import axios from 'axios';

export default {
  name: 'AdminCategory',
  components: {
    AdminLayout
  },
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
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
    deleteCategory(categoryId) {
        if (confirm('Bạn có chắc muốn xóa danh mục này không?')) {
          axios.delete(`http://localhost:3000/categories/${categoryId}`)
            .then(() => {
              this.categories = this.categories.filter(category => category.id !== categoryId);
            })
            .catch(error => {
              console.error('Error deleting category:', error);
            });
        }
      },
  },
};
</script>

<style scoped>
.admin-category {
  padding: 20px;
}

.text-center {
  text-align: center;
}

.empty-category-message {
  text-align: center;
}

.category-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.category-table th,
.category-table td {
  padding: 15px;
}

.category-table thead {
  background-color: #f2f2f2;
}

.add-category-link {
  display: block;
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #3eb51e;
  color: white;
  text-decoration: none;
  width: fit-content;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.add-category-link:hover {
  background-color: #099a3e;
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

.action-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
