import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia' // 1. Import Pinia
import router from './router'; // Import file router vừa tạo

//createApp(App).mount('#app')

const app = createApp(App);
app.use(router); // Đăng ký router vào app
app.use(createPinia()) // 2. Sử dụng Pinia
app.mount('#app');