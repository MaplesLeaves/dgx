<!--  -->
<template>
  <div class="">
    <div class="btnNav">
      <div class="btnForm"></div>
      <div class="btnList">
        <el-button type="success" size="mini" @click="saveFrom">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconicon_renwuxinzeng"></use>
          </svg>
          保存
        </el-button>
      </div>
    </div>
    <div class="title">
      指标名称

      <el-tooltip class="item" effect="dark" content="新增指标" placement="top">
        <div class="iconBtn">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconxinzengmingxi"></use>
          </svg>
        </div>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="复制指标" placement="top">
        <div class="iconBtn">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconfuzhi"></use>
          </svg>
        </div>
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="删除指标" placement="top">
        <div class="iconBtn delete">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconfuzhibeifen"></use>
          </svg>
        </div>
      </el-tooltip>
    </div>

    <div class="tables">
      <div class="list">
        <div class="th">
          <span>基本法</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <div class="td">
          {{ tableData.lawEdition }}
        </div>
      </div>
      <div class="list" v-for="(item, il) in myTableData" :key="il + 'il'">
        <div class="th">
          <div v-if="item[0].type === 'judge'">
            <i class="iconfont iconarrows-right" @click="addTableList(0, il)" />
            <i class="iconfont iconarrows-left" @click="addTableList(1, il)" />
            <div class="text">
              指标{{ il + 1 }}
              <span
                  class="delete iconfont iconicon_shanchu"
                  @click="deleteTableList(il)"
              />
            </div>
          </div>
          <div v-else>指标名称</div>
        </div>
        <div class="td" v-for="(span, is) in item" :key="is + 'is'">
          <div v-if="span.type === 'judge'">
            <i v-if="is !== 0" class="iconfont iconarrows-top" @click="moveCell(0, il, is)" />
            <i v-if="is+1 !== item.length" class="iconfont iconarrows-bottom" @click="moveCell(1, il, is)" />
            <i class="iconfont iconarrows-left" @click="moveCell(1, il)" />
            <table-sapn-value :condition-data="span.condition" />
          </div>
          <div v-if="span.type === 'assign'" class="assign">
            常量
            <table-sapn-value :condition-data="span.condition" />
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

    <div class="popoverBox" id="popoverBox" v-show="popoverBox">
      <el-cascader-panel
        :options="popoverBoxOptions"
        :props="popoverBoxProps"
      ></el-cascader-panel>
    </div>
  </div>
</template>

<script>
import tableSapnValue from "./tableSapnValue";
export default {
  components: {
    tableSapnValue: tableSapnValue,
  },
  props: {
    tableData: {
      type: Object,
      requiret: true,
    },
  },
  data() {
    return {
      popoverBox: false,
      popoverBoxProps: {
        expandTrigger: "hover",
      },
      popoverBoxOptions: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
          ],
        }
      ],
      myTableData: [],
      tablesListObjcet: {},
      tableIndex: 1,
      myTableListFrom: {},
      myTableListCell: {},
      myTableListTree: {},
      //   myTableListFromList: [],
      //   myTableListFromIndex: 0,
    };
  },
  created() {
    this.tablesListObjcet = this.tableData;
    this.applyData()
    console.log(this.tablesListObjcet);
  },
  methods: {
    // 获取数据后渲染页面
    applyData() {
      this.addParentId(this.tablesListObjcet.startNodes, 0);
      // 添加第一条数据
      this.myTableData = [];
      this.myTableData.push(this.tablesListObjcet.startNodes);
      this.tableDataRecursion(this.tablesListObjcet.startNodes);
    },
    // 保存table
    saveFrom() {
      let arr = this.myTableData.flat();
      const tableFromData = this.listToTree(arr);
      this.tablesListObjcet.startNodes = tableFromData;
    },
    // 整理list
    listToTree(oldArr) {
      oldArr.forEach((element) => {
        let parentId = element.parentId;
        if (String(parentId) !== '0') {
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
      return oldArr;
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
        this.$set(this.myTableData, this.tableIndex, arr)
      }
      this.tableIndex++;
      if (arr.length) {
        this.tableDataRecursion(arr);
      }
    },
    // 上下移动元素
    moveCell(type, il, is) {
      const {parentId} = this.myTableData[il][is];
      let id = ''
      // 找到父级
      this.myTableData.forEach(item => {
        item.forEach(span => {
          if (span.id === parentId) {
            id = span.id
          }
        })
      })
      // list转tree结构
      let arr = this.myTableData.flat();
      this.myTableListTree = this.listToTree(arr)[0];
      // 找到节点
      this.queryTableCell(this.myTableListTree, id)
      if (this.myTableListCell.childNodes.length > 1) {
        // 转换方向
        const list = JSON.parse(JSON.stringify(this.myTableListCell.childNodes))
        const obj = list.splice(is, 1)[0];
        if (type === 1) {
          this.myTableListCell.childNodes.splice(is + 1, 0, obj);
        } else {
          this.myTableListCell.childNodes.splice(is - 1, 0, obj);
        }
      } else {
        this.$message('无法移动');
      }

      this.queryTableCellTree(this.myTableListTree, this.myTableListCell.id)
      console.log(this.myTableListTree)
      this.addParentId([this.myTableListTree], 0);
      // // 添加第一条数据
      this.myTableData = [];
      this.tableIndex = 1;
      this.myTableData.push([this.myTableListTree]);
      this.tableDataRecursion([this.myTableListTree]);

      console.log(this.myTableData)

      // console.log(obj)
      // const list = JSON.parse(JSON.stringify(this.myTableData[il]))
      // const obj = list.splice(is, 1)[0];
      // /**
      //  * 0: 上移
      //  * 1: 下移
      //  */
      // if (type === 1) {
      //   list.splice(is + 1, 0, obj);
      // } else {
      //   list.splice(is - 1, 0, obj);
      // }
      // this.$set(this.myTableData, il, list)
    },
    // 递归查找节点替换数据
    queryTableCellTree(tree, id, arr = [0]) {
      console.log(String(tree.id) === String(id))
      if (String(tree.id) === String(id)) {
        console.log(1231231)
        // arr.forEach(item => {
        //   console.log(this.myTableListTree)
        // })
        // tree = this.myTableListCell
        // this.myTableListCell = tree;
        // return
      }
      if (tree.childNodes.length) {
        tree.childNodes.forEach((item, i)  => {
          arr.push(i)
          this.queryTableCell(item, id, arr)
        })
      }
    },
    // 递归查找节点
    queryTableCell(tree, id) {
      if (String(tree.id) === String(id)) {
        this.myTableListCell = tree;
        return
      }
      if (tree.childNodes.length) {
        tree.childNodes.forEach(item => {
          this.queryTableCell(item, id)
        })
      }
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
          console.log(this.myTableData);
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
      console.log(this.myTableData);
    },
    // 创建右键弹窗
    addTarget(type, e, scope) {
      console.log(e);
      const { pageX, pageY } = e;
      const popoverBox = document.getElementById("popoverBox");
      popoverBox.style.top = pageY + "px";
      popoverBox.style.left = pageX + "px";
      this.popoverBox = true;
      // popoverBox.style.display = pageX;
      // TODO 区分弹窗
      if (type === 0) {
      }
      if (type === 1) {
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.tables {
  display: flex;
  padding: 0 15px;

  .list {
    min-width: 100px;

    > div {
      padding: 15px;
      border-right: 1px solid #ffffff;
      min-height: 19px;
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
    }

    .th:hover {
      background-color: rgb(252, 248, 227);

      .iconfont {
        display: inline-block;
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
