<template>
  <div class="admin-dashboard text-center">
    <header>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul class="nav-links mt-4">
          <li><router-link to="/admin/products">Quản lí sản phẩm</router-link></li>
          <li><router-link to="/admin/order">Quản lí hóa đơn</router-link></li>
          <li><router-link to="/admin/category">Quản lí danh mục</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
/* Styling for the admin layout */
.admin-dashboard {
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}

header {
  background-color: #37474F;
  color: #fff;
  padding: 20px;
}

h1 {
  margin: 0;
  font-size: 30px;
}

nav {
  display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
}

.nav-links {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
}

.nav-links li {
  margin-right: 20px;
}

.nav-links li:last-child {
  margin-right: 0; /* Xóa margin phải của phần tử cuối cùng */
}

.nav-links li a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-links li a:hover {
  color: #FFC107;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #ECEFF1;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
