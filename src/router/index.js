import CartView from '@/views/Cart.vue';
import HomeView from "@/views/Home.vue";
import LoginView from "@/views/Login.vue";
import OrderView from '@/views/Order.vue';
import ProductCategory from "@/views/ProductCategory.vue";
import ProductDetailView from "@/views/ProductDetail.vue";
import ProductsView from "@/views/Products.vue";
import RegisterView from "@/views/Register.vue";
import { createRouter, createWebHistory } from "vue-router";
import OrderAdmin from "@/views/admin/orders/adminorder.vue";
import AdminOrderDetail from "@/views/admin/orders/AdminOrderDetail.vue";
import AdminCategory from "@/views/admin/category/AdminCategory.vue";
import AddCategory from "@/views/admin/category/addCategory.vue";
import EditCategory from "@/views/admin/category/editCategory.vue";
import AdminProduct from "@/views/admin/products/AdminProduct.vue";
import AddProduct from "@/views/admin/products/addProduct.vue";
import EditProduct from "@/views/admin/products/editProduct.vue";
import SearchComponent from "@/components/Search.vue"
const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView
    },
    {
        path: "/products",
        name: "Sản Phẩm",
        component: ProductsView
    },
    {
        path: "/product/:id",
        name: "Chi tiết Sản Phẩm",
        component: ProductDetailView,
        props: true
    },
    {
        path: "/login",
        name: "Đăng Nhập",
        component: LoginView,
    },
    {
        path: "/register",
        name: "Đăng Ký",
        component: RegisterView,
    },
    {
        path: '/categories/:category',
        name: 'ProductCategory',
        component: ProductCategory,
        props: true
    },
    {
        path: '/cart',
        name: 'Cart',
        component: CartView,
    },
    {
        path: '/order',
        name: 'Order',
        component: OrderView,
    },
    {
        path: '/admin/order',
        name: 'Order Admin',
        component: OrderAdmin,
    },
    {
        path: '/admin/orders/:id',
        name: 'admin-order-detail',
        component: AdminOrderDetail,
        props: true,
    },
    {
        path: '/admin/category',
        name: 'Categories Admin',
        component: AdminCategory,
    },
    {
        path: '/admin/category/add',
        name: 'AddCategory',
        component: AddCategory
    },
    {
        path: '/admin/category/edit/:id',
        name: 'EditCategory',
        component: EditCategory
    },
    {
        path: '/admin/products',
        name: ' Admin Products',
        component: AdminProduct,
    },
    {
        path: '/admin/product/add',
        name: 'AddProducts',
        component: AddProduct
    },
    {
        path: '/admin/product/edit/:id',
        name: 'EditProduct',
        component: EditProduct
    },
    {
        path: '/search/:searchTerm',
        name: 'Search',
        component: SearchComponent
    },

]
const router = createRouter({
    history: createWebHistory(), routes
})
export default router