import Vue from "vue"
import VueRouter from "vue-router"
import Main from "../views/Main.vue"
// import User from "../views/User.vue"
// import Home from "../views/Home.vue"
// import Mall from "../views/Mall.vue"
// import Other from "../views/Other.vue"
// import Page1 from "../views/Page1.vue"
// import Page2 from "../views/Page2.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "main",
        component: Main,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login/login.vue")
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router