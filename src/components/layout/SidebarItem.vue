<!--
 * @Descripttion: 
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-10-12 15:56:19
 * @LastEditors:  
 * @LastEditTime: 2020-10-12 18:08:21
-->
<template>
  <div v-if="item.children">
    <template v-if="item.children.length == 0">
      <el-menu-item :index="item.url">
        <item icon="el-icon-location"
              :title="item.name" />
      </el-menu-item>
    </template>
    <el-submenu v-else
                :index="String(item.id)">
      <template slot="title">
        <item icon="el-icon-location"
              :title="item.name" />
      </template>
      <template v-for="child in item.children">
        <sidebar-item v-if="child.children&&child.children.length>0"
                      :item="child"
                      :key="child.url" />
        <el-menu-item v-else
                      :key="child.id"
                      :index="child.url">
          <item icon="el-icon-location"
                :title="child.name" />
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import Item from './item'
export default {
  name: 'SidebarItem',
  components: {
    Item,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style lang="less">
.el-menu--collapse .el-submenu{
  >div{
    >span{
      display: none;
    }
    >i{
      &:nth-last-child(1){
      display: none;
    }
    }
  }
}
</style>