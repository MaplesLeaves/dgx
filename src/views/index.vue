<!--
 * @Descripttion: 
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-09-29 14:46:35
 * @LastEditors:  
 * @LastEditTime: 2020-10-10 16:38:48
-->
<template>
  <el-container class="index">
    <el-header>
      <div>das</div>
      <div>
        icon
      </div>
    </el-header>
    <el-container class='content'>
      <el-aside :width="!isCollapse? '200px': '65px'">
        <el-menu default-active="1-4-1"
                 class="el-menu-vertical-demo"
                 text-color="#fff"
                 :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3"
                        disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <bookmask />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import bookmask from 'components/bookmark'
export default {
  name: 'index',
  components: {
    bookmask,
  },
  data() {
    return {
      isCollapse: false,
    }
  },
}
</script>

<style lang='less' scoped>
.index {
  height: 100%;
  > .content {
    height: calc(100% - 60px);
  }
}
/deep/ .el-header {
  background-color: #2d5f88;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

/deep/ .el-aside {
  height: 100%;
  overflow-y: auto;
  .el-menu--collapse {
    height: 100%;
  }
  .el-menu {
   background: #467eaf;
   color: white;
   height: 100%;
  }
}

.el-main {
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>