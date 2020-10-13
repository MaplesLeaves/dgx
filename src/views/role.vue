<!--
 * @Descripttion: 角色管理路由
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-10-09 14:18:20
 * @LastEditors:  
 * @LastEditTime: 2020-10-10 15:49:26
-->
<template>
  <div class="role">
    <el-container>
      <el-aside width="150px"
                class="leftMenu">
        <ul>
          <li v-for="item in  10"
              :key="item">
            ceshi
          </li>
        </ul>
      </el-aside>
      <el-main class="contentMain">
        <header>
          <div class="top">
            <h3>查询条件</h3>阿斯顿发生负担
            <el-button size="mini"
                       @click="isSHow = !isSHow"
                       round>查询</el-button>
          </div>
          <transition name="el-zoom-in-top">
            <div class="bottom"
                 v-show="isSHow">
              <span>角色名称：</span>
              <el-input></el-input>
            </div>
          </transition>
        </header>
        <div class="top">
          包含权限
        </div>
        <nav>
          <el-button size="mini" round>保存配置 </el-button>
          <el-button size="mini" round>展开全部</el-button>
          <el-button size="mini" round>全部收起</el-button>
        </nav>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'role',
  data() {
    return {
      isSHow: false,
    }
  },
}
</script>

<style lang='less' scoped>
.role {
  height: 100%;
  > .el-container {
    height: 100%;
  }
  .contentMain {
    padding-top: 0;
    > header {
      line-height: normal;
      > .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #dedede;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }
      > .bottom {
        margin-bottom: 15px;
        border-bottom: 1px solid #dedede;
        padding-bottom: 15px;
        display: flex;
        > span {
          width: 100px;
        }
        align-items: center;
        margin: 15px 0;
      }
    }
    > .top {
      margin-bottom: 10px;
    }
    nav{
      background: #f7f7f7;
    }
  }
}
</style>