<template>
    <div class="container form">
      <div class="details">
        <h2 class="text-center">Đăng nhập</h2>
        <form @submit.prevent="submit">
          <div class="input-container">
            <label>Email</label>
            <div>
              <input type="email" placeholder="Email" v-model="email" autocomplete="username">
            </div>
          </div>
          <div class="input-container">
            <label>Mật Khẩu</label>
            <div>
              <input type="password" placeholder="Password" v-model="password" autocomplete="current-password">
            </div>
          </div>
          <div class="button">
            <button type="submit">Đăng nhập</button>
          </div>
          <div v-if="errorMessage" class="error-message text-center">
            {{ errorMessage }}
          </div>
          <div v-if="successMessage" class="success-message text-center">
            {{ successMessage }}
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
  
  export default {
    name: "LoginView",
  
    setup() {
      const email = ref('');
      const password = ref('');
      const successMessage = ref('');
      const errorMessage = ref('');
      const router = useRouter();
      const store = useStore();
  
      const submit = async () => {
        // Kiểm tra nếu email hoặc mật khẩu không được nhập
        if (!email.value || !password.value) {
          errorMessage.value = 'Vui lòng nhập email và mật khẩu.';
          hideErrorMessage();
          return;
        }
  
        // Kiểm tra xem email có đúng định dạng của Gmail hay không
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email.value)) {
          errorMessage.value = 'Vui lòng nhập địa chỉ email Gmail hợp lệ.';
          hideErrorMessage();
          return;
        }
  
        try {
          const response = await axios.get('http://localhost:3000/Users');
          const users = response.data;
          const user = users.find(u => u.email === email.value && u.password === password.value);
  
          if (user) {
            successMessage.value = "Chúc Mừng Bạn Đăng Nhập Thành Công!";
            store.commit('setLoggedIn', true);
            store.commit('setUser', user);
            setTimeout(() => {
              if (user.admin) {
                router.push('/admin/products');
              } else {
                router.push('/');
              }
            }, 2000);
          } else {
            errorMessage.value = 'Tài khoản hoặc mật khẩu không đúng. Vui lòng nhập lại.';
            hideErrorMessage();
          }
        } catch (error) {
          console.error('Error:', error);
          errorMessage.value = 'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.';
          hideErrorMessage();
        }
      };
  
      const hideErrorMessage = () => {
        setTimeout(() => {
          errorMessage.value = '';
        }, 3000); // ẩn thông báo sau 5 giây
      };
  
      return {
        email,
        password,
        submit,
        errorMessage,
        successMessage
      };
    }
  };
  </script>
  
  <style>
  .error-message {
    color: red;
    margin-top: 5px;
  }
  .success-message {
    color: green;
    margin-top: 5px;
  }
  </style>
  