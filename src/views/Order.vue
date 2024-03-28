<template>
  <div class="order container" style="margin-bottom: 160px;">
    <h2 class="text-center mt-3 mb-5">Hóa Đơn</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <h3 class="empty-cart-message">Giỏ hàng trống!</h3>
      <router-link to="/" class="back-to-shopping">Quay lại mua sắm</router-link>
    </div>
    <div v-else>
      <div class="row">
        <!-- Thông tin đơn hàng -->
        <div class="col-md-6">
          <h3 class="order-info-heading">Thông tin đơn hàng</h3>
          <table class="order-table">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng cộng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cartItems" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ formatPrice(item.price) }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ formatPrice(item.price * item.quantity) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="total">
            <strong>Tổng tiền:</strong> {{ formatPrice(totalPrice) }}
          </div>
        </div>

        <!-- Thông tin thanh toán -->
        <div class="col-md-6">
          <div class="checkout-form">
            <h3 class="payment-info-heading">Thông tin thanh toán</h3>
            <form @submit.prevent="confirmOrder">
              <div class="form-group">
                <label for="fullname" class="label">Họ và tên:</label>
                <input type="text" v-model="username" required class="form-input">
              </div>
              <div class="form-group">
                <label for="phone" class="label">Số điện thoại:</label>
                <input type="text" v-model="phone" required class="form-input">
              </div>
              <div class="form-group">
                <label for="address" class="label">Địa chỉ:</label>
                <input type="text" v-model="address" required class="form-input">
              </div>
              <button type="submit" class="order-button">Xác nhận đơn hàng</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'OrderView',
  computed: {
    username() {
      return this.$store.state.user ? this.$store.state.user.name : '';
    },
    phone() {
      return this.$store.state.user ? this.$store.state.user.phone : '';
    },
    address() {
      return this.$store.state.user ? this.$store.state.user.address : '';
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const cartItems = computed(() => store.getters.cartItems);
    const totalPrice = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
    });

    const formatPrice = (price) => {
      return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    let fullname = '';
    let phone = '';
    let address = '';

    const getUserInfo = async () => {
      try {
        const userId = store.state.user.id;
        const response = await axios.get(`http://localhost:3000/Users/${userId}`);
        const userInfo = response.data;
        console.log(userInfo);
        fullname = userInfo.name;
        phone = userInfo.phone;
        address = userInfo.address;
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    const confirmOrder = () => {
  const order = {
    fullname,
    phone,
    address,
    items: cartItems.value,
    totalPrice: totalPrice.value,
  };

  axios.post('http://localhost:3000/Orders', order)
    .then(() => {
      store.commit('clearCart'); // Xóa các mục khỏi giỏ hàng
      localStorage.removeItem('cartItems'); // Xóa dữ liệu từ localStorage
      router.push('/');
      // Hiển thị thông báo khi xác nhận thành công
      alert('Xác nhận đơn hàng thành công!');
    })
    .catch(error => {
      console.error('Error confirming order:', error);
      // Hiển thị thông báo khi có lỗi xác nhận thanh toán
      alert('Đã xảy ra lỗi khi xác nhận thanh toán!');
    });
};


    getUserInfo();

    return {
      cartItems,
      formatPrice,
      totalPrice,
      fullname,
      confirmOrder
    };
  }
};
</script>




<style scoped>
.order-container {
  margin: 20px;
}

.order-heading {
  margin-bottom: 20px;
}

.order-info-heading {
  margin-top: 0;
  margin-bottom: 20px;
}

.total {
  margin-top: 20px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th,
.order-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.order-table th {
  background-color: #f2f2f2;
}

.order-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.order-table tr:hover {
  background-color: #ddd;
}

.checkout-form {
  padding-left: 20px;
}

.label {
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
}

.order-button {
  background-color: #3eb51e ;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.order-button:hover {
  background-color: #099a3e;
}

.empty-cart {
  margin-top: 20px;
}

.back-to-shopping {
  color: #09ff00;
  text-decoration: none;
}

.back-to-shopping:hover {
  text-decoration: underline;
}
</style>