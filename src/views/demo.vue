<!--
 * @Descripttion: 
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-10-13 10:25:42
 * @LastEditors:  
 * @LastEditTime: 2020-10-13 10:53:32
-->
<template>
  <div class="demo">
    <el-button @click="addInfo">
      添加
    </el-button>
    <transition name="shop_cart">
      <span class="add_img"
            v-if="addShow">
      </span>
    </transition>
    <div class="all">

    </div>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      addShow: false,
    }
  },
  methods:{
    addInfo(){
        this.addShow = true
        setTimeout(() => {
          this.addShow = false
        }, 1000)
    }
  }
}
</script>

<style lang='less'>
.demo {
  position: relative;
  .add_img{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: darkblue;
    position: fixed;
    right: 100px;
    top: 0px;
  }
  .all {
    width: 100px;
    height: 100px;
    background: red;
    position: absolute;
    right: 0;
    top: 0;
  }
  
}
 .shop_cart-enter-active {
    transition: all 1s ease-out;
  }
  .shop_cart-enter {
    opacity: 0;
    transform: translate(100px, 500px);
    right: 0;
    top: 1000px;
  }
</style>