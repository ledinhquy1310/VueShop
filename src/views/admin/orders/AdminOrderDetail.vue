<template>
  <div class="order container" style="margin-bottom: 160px;">
    <h2 class="text-center mt-3 mb-5">Chi tiết đơn hàng</h2>
    <div v-if="order" class="order-details">
      <div class="row">
            <!-- Thông tin thanh toán -->
            <div class="col-md-6">
              <h3 class="payment-info-heading">Thông tin thanh toán</h3>
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
                  <tr v-for="(item, index) in order.items" :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ formatPrice(item.price) }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ formatPrice(item.price * item.quantity) }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="total">
                <strong>Tổng tiền:</strong> {{ formatPrice(order.totalPrice) }}
              </div>
            </div>
        <!-- Thông tin đơn hàng -->
        <div class="col-md-6">
          <h3 class="order-info-heading">Thông tin khách hàng</h3>
          <div class="customer-info">
            <p><strong>Tên khách hàng:</strong> {{ order.fullname }}</p>
            <p><strong>Số điện thoại:</strong> {{ order.phone }}</p>
            <p><strong>Địa chỉ:</strong> {{ order.address }}</p>
          </div>
          <button @click="confirmDelivery" class="order-button" >Xác nhận giao hàng</button>
          <router-link to="/admin/order" class="order-button" style="text-decoration: none;">Quay lại</router-link>
        </div>
        
    
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'AdminOrderDetail',

  data() {
    return {
      order: null,
    };
  },
  mounted() {
    this.fetchOrder();
  },
  methods: {
    fetchOrder() {
      const orderId = this.$route.params.id;
      axios.get(`http://localhost:3000/Orders/${orderId}`)
        .then(response => {
          this.order = response.data;
        })
        .catch(error => {
          console.error('Error fetching order:', error);
        });
    },
    formatPrice(price) {
      return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    },
    confirmDelivery() {
      const orderId = this.$route.params.id;
      axios.get(`http://localhost:3000/Orders/${orderId}`)
        .then(response => {
          const orderData = response.data;
          orderData.status = 'Đã giao hàng';
          axios.put(`http://localhost:3000/Orders/${orderId}`, orderData)
            .then(() => {
              this.order.status = 'Đã giao hàng';
            })
            .catch(error => {
              console.error('Error confirming delivery:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching order:', error);
        });
    },
  },
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
  background-color: #3eb51e;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 7px;
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

