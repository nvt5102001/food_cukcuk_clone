import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App);

app.directive('focus', {
    mounted(el) {
      el.focus()
    }
  })
  
app.use(router).mount('#app');
