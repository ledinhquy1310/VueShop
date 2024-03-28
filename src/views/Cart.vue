<template>
  <div class="container" style="margin-bottom: 360px;">
    <div v-if="isEmptyCart" class="empty-cart">
      <h2 class="text-danger">Không có sản phẩm trong giỏ hàng!</h2>
    </div>
    <div v-else class="cart">
      <h1 class="text-center mt-5 mb-5">Giỏ hàng của bạn</h1>
      <table>
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="index">
            <td><img :src="`${item.img}`" alt="Product Image" width="100"></td>
            <td>{{ item.name }}</td>
            <td>{{ formatPrice(item.price) }}</td>
            <td>
              <input type="number" v-model="item.quantity" min="1" :disabled="!item.editing" @change="updateQuantity(index)" class="quantity-input">
            </td>
            <td>
              <button @click="confirmRemove(index)" class="remove-button me-2">Xóa</button>
              <button @click="editItem(index)" class="edit-button">{{ item.editing ? 'Lưu' : 'Sửa' }}</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="checkout" class="checkout-button mt-3 mb-3 " style="display: block; margin: 0 auto;float: right;">Thanh toán</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'CartView',
  setup() {
    const store = useStore();
    const router = useRouter(); 
    const cartItems = computed(() => store.getters.cartItems);

    onMounted(() => {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
      if (storedCartItems) {
        store.commit('setCartItems', storedCartItems);
      }
    });

    const removeItem = (index) => {
      store.commit('removeCartItem', index);
    };

    const updateQuantity = (index) => {
      store.commit('updateCartItemQuantity', { index, quantity: cartItems.value[index].quantity });
      localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
    };

    const checkout = () => {
      store.commit('checkout');
      localStorage.removeItem('cartItems'); 
      router.push('/order');
    };

    const formatPrice = (price) => {
      return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const isEmptyCart = computed(() => cartItems.value.length === 0);

    const editItem = (index) => {
      // Toggle editing mode
      cartItems.value[index].editing = !cartItems.value[index].editing;
      if (!cartItems.value[index].editing) {
        // Save changes when exiting edit mode
        updateQuantity(index);
      }
    };

    const confirmRemove = (index) => {
      const confirmation = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?');
      if (confirmation) {
        removeItem(index);
      }
    };

    return {
      cartItems,
      removeItem,
      updateQuantity,
      checkout,
      formatPrice,
      isEmptyCart,
      editItem,
      confirmRemove
    };
  }
};
</script>


<style scoped>
/* Your component styles */
.cart {
  margin-top: 20px;
}

.cart h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.quantity-input {
  width: 50px;
}

.remove-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.edit-button {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.checkout-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.empty-cart {
  margin-top: 20px;
  text-align: center;
}

.text-danger {
  color: red;
}
</style>
