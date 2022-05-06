<template>
  <el-container style="height: 100vh">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <commonHeader></commonHeader>
      </el-header>
      <common-tag></common-tag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../src/components/CommonAside.vue";
import CommonHeader from "../src/components/CommonHeader.vue";
import CommonTag from "../src/components/CommonTag.vue";
export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.el-header {
  height: 60px;
  line-height: 60px;
  background-color: #333;
}

.el-main {
  padding-top: 0;
}
</style>
