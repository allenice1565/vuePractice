import Vue from 'vue'
import App from './App.vue'
import {
    Button, Select, Container, Header, Aside, Main, Menu, Submenu, MenuItem, MenuItemGroup,
    Dropdown, DropdownMenu, DropdownItem, Row, Col, Card, Table, TableColumn,
    Breadcrumb, BreadcrumbItem, Tag
} from 'element-ui'
import router from '../router'
import store from './store'
import http from 'axios'
import './assets/less/index.less'
import '../api/mock.js'

Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)


Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')