import Vue from "vue"
import Vuex from "vuex"
import tab from "./tab"

Vue.use(Vuex) //将vuex进行全局的注入

//如何设计store中的state
//通过modle的方式，将不同模块的store进行引入

export default new Vuex.Store({
    modules: {
        tab
    }
})