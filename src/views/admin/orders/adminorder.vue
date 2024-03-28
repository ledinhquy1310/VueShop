<template>
  <AdminLayout></AdminLayout>

  <div class="admin-order" style="margin-bottom: 200px;">
    <h2 class="title">Danh sách hóa đơn</h2>
    <table class="order-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên khách hàng</th>
          <th>Số điện thoại</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="order-row">
          <td>{{ order.id }}</td>
          <td>{{ order.fullname }}</td>
          <td>{{ order.phone }}</td>
          <td>{{ formatPrice(order.totalPrice) }}</td>
          <td>{{ order.status }}</td>
          <td>
            <router-link :to="'/admin/orders/' + order.id" class="action-button view-button">Chi Tiết</router-link> |
            <button @click="confirmDelete(order.id)" class="action-button delete-button">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminLayout from "@/components/LayoutAdmin.vue";
import axios from 'axios';

export default {
  name: "OrderAdmin",
  components: {
    AdminLayout
  },
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      axios.get('http://localhost:3000/Orders')
        .then(response => {
          this.orders = response.data;
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    },
    formatPrice(price) {
      if (price) {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      } else {
        return '';
      }
    },
    confirmDelete(orderId) {
      if (confirm('Bạn có chắc chắn muốn xóa hóa đơn này không?')) {
        this.deleteOrder(orderId);
      }
    },
    deleteOrder(orderId) {
      axios.delete(`http://localhost:3000/Orders/${orderId}`)
        .then(() => {
          // Xóa hóa đơn khỏi danh sách và cập nhật giao diện
          this.orders = this.orders.filter(order => order.id !== orderId);
        })
        .catch(error => {
          console.error('Error deleting order:', error);
        });
    }
  },
};
</script>

<style scoped>
.admin-order {
  padding: 20px;
}

.title {
  margin-bottom: 20px;
  text-align: center;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.order-table th, .order-table td {
  padding: 15px;
}

.order-table thead {
  background-color: #f2f2f2;
}

.order-row:hover {
  background-color: #f9f9f9;
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

.delete-button {
  background-color: red;
}


.view-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-button:hover {
  background-color: #0056b3;
}

</style>
