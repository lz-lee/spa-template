<template>
  <div class="g-side">
    <el-menu :default-active="defaultIndex" @select="handleSelect">
      <router-link to="/"><el-menu-item index="1"><i class="el-icon-message"></i>翻译示例</el-menu-item></router-link>
      <router-link to="/test"><el-menu-item index="2"><i class="el-icon-menu"></i>表格示例</el-menu-item></router-link>
      <router-link to="/star"><el-menu-item index="3"><i class="el-icon-star-off"></i>星级评分</el-menu-item></router-link>
      <router-link to="/tree">
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-share"></i>省市县联动</template>
          <router-link to="/tree/link"><el-menu-item index="4-1">树状</el-menu-item></router-link>
          <router-link to="/tree/tab"><el-menu-item index="4-2">选项</el-menu-item></router-link>
        </el-submenu>
      </router-link>
      <router-link to="/cssSecret"><el-menu-item index="5"><i class="el-icon-star-on"></i>css揭秘</el-menu-item></router-link>
      <router-link to="/pagination"><el-menu-item index="6"><i class="el-icon-d-arrow-right
"></i>分页组件</el-menu-item></router-link>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.defaultIndex = key
        this.$store.dispatch('STORE_INDEX', key)
      }
    },
    computed: {
      defaultIndex() {
        return this.$store.state.Index
      }
    }
  }
</script>

<style lang="less" scoped>
  .g-side{
    text-align: center;
    height: 100%;
    width: 200px;
    position: absolute;
    left: 0;
    top: 0;
    background: #eff2f7;
    a:link,a:visited,a:hover,a:active{
      text-decoration: none;
    }
  }
</style>
