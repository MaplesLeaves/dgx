<template>
  <div class="page" @click="pageClick">
    <div class="navLeft" @contextmenu.prevent="(e) => show(e, 0)">
      <!--  @contextmenu.prevent="(e) => show(e, 0)" -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#FFFFFF"
      >
        <el-submenu
          v-for="item in navList"
          :key="item.id"
          :index="String(item.id)"
        >
          <div slot="title" @contextmenu.prevent.stop="(e) => show(e, 1, item)">
            <i class="el-icon-location"></i>
            <span>{{ item.menuName }}</span>
          </div>
          <div v-for="span in item.childrens" :key="span.id">
            <el-menu-item
              v-if="span.menuType === 1"
              :index="`${item.id}-${span.id}`"
              @click="addTabsView(span)"
            >
              <div @contextmenu.prevent.stop="(e) => show(e, 2, span)">
                {{ span.menuName }}
              </div>
            </el-menu-item>
          </div>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content">
      <div class="views">
        <router-view :tabs-list.sync='tabsList' />
      </div>
    </div>
    <div class="popoverBox" id="popoverBoxNav" v-show="popoverBox">
      <div v-if="popoverBoxType !== 0" class="cell" @click="addCatalog(0)">
        <i class="iconfont iconxinjianzhibiao"></i>
        新建指标
      </div>
      <div class="cell" @click="addCatalog(1)">
        <i class="iconfont iconrendingbanfabeifen"></i>
        新建目录
      </div>
      <div
        v-if="popoverBoxType === 1 || popoverBoxType === 2"
        class="cell"
        @click="rename(1)"
      >
        <i class="iconfont iconzhongmingming"></i>
        重命名
      </div>
      <div v-if="popoverBoxType !== 0" class="cell" @click="deleteCell">
        <i class="iconfont iconshanchu1"></i>
        删除
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rule",
  data() {
    return {
      popoverBoxType: 0,
      popoverBoxItem: {},
      popoverBoxIndex: {},
      popoverBox: false,
      activeName: "second",
      //    menuType: 0, // 0文件夹 1 指标
      navList: [],
      tabsList: [],
    };
  },
  created() {
    this.getNavList();
  },
  mounted() {},
  methods: {
    // 添加指标到tabs页
    addTabsView(item) {
      const repetition = this.tabsList.filter((span) => {
        return span.id === item.id;
      });
      if (!repetition.length) {
        if (this.tabsList.length >= 5) {
          this.$message({
            type: "warning",
            message: "最多显示5个标签页！",
          });
        } else {
          this.tabsList.push(item);
        }
      }
    },
    // 获取列表数据
    getNavList() {
      this.navList = [
        {
          childrens: [
            {
              childrens: [],
              createBy: "string",
              createTime: "2020-10-15T02:23:36.566Z",
              id: 20,
              menuCode: "string",
              menuName: "string",
              menuType: 0, // 0文件夹 1 指标
              parentCode: "string",
              recordState: 0,
              updateBy: "string",
              updateTime: "2020-10-15T02:23:36.566Z",
            },
          ],
          createBy: "string",
          createTime: "2020-10-15T02:23:36.566Z",
          id: 10,
          menuCode: "string",
          menuName: "string",
          menuType: 0,
          parentCode: "string",
          recordState: 0,
          updateBy: "string",
          updateTime: "2020-10-15T02:23:36.566Z",
        },
        {
          childrens: [
            {
              childrens: [],
              createBy: "string",
              createTime: "2020-10-15T02:23:36.566Z",
              id: 20,
              menuCode: "string",
              menuName: "22222",
              menuType: 1, // 0文件夹 1 指标
              parentCode: "string",
              recordState: 0,
              updateBy: "string",
              updateTime: "2020-10-15T02:23:36.566Z",
            },
            {
              childrens: [],
              createBy: "string",
              createTime: "2020-10-15T02:23:36.566Z",
              id: 22,
              menuCode: "strin1g",
              menuName: "11111",
              menuType: 1, // 0文件夹 1 指标
              parentCode: "string",
              recordState: 0,
              updateBy: "string",
              updateTime: "2020-10-15T02:23:36.566Z",
            },
          ],
          createBy: "string",
          createTime: "2020-10-15T02:23:36.566Z",
          id: 30,
          menuCode: "string",
          menuName: "string",
          menuType: 0,
          parentCode: "string",
          recordState: 0,
          updateBy: "string",
          updateTime: "2020-10-15T02:23:36.566Z",
        },
      ];
    },
    // 全屏收起弹出框
    pageClick() {
      this.popoverBox = false;
    },
    // 展示弹出框
    show(e, type, item) {
      /**
       * 0: 在空白处右键
       * 1: 在目录上右键
       * 2: 在指标上右键
       */
      this.popoverBoxItem = item;
      this.popoverBoxType = type;
      const { pageX, pageY } = e;
      const popoverBox = document.getElementById("popoverBoxNav");
      popoverBox.style.top = pageY + "px";
      popoverBox.style.left = pageX + "px";
      this.popoverBox = true;
    },
    // 新增目录
    addCatalog(type) {
      let name = "指标";
      if (type === 1) {
        name = "目录";
      }
      this.$prompt(`请输入${name}名称`, `创建${name}`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: (val) => {
          const reg = /^[0-9a-zA-Z]*$/g;
          if (reg.test(val)) {
            return "请输入汉字";
          } else {
            if (val.length > 30) {
              return "请输入30个字符以内的汉字";
            } else {
              return true;
            }
          }
        },
      })
        .then(({ value }) => {
          console.log(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消创建",
          });
        });
    },
    // 重命名目录
    rename(type) {
      const { menuName } = this.popoverBoxItem;
      let name = "指标";
      if (type === 1) {
        name = "目录";
      }
      this.$prompt(`请输入${name}名称`, `修改${name}`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: menuName,
        inputValidator: (val) => {
          const reg = /^[0-9a-zA-Z]*$/g;
          if (reg.test(val)) {
            return "请输入汉字";
          } else {
            if (val.length > 30) {
              return "请输入30个字符以内的汉字";
            } else {
              return true;
            }
          }
        },
      })
        .then(({ value }) => {
          console.log(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改  ",
          });
        });
    },
    // 删除指标
    deleteCell() {
      console.log(this.popoverBoxItem);
    },
  },
};
</script>

<style lang="less" scoped>
.popoverBox {
  position: fixed;
  top: 0px;
  left: 0px;
  height: auto;
  width: 150px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px #999999;
  border-radius: 5px;
  background-color: white;
  z-index: 1000;
  cursor: pointer;

  .cell {
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    background-color: white;

    svg {
      filter: drop-shadow(#000000 80px 0);
      transform: translateX(-80px);
      overflow: hidden;
    }
  }

  .cell:hover {
    svg {
      filter: drop-shadow(white 80px 0);
      transform: translateX(-80px);
      overflow: hidden;
    }

    color: white;
    background-color: #5eaaff;
  }
}

.menaReference {
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
}

.popoverBoxHeader {
  width: 100%;
  height: 63px;
}

.page {
  display: flex;
  height: 100%;

  .content {
    background: white;
    flex: 1;
  }

  .navLeft {
    overflow: hidden;
    margin-right: 6px;
    height: 100%;
    flex: 0 0 200px;
    background: white;

    /deep/ .el-submenu__title::marker {
      background-color: red;
    }
  }
}
</style>
