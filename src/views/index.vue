<!--
 * @Descripttion: 
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-09-29 14:46:35
 * @LastEditors:  
 * @LastEditTime: 2020-10-13 11:13:48
-->
<template>
  <el-container class="index">
    <el-header class="header">
      <div>
        <img src="~img/logo.png"
             alt=""
             width="146px"
             height="40px">
        <i class="iconfont iconcaidanbiaoqian" @click="isCollapse = !isCollapse"></i>
      </div>
      <div>
        <i class="iconfont iconyunduanxiazai" @click="isCollapse = !isCollapse"></i>
        <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class='content'>
      <el-aside :width="!isCollapse? '200px': '65px'">
        <el-menu default-active="1-4-1"
                 class="el-menu-vertical-demo"
                 popper-class='changeHover'
                 text-color="#fff"
                 background-color="#467eaf"
                 :collapse="isCollapse">
          <sidebar-item :isShow='isCollapse'
                        v-for="route in menu"
                        :key="route.path"
                        :item="route"
                        :base-path="route.path" />
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
import SidebarItem from 'components/layout/SidebarItem'
export default {
  name: 'index',
  components: {
    bookmask,
    SidebarItem,
  },
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          id: 234019946,
          parentId: null,
          name: '7',
          children: [],
          checked: true,
          sortFlag: 1,
          type: 'ITEM',
          icon: 'fa fa-th-large',
          url: '/view/report/deployInfo.html?name=7',
          text: '7',
          description: '1',
          orgMenu: 'org_1129',
          orgMenuType: '1',
          reportType: 'COUNT',
        },
        {
          id: 4029050,
          parentId: null,
          name: '数字化管理',
          children: [
            {
              id: 4029053,
              parentId: 4029050,
              name: '菜单管理',
              children: [],
              checked: true,
              sortFlag: 1,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url: '/view/report/CubeReportMenuManage.html',
              text: '菜单管理',
              description: null,
              orgMenu: null,
              orgMenuType: null,
              reportType: null,
            },
            {
              id: 4029054,
              parentId: 4029050,
              name: '角色管理',
              children: [],
              checked: true,
              sortFlag: 2,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url: '/view/report/cubeReportRoleManager.html',
              text: '角色管理',
              description: null,
              orgMenu: null,
              orgMenuType: null,
              reportType: null,
            },
          ],
          checked: true,
          sortFlag: 1,
          type: 'GROUP',
          icon: 'fa fa-th-large',
          url: null,
          text: '数字化管理',
          description: null,
          orgMenu: null,
          orgMenuType: null,
          reportType: null,
        },
        {
          id: 234019867,
          parentId: null,
          name: '统计报表',
          children: [
            {
              id: 234023681,
              parentId: 234019867,
              name: '核心队伍类-变动类指标2',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_核心队伍类-变动类指标2',
              text: '核心队伍类-变动类指标2',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234023684,
              parentId: 234019867,
              name: '核心队伍类-变动类指标3',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_核心队伍类-变动类指标3',
              text: '核心队伍类-变动类指标3',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234023675,
              parentId: 234019867,
              name: '核心队伍类-结构类指标',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_核心队伍类-结构类指标',
              text: '核心队伍类-结构类指标',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234023678,
              parentId: 234019867,
              name: '核心队伍类-变动类指标1',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_核心队伍类-变动类指标1',
              text: '核心队伍类-变动类指标1',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234031651,
              parentId: 234019867,
              name: '业务交叉类指标8月份',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_业务交叉类指标8月份',
              text: '业务交叉类指标8月份',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234031654,
              parentId: 234019867,
              name: '团队结构类-规模类8月份',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_团队结构类-规模类8月份',
              text: '团队结构类-规模类8月份',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234031660,
              parentId: 234019867,
              name: '团队结构类-产能收入类指标8月',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_团队结构类-产能收入类指标8月',
              text: '团队结构类-产能收入类指标8月',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234019970,
              parentId: 234019867,
              name: '人员属性交叉类指标',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_人员属性交叉类指标',
              text: '人员属性交叉类指标',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234019931,
              parentId: 234019867,
              name: 'CE队伍全景透视表指标1',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_CE队伍全景透视表指标1',
              text: 'CE队伍全景透视表指标1',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234019897,
              parentId: 234019867,
              name: '（一）业务交叉类指标',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_（一）业务交叉类指标',
              text: '（一）业务交叉类指标',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234019900,
              parentId: 234019867,
              name: '（二）人员属性交叉类指标',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_（二）人员属性交叉类指标',
              text: '（二）人员属性交叉类指标',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234019873,
              parentId: 234019867,
              name: '团队结构类-规模类指标',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url: '/view/report/deployInfo.html?name=团队结构类-规模类指标',
              text: '团队结构类-规模类指标',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234019882,
              parentId: 234019867,
              name: '团队结构类-产能收入类指标',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=团队结构类-产能收入类指标',
              text: '团队结构类-产能收入类指标',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234019870,
              parentId: 234019867,
              name: '核心队伍类-规模类指标',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_核心队伍类-规模类指标',
              text: '核心队伍类-规模类指标',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234035651,
              parentId: 234019867,
              name: '产能收入类指标',
              children: [],
              checked: true,
              sortFlag: 0,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url: '/view/report/deployInfo.html?name=org_2313_产能收入类指标',
              text: '产能收入类指标',
              description: null,
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
            {
              id: 234031657,
              parentId: 234019867,
              name: '团队结构类-规模类指标111',
              children: [],
              checked: true,
              sortFlag: 1,
              type: 'ITEM',
              icon: 'fa fa-th-large',
              url:
                '/view/report/deployInfo.html?name=org_2313_团队结构类-规模类指标111',
              text: '团队结构类-规模类指标111',
              description: '1',
              orgMenu: 'org_2313',
              orgMenuType: '1',
              reportType: 'COUNT',
            },
          ],
          checked: true,
          sortFlag: 99,
          type: 'GROUP',
          icon: 'fa fa-th-large',
          url: null,
          text: '统计报表',
          description: null,
          orgMenu: 'org_2313',
          orgMenuType: '1',
          reportType: null,
        },
      ],
    }
  },
}
</script>

<style lang='less' scoped>
.index {
  .iconyunduanxiazai{
    font-size: 40px;
  }
  height: 100%;
  > .content {
    height: calc(100% - 60px);
  }
  > .header {
    color: white;
    line-height: normal;
    >div{
      &:nth-child(1){
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >i{
          margin-left: 10px;
        }
      }
      &:nth-child(2){
        display: flex;
        align-items: center;
      }
    }
    .el-dropdown {
      color: white;
    }
  }
}

/deep/ .el-menu {
  background: #111724;
}
/deep/.el-header {
  background-color: #2d5f88;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    overflow-x: hidden;
  }
}

.el-main {
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>