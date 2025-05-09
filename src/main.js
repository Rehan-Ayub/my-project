import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store';
import router from './MyRoutes'
import '@/assets/styles/main.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);
app.use(router)
app.use(store);
app.mount('#app');
