<!--  -->
<template>
  <div class="" @click="pageClick">
    <div>
      <div class="title">
        指标名称

        <el-tooltip
          class="item"
          effect="dark"
          content="新增指标"
          placement="top"
        >
          <div class="iconBtn">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconxinzengmingxi"></use>
            </svg>
          </div>
        </el-tooltip>

        <el-tooltip
          class="item"
          effect="dark"
          content="复制指标"
          placement="top"
        >
          <div class="iconBtn" @click.stop="myCopyTable">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconfuzhi"></use>
            </svg>
          </div>
        </el-tooltip>

        <el-tooltip
          v-if="offDelete"
          class="item"
          effect="dark"
          content="删除指标"
          placement="top"
        >
          <div class="iconBtn delete" @click.stop="deleteTable">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconfuzhibeifen"></use>
            </svg>
          </div>
        </el-tooltip>
        <el-tooltip
          v-else
          class="item"
          effect="dark"
          content="无法删除"
          placement="top"
        >
          <div class="iconBtn delete1" @click.stop="deleteTable">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#iconfuzhibeifen"></use>
            </svg>
          </div>
        </el-tooltip>
      </div>
      <div class="tables">
        <div class="list">
          <div class="tr">
            <div class="th">
              <div class="text">
                基本法
                <i class="noPosition el-icon-caret-bottom"></i>
              </div>
            </div>
            <div class="content">
              <div class="td">
                {{ tableData.lawEdition }}
              </div>
            </div>
          </div>
        </div>
        <div class="list" v-for="(item, il) in myTableData" :key="il + 'il'">
          <div class="th">
            <div
              v-if="item[0].type === 'judge'"
              @contextmenu.prevent.stop="(e) => addTarget(e, il)"
            >
              <i
                class="iconfont iconarrows-right"
                @click.stop="addTableList(0, il)"
              />
              <i
                class="iconfont iconarrows-left"
                @click.stop="addTableList(1, il)"
              />
              <div class="text">
                指标{{ il + 1 }}
                <span
                  class="delete iconfont iconicon_shanchu"
                  @click.stop="deleteTableList(il)"
                />
              </div>
            </div>
            <div v-else>
              <div class="text">指标名称</div>
            </div>
          </div>
          <div class="content">
            <div
              class="time"
              v-if="item[0].type === 'judge' && item[0].newTime"
            >
              <div class="text">结算时间 = 下月</div>
            </div>
            <div class="tr">
              <div
                class="td"
                v-for="(span, is) in item"
                :key="is + 'is'"
                @contextmenu.prevent.stop="(e) => addTargetTd(e, il, is)"
              >
                <div v-if="span.type === 'judge'">
                  <!-- 上下拖动功能暂时不加 -->
                  <!-- <i
              v-if="is !== 0"
              class="iconfont iconarrows-top"
              @click="moveCell(0, il, is)"
            />
            <i
              v-if="is + 1 !== item.length"
              class="iconfont iconarrows-bottom"
              @click="moveCell(1, il, is)"
            /> -->
                  <i
                    v-if="!span.newTime"
                    class="iconfont iconarrows-left"
                    @click.stop="addTime(il)"
                  />
                  id: {{ span.id }}
                  <table-sapn-value :condition-data="span.condition" />
                </div>
                <div v-if="span.type === 'assign'" class="assign">
                  常量
                  <table-sapn-value :condition-data="span.condition" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <el-table stripe style="width: 100%">
        <div v-for="(item, i) in myTableData.startNodes" :key="i">
          <el-table-column v-if="item.type === 'judge'" width="200">
            <template slot="header" class="header" slot-scope="scope">
              <div class="header" style="cursor: pointer">
                <div class="tableScope tableScopeHeader">
                  <i class="el-icon-right" />
                  <i class="el-icon-back" />
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconw_shaixuan-192beifen3"></use>
                  </svg>
                  {{ item.field }}
                </div>
              </div>
            </template>
            <template slot-scope="scope">
              <div class="tableScope">
                <i class="el-icon-top" />
                <i class="el-icon-bottom" />
                <i class="el-icon-right" />
                <i class="el-icon-back" />
                <span>
                  <span
                    v-for="(condition, ic) in item.condition.data"
                    :key="ic + 'ic'"
                  >
                    <span
                      v-for="(expression, ie) in condition.expression"
                      :key="ie + 'ie'"
                    >
                      <span v-if="expression.type === 'op'">
                        {{ expression.name }}
                      </span>
                      <span v-if="expression.type === 'input'">
                        {{ expression.code }}
                      </span>
                    </span>
                  </span>
                </span>
              </div>
            </template>
          </el-table-column>
        </div>
        <div>
          <el-table-column width="200">
            <template slot="header" class="header" slot-scope="scope">
              <div class="header" style="cursor: pointer">
                基本法
                <i class="el-icon-caret-bottom"></i>
              </div>
            </template>
            <template slot-scope="scope">
              <div class="tableScope">
                {{ myTableData.lawEdition }}
              </div>
            </template>
          </el-table-column>
        </div>
      </el-table> -->
      </div>
    </div>

    <div class="popoverBox" id="popoverBox" v-show="popoverBox">
      <el-cascader-panel
        :options="popoverBoxOptions"
        :props="popoverBoxProps"
        size="mini"
      ></el-cascader-panel>
    </div>
    <div
      class="popoverBox popoverBoxTd"
      id="popoverBoxTd"
      v-show="popoverBoxTd"
    >
      <div class="cell">
        <i class="iconfont iconxinjianzhibiao"></i>
        配置条件
      </div>
      <div class="cell">
        <i class="iconfont iconxinjianzhibiao"></i>
        清空
      </div>
      <div class="cell">
        <i class="iconfont iconxinjianzhibiao"></i>
        复制
      </div>
      <div class="cell">
        <i class="iconfont iconxinjianzhibiao"></i>
        粘贴
      </div>
      <div class="cell">
        <i class="iconfont iconxinjianzhibiao"></i>
        上移条件行
      </div>
      <div class="cell">
        <i class="iconfont iconxinjianzhibiao"></i>
        下移条件行
      </div>
      <div class="cell">
        <i class="iconfont iconxinjianzhibiao"></i>
        删除条件行
      </div>
    </div>
  </div>
</template>

<script>
import tabData from "../data.js";

import tableSapnValue from "./tableSapnValue";
export default {
  components: {
    tableSapnValue: tableSapnValue,
  },
  props: {
    deleteTable: {
      type: Function,
      requiret: true,
    },
    copyTable: {
      type: Function,
      requiret: true,
    },
    menu: {
      type: Object,
      requiret: true,
    },
    offDelete: {
      type: Boolean,
      requiret: true,
    },
    tableData: {
      type: Object,
      requiret: true,
    },
  },
  data() {
    return {
      popoverBox: false,
      popoverBoxTd: false,
      popoverBoxDom: null,
      popoverBoxProps: {
        expandTrigger: "hover",
        label: "name",
      },
      popoverBoxOptions: [
        {
          value: "zhinan",
          name: "指南",
          children: [
            {
              value: "shejiyuanze",
              name: "设计原则",
              children: [
                {
                  value: "yizhi",
                  name: "一致",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          name: "组件",
          children: [
            {
              value: "basic",
              name: "Basic",
            },
          ],
        },
      ],
      tablesListObjcet: {},
      tableIndex: 1,
      myTableData: [],
      myTableListTree: {},
      myTableListFrom: {},
      myTableListCell: {},
      //   myTableListFromList: [],
      //   myTableListFromIndex: 0,
    };
  },
  created() {
    console.log(this.tableData);
    this.getDataInfo();
  },
  methods: {
    // 添加结算时间
    addTime(il) {
      console.log(this.myTableData[il]);
      this.myTableData[il].forEach((item, i) => {
        this.$set(this.myTableData[il][i], "newTime", true);
      });
    },
    // 复制表格
    myCopyTable() {
      let arr = this.myTableData.flat();
      const tableFromData = this.listToTree(arr);
      this.$emit("update:tableData", {
        ...this.tableData,
        startNodes: tableFromData,
      });
      this.copyTable();
    },
    // 获取所需数据
    getDataInfo() {
      this.myTableListTree = this.tableData.startNodes;
      this.applyData(this.myTableListTree);
      this.addAlter(true);
    },
    // 添加修改状态
    addAlter(alter) {
      this.$emit("update:menu", {
        ...this.menu,
        alter: alter,
      });
    },
    // 上下移动元素
    moveCell(type, il, is) {},
    // 获取数据后渲染页面
    applyData(tree) {
      this.myTableData = [];
      this.tableIndex = 1;
      this.addParentId(tree, 0);
      // 添加第一条数据
      this.myTableData.push(tree);
      this.tableDataRecursion(tree);
    },
    // 保存table
    saveFrom() {
      let arr = this.myTableData.flat();
      const tableFromData = this.listToTree(arr);
      this.tablesListObjcet.startNodes = tableFromData;
      this.addAlter(false); // 添加修改状态
    },
    // 给树状结构添加praentID
    addParentId(arr, parentId) {
      arr.forEach((item) => {
        item.parentId = parentId;
        if (item.childNodes.length) {
          this.addParentId(item.childNodes, item.id);
        }
      });
    },
    // 将树结构转为列list结构
    tableDataRecursion(list) {
      let arr = [];
      list.forEach((item) => {
        arr = arr.concat(item.childNodes);
        item.childNodes = [];
      });
      if (arr.length) {
        this.$set(this.myTableData, this.tableIndex, arr);
      }
      this.tableIndex++;
      if (arr.length) {
        this.tableDataRecursion(arr);
      }
    },
    // 将list转为tree结构
    listToTree(oldArr) {
      oldArr.forEach((element) => {
        let parentId = element.parentId;
        if (String(parentId) !== "0") {
          oldArr.forEach((ele, i) => {
            if (String(ele.id) === String(parentId)) {
              if (!ele.childNodes) {
                ele.childNodes = [];
              }
              ele.childNodes.push(element);
            }
          });
        }
      });
      oldArr = oldArr.filter((ele) => ele.parentId === 0); //这一步是过滤，按树展开，将多余的数组剔除；
      this.addAlter(true); // 添加修改状态
      return oldArr;
    },
    // 删除一列
    deleteTableList(index) {
      this.$confirm("确认删除该列?", "删除指标", {
        confirmButtonText: "删除",
      })
        .then((_) => {
          const arr = this.myTableData.splice(index, 1);
          arr[0].forEach((item) => {
            this.myTableData[index].forEach((span) => {
              span.parentId = item.parentId;
            });
          });
          this.addAlter(true); // 添加修改状态
        })
        .catch((_) => {});
    },
    // 添加一列
    addTableList(type, index) {
      let arr = JSON.parse(JSON.stringify(this.myTableData[index]));
      arr.forEach((item) => {
        const id = "new" + ++this.tableIndex;
        item.id = id;
        this.myTableData[index].forEach((span) => {
          span.parentId = id;
        });
      });
      /**
       * 0 右箭头
       * 1 左箭头
       */
      if (type === 0) {
        this.myTableData.splice(index + 1, 0, arr);
      } else {
        this.myTableData.splice(index, 0, arr);
      }
      this.addAlter(true); // 添加修改状态
    },
    // 创建右键弹窗
    addTarget(e, il) {
      const { pageX, pageY } = e;
      const popoverBox = document.getElementById("popoverBox");
      popoverBox.style.top = pageY + "px";
      popoverBox.style.left = pageX + "px";
      this.popoverBoxDom = e.currentTarget; 
      this.popoverBoxDom.style.backgroundColor = 'rgb(252, 248, 227)';
      this.popoverBoxDom.querySelectorAll('.iconfont').forEach(item => {
        item.style.display = 'inline-block'
      })
      console.log(this.popoverBoxDom.querySelectorAll('.iconfont'));
      this.popoverBox = true;
    },
    // 创建右键弹窗<td>标签
    addTargetTd(e, il, is) {
      console.log(e.currentTarget);
      const { pageX, pageY } = e;
      const popoverBoxTd = document.getElementById("popoverBoxTd");
      popoverBoxTd.style.top = pageY + "px";
      popoverBoxTd.style.left = pageX + "px";
      this.popoverBoxDom = e.currentTarget; 
      this.popoverBoxDom.style.backgroundColor = 'rgb(252, 248, 227)';
      this.popoverBoxDom.querySelectorAll('.iconfont').forEach(item => {
        item.style.display = 'inline-block'
      })
      console.log(this.popoverBoxDom.querySelector('.iconfont'));
      this.popoverBoxTd = true;
    },
    // 全局冒泡关闭弹窗
    pageClick() {
      this.popoverBoxDom.style.backgroundColor = ''
      this.popoverBoxDom.querySelectorAll('.iconfont').forEach(item => {
        item.style.display = 'none'
      })
      this.popoverBox = false;
      this.popoverBoxTd = false;
    },
  },
};
</script>

<style lang="less" scoped>
.popoverBox {
  position: fixed;
  top: 0px;
  left: 0px;
  max-width: 370px;
  overflow-x: scroll;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px #999999;
  border-radius: 5px;
  background-color: white;
  z-index: 1000;
  cursor: pointer;
  /deep/.el-cascader-panel.is-bordered {
    border: 0;
  }
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
.popoverBoxTd {
  overflow-x: inherit;
  width: 150px;
  border-radius: 10px;
  overflow: hidden;
}
.tables {
  display: flex;
  padding: 0 15px;
  overflow-x: scroll;
  width: 850px;
  .list {
    // min-width: 150px;
    // width: auto;
    // overflow: auto;
    // display: flex;
    .content {
      display: flex;
      .time {
        flex: 0 0 60px;
        white-space: nowrap;
      }
      .tr {
        flex: 1;
      }
    }
    > div > div > div {
      padding: 15px;
      border-right: 1px solid #ffffff;
      min-height: 30px;
      position: relative;
      text-align: left;

      .assign {
        width: 100%;
        height: calc(100% - 1px);
        color: #4a90f8;
        line-height: 20px;
      }
    }

    .th {
      color: #4a90f8;
      background-color: #f2f8ff;
      text-align: center;
      position: relative;
      .text {
        text-align: center;
      }
      .noPosition {
        position: relative;
      }
      div {
        cursor: default;
      }

      > div > .iconfont {
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        width: 15px;
        height: 15px;
        cursor: pointer;
        color: rgb(255, 128, 61);
        display: none;

        &:hover {
          color: #4a90f8;
        }
      }

      .delete {
        display: none;
        cursor: pointer;
        color: red;
        font-size: 12px;
      }
      &:hover {
        background-color: rgb(252, 248, 227);

        .iconfont {
          display: inline-block;
        }
      }
    }

    .iconarrows-right {
      right: 0;
    }

    .iconarrows-left {
      left: 0;
    }
  }
  .td {
    position: relative;
    flex: 1;
    overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    .iconfont {
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      width: 15px;
      height: 15px;
      cursor: pointer;
      color: rgb(255, 128, 61);
      display: none;

      &:hover {
        color: #4a90f8;
      }
    }
    //
    .iconarrows-top {
      top: 0;
    }
    .iconarrows-left {
      left: 0;
      right: auto;
    }
    .iconarrows-bottom {
      bottom: 0;
    }
  }
  .td:nth-child(odd) {
    background-color: #fafafa;
  }
  .td:hover {
    background-color: rgb(252, 248, 227);
    .iconfont {
      display: inline-block;
    }
  }
}

.tableScope {
  position: relative;
  padding: 25px;
  text-align: center;
  color: #333333;

  i {
    position: absolute;
    width: 14px;
    height: 14px;
    margin: auto;
    color: #ffb63d;
    cursor: pointer;
    // display: none;
    padding: 5px;
    border-radius: 10px;
  }

  i:hover {
    background-color: rgba(255, 227, 227, 0.7);
  }

  .el-icon-bottom {
    bottom: 0;
    left: 0;
    right: 0;
  }

  .el-icon-right {
    top: 0;
    bottom: 0;
    right: 0;
  }

  .el-icon-back {
    top: 0;
    bottom: 0;
    left: 0;
  }

  .el-icon-top {
    top: 0;
    left: 0;
    right: 0;
  }
}

.title {
  margin-left: 15px;
  padding-left: 10px;
  color: #4a90f8;
  border-left: 5px solid #4a90f8;
  display: flex;
  margin-bottom: 15px;

  .iconBtn {
    border-radius: 10px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 17px;
  }
  .delete1 {
    opacity: 0.5;
  }
}

.btnNav {
  .btnForm {
    margin-left: 15px;
    width: 300px;
    height: 40px;
    display: inline-block;
  }

  .btnList {
    padding-right: 15px;
    float: right;
  }
}
</style>
