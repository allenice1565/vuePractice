<template>
  <el-menu
    default-active="1-4-1"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理" }}</h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in haveChildren"
      :index="item.path"
      :key="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <!-- <router-link :to="subItem.path"> -->
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
        <!-- </router-link> -->
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      if (item.name !== this.$route.name) {
        this.$router.push({
          name: item.name,
        });
      }
      this.$store.commit("selectMenu", item);
    },
  },

  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    haveChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu() {
      return this.$store.state.tab.menu;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  background-color: #333;
  height: 100%;
  border: 0;

  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
</style>
