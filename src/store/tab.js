import Cookie from "js-cookie"
// import router from "../../router"
export default {
    state: {
        isCollapse: false,
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        currentMenu: null,
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                const result = state.tabList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabList.push(val)
                }
            } else {
                state.currentMenu = null
            }
        },
        closeTag(state, index) {
            state.tabList.splice(index, 1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set("menu", JSON.stringify(val))
            console.log("已设置menu:", JSON.parse(Cookie.get("menu")))

        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove("menu")
            console.log("已清除cookie")
        },
        addMenu(state, router) {
            if (!JSON.parse(Cookie.get("menu"))) {
                console.log("cookie没有menu")
                return
            }
            const menu = JSON.parse(Cookie.get("menu"))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.component = () => import(`../../views/${item.url}`)
                    item.children = item.children.map((item1) => {
                        item1.component = () => import(`../../views/${item1.url}`)
                        return item1
                    })
                    menuArray.push(item)
                } else {
                    item.component = () => import(`../../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log("menu:", router)
            // 路由的动态添加
            menuArray.forEach(item => { router.addRoute("main", item) })
            console.log("已添加动态路由：", menuArray)
        }
    },
}