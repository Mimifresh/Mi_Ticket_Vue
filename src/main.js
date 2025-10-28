import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
//import "./App.css" // your main styles
import "./assets/main.css" // your main styles
import "./assets/Tickets.css"

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount("#app")