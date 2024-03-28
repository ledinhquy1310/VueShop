<template>
  <div class="product-detail container" v-if="product">
    <h1 class="text-center mb-5">Chi Tiết Sản Phẩm</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="product-image-container">
          <img :src="`${product.img}`" alt="Product Image" class="product-image">
        </div>
      </div>
      <div class="col-md-6 product-details">
        <form @submit.prevent="handleAddToCart" class="product-form">
          <h2 class="product-name">{{product.name}}</h2>
          <div class="star-rating mb-3">
            <i class="star-icon fa fa-star"></i>
            <i class="star-icon fa fa-star"></i>
            <i class="star-icon fa fa-star"></i>
            <i class="star-icon fa fa-star"></i>
            <i class="star-icon fa fa-star"></i>
          </div>
          <h5 class="">{{product.description}}</h5>
          <div class="product-price">Giá: {{formatPrice(product.price)}}</div>
          <div class="form-group">
            <div class="quantity-container">
              <h4 class="product-description mt-3" for="productQuantity">Số Lượng:</h4>
              <div class="quantity-controls">
                <input type="number" name="quantity" id="quantity" v-model="quantity" min="1" :max="product.inStock" class="quantity-input">
              </div>
            </div>
          </div>
          
          <button type="submit" class="add-to-cart">Thêm vào giỏ hàng</button>
        </form>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Sản phẩm không tồn tại</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductDetailView',
  props: ['id'],
  data() {
    return {
      product: null,
      quantity: 1
    };
  },
  created() {
    this.loadProduct(this.id);
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    },
    async loadProduct(id) {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
    handleAddToCart() {
      if (!this.$store.state.isLoggedIn) {
        window.alert('Bạn cần đăng nhập để mua hàng.');
        this.$router.push('/login');
        return; 
      }
      const cartItem = {
        img:this.product.img,
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity,
      };
      this.$store.dispatch('addToCart', cartItem);
      this.$router.push('/cart');
      window.alert('Sản phẩm đã được thêm vào giỏ hàng.');
    },
  }
};
</script>



<style scoped>
.container {
  margin-top: 4rem;
  margin-bottom: 4rem;
}

.product-image-container {
  max-width: 100%;
  height: auto;
  max-height: 400px; 
  overflow: hidden; 
}

.product-image {
  width: 70%; 
  height: auto;
  border-radius: 5px;
  float: right;
}

.product-details {
  padding-left: 20px;
}

.product-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  font-size: 25px;
  color: #e44d26;
  margin-bottom: 10px;
}

.product-description {
  margin-bottom: 20px;
}

.add-to-cart {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: 
  #3eb51e;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.add-to-cart:hover {
  background-color: #333;
}

.star-rating {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.star-icon {
  color: #f8d150;
  font-size: 20px;
  margin-right: 5px;
}
.quantity-container {
  display: flex;
  align-items: center;
  width: 50%; 
}

.product-description {
  margin-right: 10px;
}

.quantity-controls {
  flex: 1;
}
.quantity-input {
  width: 40%; 
  padding: 5px; 
}
</style>