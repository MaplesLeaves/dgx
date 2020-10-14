<!--
 * @Descripttion: 
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-10-10 14:11:03
 * @LastEditors:  
 * @LastEditTime: 2020-10-10 16:03:29
-->
<template>
  <ul class="bookmark">
    <li v-for="(item, index) in gerHeaderbar" :key="index">
      {{item.meta.title}}
      <span v-if="index !== gerHeaderbar.length-1">></span>
      </li>
  </ul>
</template>
<script>
export default {
  name: 'bookmark',
  data() {
    return {}
  },
  computed: {
    gerHeaderbar() {
      console.error(this.$route.matched)
      return this.$route.matched
    },
  },
  created(){
    // console.error(this.$route)
  },
  methods: {},
}
</script>

<style lang='less'>
.bookmark{
  padding: 10px 0;
  background: #f7f7f7;
  >li{
    display: inline-block;
    margin-right: 10px;
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>