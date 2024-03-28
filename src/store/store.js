import { createStore } from 'vuex';

export default createStore({
    state: {
        isLoggedIn: false,
        user: null,
        cartItems: [],
    },
    mutations: {
        setLoggedIn(state, value) {
            state.isLoggedIn = value;
        },
        setUser(state, user) {
            state.user = user;
        },
        setCartItems(state, cartItems) {
            state.cartItems = cartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        addToCart(state, cartItem) {
            const existingItem = state.cartItems.find(item => item.id === cartItem.id);
            if (existingItem) {
                existingItem.quantity += cartItem.quantity;
            } else {
                state.cartItems.push(cartItem);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        removeCartItem(state, index) {
            state.cartItems.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); // Lưu lại giỏ hàng mới vào Local Storage
        },
        updateStock(state, { productId, quantity }) {
            const productIndex = state.cartItems.findIndex(item => item.id === productId);
            if (productIndex !== -1) {
              state.cartItems[productIndex].inStock -= quantity;
            }
          },
        clearCart(state) {
            state.cartItems = [];
            localStorage.removeItem('cartItems'); // Xóa dữ liệu từ Local Storage
          }
    },
    actions: {
        addToCart({ commit }, cartItem) {
            commit('addToCart', cartItem);
        },
        updateCart({ commit }, cartItems) {
            commit('setCartItems', cartItems);
        },
    },
    getters: {
        cartItems(state) {
            return state.cartItems;
        },
    },
});
