<template>
  <el-container class="deployInfo"  :class="{Microservice:  env !== 'production'}">
    <el-aside width="200px" class="leftMenu" v-if="env !== 'production'">
      <ul>
        <li v-for="(item, index) in leftMenu" :key="index" @click='getTabBar(item.title_json, index, item)'
          :class="{activeInfo: index === nowIndex}">
          <el-tooltip class="item" effect="dark" :content="item.title_name" placement="right">
            <el-link :underline="false" class='itemMenu'>{{item.title_name}}</el-link>
          </el-tooltip>
        </li>
      </ul>
    </el-aside>
    <div class="content" v-loading='downLoading'>
      <h3>
        基础类指标
      </h3>
      <div class='titleHeader'>
        查询条件
      </div>
      <header>
        <div class="serchTitle">
          <div>
            <span class='titleName'>统计日期：</span>
            <div>
              <el-date-picker class="itemTime" v-model="message.date" type="date" size="mini" value-format='yyyy-MM-dd'
                placeholder="选择日期" style="width: 200px"></el-date-picker>
            </div>
          </div>
          <div>
            <span class='titleName'>机构：</span>
            <div>
              <div @click="showDiaolog">
                <el-input v-model="message.text" style="width: 200px" size="mini" :readonly="true"></el-input>
              </div>
            </div>
          </div>
          <br>
          <div>
            <span class='titleName'>结算月：</span>
            <div>
              <el-date-picker v-model="date" type="monthrange" range-separator="至" value-format='yyyy-MM'
                start-placeholder="开始月份" size='mini' style="width: 200px" class='dateAll' end-placeholder="结束月份">
              </el-date-picker>
            </div>
          </div>
          <div>
            <span class='titleName'>汇总层级：</span>
            <div>
              <el-select class="itemList" size="mini" style="width: 200px" v-model="message.sumLevel" placeholder="请选择">
                <el-option v-for="(item, index) in list" :label="item.quota_name" :value="item.column_code" :key="index"
                  :disabled='item.disabled'></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class='titleRight'>
          <el-button type="primary" size='mini' @click="serch(false)"> <i class='iconfont iconicon_chaxun' />查询
          </el-button>
          <br>
          <el-button type="primary" size='mini' @click="undateTitle"> <i class='iconfont iconicon_zhongzhi' />重置
          </el-button>
        </div>
      </header>
      <div class='titleHeader export'>
        查询结果
        <span @click='serch(true)'>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconicon_daochu"></use>
          </svg>
          报表导出
        </span>
        <span @click='serch(true, ".zip")' v-if="env !== 'production'">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconicon_daochu"></use>
          </svg>
          报表导出ZIP
        </span>
      </div>
      <div class='tabAllInfo'>
        <el-table :header-cell-style="{background:'#F4F7FC', color: '#467EAF', padding:　'10px 0'}"
          v-loading='showLoadIng' :data="tableData" style="width: 100%; font-size: 12px" v-if='showTab'>
          <template v-for="(item, index) in tableBar">
            <el-table-column
              :label="`${item.cName || item.quota_name} ${item.compareMonth ? item.compareMonth == 12 ? '(同比)': '(环比)': '' }`"
              :prop="item.column_code" v-if='!item.showEs' :key="index">
              <template slot-scope="scope">
                {{
              item.column_code === "fgsname" ||
              item.column_code === "zzgsname" ||
              item.column_code === "zgsname" ||
              item.column_code === "secname" ||
              item.column_code === "deptname" ||
              item.column_code === "offname" ? scope.row[item.column_code] : scope.row[item.column_code] || 0}}
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <footer v-if='total'>
        <el-pagination style='text-aligin: right' @current-change="changeIndex" :page-size="20"
          layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </footer>
      <el-dialog title="机构/部门" :visible.sync="dialogVisible" width="560px">
        <div>
          <div class='treeTitle'>
            <ul>
              <li>
                <span>
                  代码 :
                </span>
                <el-input v-model="treeMessage.keys" style="width: 297px" size="mini"></el-input>
              </li>
              <li>
                <span>
                  名称 :
                </span>
                <el-input v-model="treeMessage.name" style="width: 297px" size="mini"></el-input>
              </li>
            </ul>
            <div>
              <el-button size="mini" type="primary" @click="serchTree"> <i class='iconfont iconicon_chaxun' /> 查询
              </el-button>
              <br>
              <el-button size="mini" type="primary" @click="closeTree"> <i class='iconfont iconicon_zhongzhi' /> 重置
              </el-button>
            </div>
          </div>
          <div style='min-height: 60px'>
            <div class='serch'>
              查询结果
            </div>
            <tree ref="tree" v-if='showTree' :serch='treeMessage'></tree>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeOrg" size="mini">取 消</el-button>
          <el-button type="primary" @click="submit" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
import tree from "@/components/tree";
import { getTreeList, getData, findList, downLoad, getTitleByName, downLoadZip } from '@/api'
import api from '@/request'
export default {
  name: "index",
  components: {
    tree,
  },
  data () {
    return {
      date: '',
      showTree: true,
      treeMessage: {
        name: '',
        keys: ''
      },
      showLoadIng: false,
      env: '',
      dialogVisible: false,
      showTab: false,
      time: '',
      list: [
        {
          quota_name: "分公司",
          val: 2,
          column_code: "fgsname",
        },
        {
          quota_name: "中支公司",
          val: 3,
          column_code: "zzgsname",
        },
        {
          quota_name: "支公司",
          val: 4,
          column_code: "zgsname",
        },
        {
          quota_name: "营业区",
          val: 5,
          column_code: "secname",
        },
        {
          quota_name: "业务部",
          val: 6,
          column_code: "deptname",
        },
        {
          quota_name: "业务室",
          val: 7,
          column_code: "offname",
        },
      ],
      nowIndex: 0,
      tag1: "",
      tableData: [

      ],
      tableBar: [],
      listBar: [
        {
          quota_name: "战区",
          column_code: "zqName",
        },
        {
          quota_name: "机构",
          column_code: "name",
        },
        {
          quota_name: "统计日期",
          column_code: "checkDate",
        }
      ],
      message: {
        "titleName": "",
        "sumLevel": "",
        "div": [],
        "date": '',
        pageSize: 20,
        pageIndex: 1,
        text: ''
      },
      total: 0,
      leftMenu: [
      ],
      showTab: false,
      nowTitle: [],
      firstOne: [],
      downLoading: false
    };
  },
  mounted () {
    this.env = process.env.VUE_APP_NODE_ENV || process.env.NODE_ENV
    if (this.env !== 'production') {
      findList().then(res => {
        this.leftMenu = res
        this.nowTitle = this.leftMenu[0].title_json
        this.message.titleName = this.leftMenu[0].title_name
      })
    } else {
      let name = sessionStorage.getItem('name')
      this.message.titleName = name
      getTitleByName({ title_name: name }).then(res => {
        this.nowTitle = res.title.title_json
      })
      sessionStorage.removeItem('name')
    }
  },
  methods: {
    myBrowser () {
      const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
      const isOpera = userAgent.indexOf("Opera") > -1;
      if (isOpera) {
        return "Opera";
      }
      if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
      }
      if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
      }
      if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
      }
      if (
        userAgent.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1 &&
        !isOpera
      ) {
        return "IE";
      }
      if (userAgent.indexOf("Trident") > -1) {
        return "Edge";
      }
      return "";
    },
    changeIndex (val) {
      this.message.pageIndex = val
      this.load()
    },
    getTabBar (val, index, item) {
      this.message.titleName = item.title_name
      this.nowTitle = val
      this.nowIndex = index
    },
    submit () {
      let data = this.$refs.tree.getMessage()
      if (!data.length) {
        this.$message({
          message: "请选择机构",
          type: "warning",
        });
        return
      }
      this.message.div = []
      this.message.text = ''
      data.forEach(item => {
        this.message.div.push({
          id: item.id,
          level: item.level
        })
        this.message.text += `${item.text},`
      })
      this.message.text = this.message.text.substr(0, this.message.text.length - 1);
      this.dialogVisible = false;
    },
    closeOrg () {
      let data = this.$refs.tree.getMessage()
      if (!data.length) {
        this.message.div = []
        this.message.text = ''
      }
      this.dialogVisible = false;
    },
    load () {
      this.showLoadIng = true
      getData(this.message).then(res => {
        this.total = res.countSize
        this.tableData = res.resultJson
        if (this.firstOne.length) {
          this.firstOne[0].zqName = '合计'
          this.tableData.unshift(this.firstOne[0])
        }
        this.showLoadIng = false
      }).catch(err => {
        this.showLoadIng = false
      })
    },
    undateTitle () {
      this.message = {}
      this.date = []
    },
    closeTree () {
      treeMessage = {}
      this.serchTree()
    },
    serchTree () {
      this.showTree = false
      setTimeout(() => {
        this.showTree = true
      }, 10)
    },
    async serch (val, type) {
      [this.message.comdateStart, this.message.comdateEnd] = this.date
      this.message.pageIndex = 1
      if (!this.message.text || !this.message.sumLevel || !this.message.comdateStart || !this.message.date) {
        this.$message({
          message: '请选择完整的搜索条件',
          type: 'warning'
        })
        return
      }
      this.showTab = false;
      let arrayInfo = JSON.parse(JSON.stringify(this.listBar));
      let oldVal = arrayInfo.filter((item) => {
        return !item.isAdd;
      });
      this.tableBar = [];
      this.list.forEach(item => {
        if (item.column_code === this.message.sumLevel) {
          this.tag1 = item.val
        }
      })
      if (this.tag1 <= 1) {
        let obj = this.list.find((val) => {
          return val.val === this.tag1;
        });
        obj.isAdd = true;
        oldVal.splice(1, 1, obj);
      } else {
        let array = this.list.filter((data, index) => {
          return data.val <= this.tag1 && data.val > 1;
        }, []);
        let message1 = JSON.parse(JSON.stringify(array));
        let message = message1.forEach((item) => {
          item.isAdd = true;
        });
        oldVal.splice(1, 1, ...message1);
      }
      this.tableBar = oldVal;
      this.tableBar = this.tableBar.concat(this.nowTitle)
      if (this.message.sumLevel === 'company') {
        this.tableBar.splice(0, 1)
      }
      if (val) {
        this.showTab = true;
        this.downLoading = true
        if (type) {
          downLoadZip(this.message).then(res => {
            this.loadExcel(res, this.message.titleName, type)
            this.downLoading = false
          }).catch(err => {
            console.log(err)
          })
        } else {
          downLoad(this.message).then(res => {
            this.loadExcel(res, this.message.titleName)
            this.downLoading = false
          }).catch(err => {
            console.log(err)
          })
        }
      } else {
        let serchInfo = JSON.parse(JSON.stringify(this.message))
        serchInfo.sumLevel = "company"
        this.firstOne = await getData(serchInfo).then(res => {
          return res.resultJson
        }).catch(err => {
          this.showLoadIng = false
        })
        this.$nextTick(() => {
          this.showTab = true;
          this.load()
        });
      }
    },
    loadExcel (res, fileName, type) {
      if (res) {
        let blob = new Blob([res], { type: 'text/csv,charset=UTF-8' }); // res就是接口返回的文件流了
        let objectUrl = URL.createObjectURL(blob);
        const elink = document.createElement("a");
        let date = new Date()
        let nowDate = date.toLocaleString('chinese', { hour12: false })
        elink.style.display = "none";
        elink.href = objectUrl;
        let filename1 = nowDate + fileName + (type || '.csv')
        if (this.myBrowser() === "IE" || this.myBrowser() === "Edge") {
          window.navigator.msSaveOrOpenBlob(blob, filename1);
          return false;
        }
        elink.setAttribute('download', filename1);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      }
    },
    showDiaolog () {
      this.dialogVisible = true;
    }
  },
};
</script>

<style lang='less' scoped>
.el-message {
  z-index: 10000 !important;
}
.el-date-editor .el-range-separator {
  width: 22px;
}
.deployInfo {
  min-height: 502px;
  background: #fafafa;
  box-sizing: border-box;
  footer {
    text-align: right;
    padding-top: 20px;
    background: white;
  }
  .dateAll {
    .el-input__icon {
      width: 25px;
      font-size: 12px;
    }
  }
  .treeTitle {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 0 12px;

    ul {
      border-right: 1px solid #e3e3e3;
      padding-right: 40px;
      li:nth-child(1) {
        margin-bottom: 10px;
      }
    }
    > div {
      text-align: center;
      > button:nth-child(1) {
        margin-bottom: 10px;
      }
    }
  }
  .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
  }
  .el-dialog__header {
    padding: 10px 20px;
    text-align: center;

    font-weight: 600;
    .el-dialog__title {
      font-size: 18px;
    }
  }
  .el-dialog__body {
    padding: 20px;
    overflow-y: auto;
  }
  .activeInfo {
    background: #3c6c95;
    padding: 10px 0;
    > a {
      color: white;
    }
  }
  .leftMenu {
    background: #467eaf;
    color: white;
    padding-top: 10px;
    > ul {
      > li {
        padding: 15px 15px 15px;
        .itemMenu {
          width: 100%;
          color: white;
          > span {
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //
            display: inline-block;
          }
        }
      }
    }
  }
  .content {
    padding: 0;
    width: 100%;
    overflow-x: auto;
    font-size: 12px;
    .el-table td,
    .el-table th {
      padding: 0;
    }
    .tabAllInfo {
      padding: 20px 20px 0 20px;
      background: white;
    }
    > h3 {
      background: white;
      padding: 10px;
      margin-bottom: 20px;
    }
    .export {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > span {
        color: #008cff;
        font-size: 14px;
      }
    }
    .titleHeader {
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
      position: relative;
      padding: 8px;
      padding-left: 20px;
      width: calc(~"100% - 20px");
      background: white;
      margin: 0 auto;
      box-sizing: border-box;
      border-bottom: 1px solid #e3e3e3;
      &:after {
        content: "";
        height: 15px;
        width: 4px;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: #467eaf;
      }
    }
    .serch {
      border-top: 1px solid #e3e3e3;
      position: relative;
      padding: 5px 20px;
      padding-top: 20px;
      font-weight: 600;
      &:after {
        content: "";
        height: 15px;
        width: 2px;
        position: absolute;
        left: 10px;
        top: 50%;

        background: #467eaf;
      }
    }
    header {
      width: calc(~"100% - 20px");
      background: white;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding: 8px;
      box-sizing: border-box;
      margin-bottom: 20px;
      .serchTitle {
        border-right: 1px solid #e3e3e3;
        display: inline-block;
        width: calc(~"100% - 150px");
        > div {
          display: inline-block;
          margin-right: 20px;
          margin-bottom: 20px;
          &:nth-last-child(1) {
            margin-bottom: 0px;
          }
          > div {
            display: inline-block;
          }
          .titleName {
            display: inline-block;
            width: 60px;
          }
        }
      }
      .titleRight {
        flex: 1;
        display: inline-block;
        text-align: center;
        > button {
          margin-top: 8px;
        }
      }
    }
  }
}
.Microservice {
  min-height: 100%;
}
.el-dialog__headerbtn {
  top: 15px;
}
</style>