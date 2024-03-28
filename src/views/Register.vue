<template>
    <div class="container form">
        <div class="details">
            <h2 class="text-center">Đăng kí</h2>
            <form @submit.prevent="submit">
                <div class="input-container">
                    <label>Tên người dùng</label>
                    <div>
                        <input type="text" placeholder="Name" v-model="name" autocomplete="username">
                        <span v-if="!name && formSubmitted" class="error-message">Vui lòng nhập tên người dùng</span>
                    </div>
                </div>

                <div class="input-container">
                    <label>Email</label>
                    <div>
                        <input type="email" placeholder="Email" v-model="email">
                        <span v-if="!email && formSubmitted" class="error-message">Vui lòng nhập địa chỉ email</span>
                        <span v-if="email && !validateEmail(email) && formSubmitted" class="error-message">Địa chỉ email không hợp lệ</span>
                    </div>
                </div>

                <div class="input-container">
                    <label>Số điện thoại</label>
                    <div>
                        <input type="tel" placeholder="Phone" v-model="phone" autocomplete="tel" pattern="[0-9]{10}">
                        <span v-if="!phone && formSubmitted" class="error-message">Vui lòng nhập số điện thoại</span>
                        <span v-if="phone && !/^[0-9]{10}$/.test(phone) && formSubmitted" class="error-message">Số điện thoại không hợp lệ</span>
                    </div>
                </div>
                
                <div class="input-container">
                    <label>Địa chỉ</label>
                    <div>
                        <input type="text" placeholder="Address" v-model="address" autocomplete="tel">
                        <span v-if="!address && formSubmitted" class="error-message">Vui lòng nhập địa chỉ</span>
                    </div>
                </div>

                <div class="input-container">
                    <label>Mật Khẩu</label>
                    <div>
                        <input type="password" placeholder="Password" v-model="password" autocomplete="current-password">
                        <span v-if="!password && formSubmitted" class="error-message">Vui lòng nhập mật khẩu</span>
                    </div>
                </div>

                <div class="input-container">
                    <label>Chức vụ</label>
                    <div>
                        <input type="radio" id="admin" value="admin" v-model="accountType"> Nhân Viên |
                        <input type="radio" id="user" value="user" v-model="accountType"> Khách Hàng
                    </div>
                </div>

                <div class="button">
                    <button type="submit">Đăng kí</button>
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

export default {
    name: "RegisterView",
    setup() {
        const name = ref('');
        const email = ref('');
        const phone = ref('');
        const address = ref('');
        const password = ref('');
        const accountType = ref('user');
        const successMessage = ref('');
        const router = useRouter();
        const formSubmitted = ref(false);

        const submit = async () => {
            formSubmitted.value = true;

            if (!name.value || !email.value || !phone.value || !address.value || !password.value) {
                console.log('Vui lòng điền đầy đủ thông tin');
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/Users', {
                    name: name.value,
                    email: email.value,
                    phone: phone.value,
                    address: address.value,
                    password: password.value,
                    admin: accountType.value === 'admin' 
                });
                console.log('Response:', response.data);

                successMessage.value = 'Đăng kí thành công! Đang chuyển hướng...';

                setTimeout(() => {
                        router.push('/login');
                }, 2000);
            } catch (error) {
                console.error('Lỗi:', error);
            }
        };

        const validateEmail = (email) => {
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        };

        return {
            name,
            email,
            phone,
            address,
            password,
            accountType,
            submit,
            successMessage,
            formSubmitted,
            validateEmail
        };
    }
};
</script>
    <style>
    .error-message {
        color: red;
    }
    .form{
        margin-bottom: 100px;
        margin-top: 50px;
        width: 500px;
    }
    .details {
        background-color: #f0f0f0;
        padding: 20px;
        border-radius: 8px;
    }
    
    h2 {
        margin-top: 0;
    }
    
    .input-container {
        margin-bottom: 15px;
    }
    
    label {
        display: block;
        margin-bottom: 5px;
    }
    
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="password"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    
    .button {
        text-align: center;
    }
    
    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    
    button:hover {
        background-color: #0056b3;
    }</style>