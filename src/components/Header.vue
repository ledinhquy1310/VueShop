<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand m2e-3" to="/">
          <img :src="require(`../assets/img/logo.png`)" style="width: 70px;">
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link " to="/">Trang chủ</router-link>
            </li>
            <li class="nav-item dropdown ms-3">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sản Phẩm
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <router-link class="dropdown-item" :to="{ name: 'ProductCategory', params: { category: 'Fruit'} }">Trái cây</router-link>
                <router-link class="dropdown-item" :to="{ name: 'ProductCategory', params: { category: 'Vegetable'} }">Rau Củ</router-link>
              </ul>
            </li>
          </ul>

          <!-- Di chuyển các nút sang bên phải -->
          <ul class="navbar-nav" id="navbar-right">
            <li v-if="isLoggedIn" class="nav-item">
              <router-link v-if="isUser" class="nav-link" to="/admin/products">Dashboard</router-link>
              <a v-else class="nav-link" @click="showNoPermissionAlert">Dashboard</a>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <a class="nav-link" @click="logout">Đăng xuất</a>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <p class="nav-link text-danger">{{ username }}</p>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/login">Đăng nhập</router-link>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/register">Đăng ký</router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item cart-icon">
              <router-link class="nav-link" to="/cart">
                <i class="fas fa-shopping-cart"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>      
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    isUser() {
      return this.$store.state.user ? this.$store.state.user.role === 'user' : false;
    },
    username() {
      return this.$store.state.user ? this.$store.state.user.name : '';
    }
  },
  methods: {
    logout() {
      this.$store.commit('setLoggedIn', false);
      this.$router.push('/login')
    },
    showNoPermissionAlert() {
  // Kiểm tra xem người dùng đã đăng nhập và có phải là admin không
  if (this.$store.state.isLoggedIn && this.$store.state.user.admin) {
    this.$router.push('/admin/products'); // Chuyển hướng đến trang dashboard của admin
  } else {
    alert("Bạn không đủ thẩm quyền để vào Dashboard!");
  }
  },

  }
}
</script>


<style>
.nav-item:hover {
  background-color: #f8f9fa;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease; /* Thêm hiệu ứng mượt */
  color: #000; /* Thay đổi màu chữ khi di chuột qua */
}

/* Đặt giỏ hàng và các nút đăng nhập, đăng ký sang bên phải */
#navbar-right {
  margin-left: auto;
}

/* Hiệu ứng khi rê chuột qua biểu tượng giỏ hàng */
.cart-icon i {
  font-size: 1.2rem; /* Kích thước biểu tượng giỏ hàng */
  transition: all 0.3s ease; /* Thêm hiệu ứng chuyển động */
}

.cart-icon:hover i {
  transform: scale(1.1); /* Phóng to khi rê chuột qua */
}

/* Style cho thanh tìm kiếm */
.form-control {
  width: 200px; /* Độ rộng thanh tìm kiếm */
}


</style>
