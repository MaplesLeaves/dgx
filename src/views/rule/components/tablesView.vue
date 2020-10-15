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
    <div v-for="(item, i) in tableDataLisrs" :key="i">
      <tables
        :menu.sync="myMenu"
        :table-data.sync="tableDataLisrs[i]"
        :off-delete="tableDataLisrs.length > 1"
        :delete-table="() => {deleteTable(i)}"
        :copyTable="() => {copyTable(i)}"
      />
    </div>
  </div>
</template>

<script>
import tabData from "../data.js";
import tables from "./tables";
import tableSapnValue from "./tableSapnValue";
export default {
  components: {
    tableSapnValue: tableSapnValue,
    tables: tables,
  },
  props: {
    menu: {
      type: Object,
      requiret: true,
    },
  },
  data() {
    return {
      myMenu: {},
      tableDataLisrs: [],
    };
  },
  watch: {
    menu(val) {
      this.myMenu = val;
    },
    myMenu(val) {
      this.$emit("update:menu", val);
    },
  },
  created() {
    this.myMenu = this.menu;
    this.getDataInfo();
  },
  methods: {
    // 复制表格
    copyTable(index) {
      const table = JSON.parse(JSON.stringify(this.tableDataLisrs[index]));
      this.tableDataLisrs.push(table);
      console.log(table);
    },
    // 删除表格
    deleteTable(index) {
      this.$confirm('确认删除该配置表格？', '删除表格', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableDataLisrs.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 获取所需数据
    getDataInfo() {
      const data = JSON.parse(JSON.stringify(tabData));
      const data1 = JSON.parse(JSON.stringify(data));
      this.tableDataLisrs = [data];
    },
    // 保存数据
    saveFrom() {},
  },
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
