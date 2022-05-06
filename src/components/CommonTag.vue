<template>
    <div class="tabs">
        <el-tag 
            v-for="(tag, index) in tags" 
            :key="tag.name"
            :closable="tag.name !== 'home'" 
            :effect="$route.name === tag.name ? 'dark' : 'plain'" 
            size="small"
            @click="changeMenu(tag)"
            @close="handleClose(tag, index)"
        >{{tag.label}}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    ...mapMutations({
      close: "closeTag",
    }),
    changeMenu(tab) {
      this.$router.push({ name: tab.name });
    },
    handleClose(tag, index) {
      if (this.$route.name !== tag.name) {
        this.close(index);
        return;
      }
      if (this.$store.state.tab.tabList.length - 1 === index) {
        this.$router.push({
          name: this.$store.state.tab.tabList[index - 1].name,
        });
        this.close(index);
      } else {
        this.changeMenu(this.$store.state.tab.tabList[index + 1]);
        // this.$router.push({
        //   name: this.$store.state.tab.tabList[index].name,
        // });

        this.close(index);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>
