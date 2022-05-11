import Vue from "vue"
import VueRouter from "vue-router"
import Main from "../views/Main.vue"
import User from "../views/User.vue"
import Home from "../views/Home.vue"
import Mall from "../views/Mall.vue"
import Other from "../views/Other.vue"
import Page1 from "../views/Page1.vue"
import Page2 from "../views/Page2.vue"

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "main",
    component: Main,
    children: [{
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/user",
        name: "user",
        component: User
    },
    {
        path: "/other",
        name: "other",
        component: Other,
        children: [{
            path: "/other/page1",
            name: "page1",
            component: Page1
        },
        {
            path: "/other/page2",
            name: "page2",
            component: Page2
        }
        ]
    },
    {
        path: "/mall",
        name: "mall",
        component: Mall
    }, {
        path: "/user",
        name: "user",
        component: User
    },
    ]
},
{
    path: "/login",
    name: "login",
    component: () => import("../views/Login/login.vue")
}]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router