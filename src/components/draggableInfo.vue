<!--
 * @Author: your name
 * @Date: 2020-07-28 14:02:42
 * @LastEditTime: 2020-08-05 19:11:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \taibao\src\components\draggableList.vue
--> 
<template>
  <draggable v-model="titleBar" @add="addInfo" class='draggableMain tab' :options="{group: {name: 'a', pull:'false'}}">
    <div v-for='(item, index) in  titleBar' :key='index' @click="serchIndex(index)"
      :class="{'active' :index === showIndex}">
      <div>
        <span>
          {{item.cName || item.quota_name}}
        </span>
        <div class='action'>
          <el-popover v-if="item.isCondition !== 'Y'" placement="bottom-start" width="374" v-model="item.isShow"
            trigger="manual">
            <!-- 弹框整体内容 -->
            <div class="main">
              <div class="fixation">
                <div>
                  <div class="item">
                    <span>指标名称：</span>
                    <div class="right">
                      {{item.quota_name}}
                    </div>
                  </div>
                </div>
                <div>
                  <div class="item">
                    <span>自定义名称：</span>
                    <div class="right">
                      <el-input size="mini" v-model="item.cName" :maxlength="50"
                        @change="e=>changeName(e, item, 'cName')"></el-input>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="item">
                    <span>统计时间：</span>
                    <div class="spaceItem">
                      <el-date-picker v-model="item.comdate" type="month" size="mini" value-format='yyyy-MM'
                        placeholder="选择日期">
                      </el-date-picker>
                      <div>
                        <span @click="$set(item, 'exp', '+')" :class="{active: item.exp === '+'}">+</span>
                        <span @click="$set(item, 'exp', '-')" :class="{active: item.exp === '-'}">-</span>
                      </div>
                      <el-input v-on:input="e=>changeInput(e,item ,'expvalue')" placeholder="请输入内容" size="mini"
                        v-model="item.expvalue">
                        <template slot="append">个月</template>
                      </el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 底部关闭 -->
            <div class="footerBar">
              <el-button type="primary" size="mini" @click="affirm(item)">确定</el-button>
              <el-button size="mini" type='danger' @click="close(item)">取消</el-button>
            </div>
            <span slot="reference" @click.stop="show(item)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconicon_bianji"></use>
              </svg>
            </span>
          </el-popover>
          <!-- <span @click.stop="changeEays(item)">
            <i class='iconfont iconbukejian' :style='{color: !item.showEs ? "#5EAAFF" : "#EAEAEA", fontSize: "12px"}' />
          </span> -->
          <span @click.stop="removeItem(index)">
            <i class='iconfont iconicon_shanchu' style='color: pink; font-size: 12px' />
          </span>
        </div>
      </div>
      <!-- 
        底部声场指标展示
        -->
      <ul>
        <li>
          <div>
            <div>
              <span>指标名称：</span>
              <p>{{item.quota_name}}</p>
            </div>
          </div>
        </li>
        <li>
          <div>
            <div>
              <span>统计时间：</span>
              <p>{{item.comdate}}</p>
            </div>
          </div>
        </li>
        <li v-if="item.exp && item.expvalue">
          <div>
            <div>
              <span>统计日期：</span>
              <p> {{item.exp}}{{item.expvalue}} 个月</p>
            </div>
          </div>
        </li>
      </ul>
      <!-- <draggable element='ul' v-model="list" :options="{group: {name: 'a', pull:'false'}, sort: false}">
        <li v-for=" (item, index) in list" :key="index">
        </li>
      </draggable> -->

    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import switchInfo from './switch.vue'
import { getList } from '@/api'
import { deflate } from 'zlib';
export default {
  name: "draggableInfo",
  components: {
    draggable,
    switchInfo
  },
  filters: {
    getValue (value) {
      let name = []
      if (value) {
        value.forEach((item) => {
          name.push(item.cname)
        })
      }
      return name.toString()
    }
  },
  data () {
    return {
      isTrue: false,
      titleBar: [],
      value1: false,
      normList: [],
      normInfo: '', // 缓存当前选择数据
      isShow: false,
      nowNum: 0,
      showIndex: null,
      tagNorm: '',
      calculateList: ["+", "-", "*", "/", "(", ")"],
      symbol: ''
    };
  },
  props: {
    title: {
      type: Array,
      default: () => []
    },
    numInfo: {
      type: Number,
      default: () => 0
    }
  },
  watch: {
    title: {
      handler (val) {
        this.titleBar = JSON.parse(JSON.stringify(val));
      },
      deep: true,
      inserted: true
    },
    numInfo: {
      handler (val) {
        this.nowNum = val
      },
      deep: true,
      inserted: true
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.querySelector("input").focus();
      },
    },
  },
  mounted () {
    getList().then(res => {
      this.normList = res.condition
    })
  },
  methods: {
    changeName (e, item, key) {
      if (Number(e)) {
        this.$message({
          type: 'warning',
          message: '指标名称不能为纯数字'
        })
        this.$set(item, key, '')
      }
    },
    changeInput (val, item, val1) {
      if (val === '0') {
        this.$set(item, val1, '')
      }

      this.$set(item, val1, val.replace(/[^\d]/g, ''))
      if (val >= 0 && val <= 50) {
      } else {
        this.$set(item, val1, '')
      }
    },
    handleClose (val, k) {
      val.tagList.splice(k, 1)
    },
    addTag (item, key, type) {
      if (!key) {
        return
      }
      if (!item.tagList) {
        this.$set(item, 'tagList', [])
      }
      if (type === 'tag') {
        let obj = JSON.parse(key)
        item.tagList.push({
          type: type,
          value: obj.column_code,
          label: obj.cName || obj.quota_name
        })
      } else {
        item.tagList.push({
          type: type,
          value: key,
          label: key
        })
      }
    },
    changeEays (val) {
      this.$set(val, 'showEs', !val.showEs)
    },
    // 标签提交
    tagSubmit (val) {
      let expElements = [], exp = ''
      val.tagList.forEach(e => {
        if (e.type === 'tag') {
          expElements.push(e.value)
        }
        exp += e.value
      })
      val.exp = exp
      val.expElements = expElements
      this.tagClose(val)
    },
    // 标签关闭
    tagClose (val) {
      this.$set(val, 'isShow', false)
      this.isShow = false
    },
    removeItem (index) {
      if (this.isShow) {
        this.$message({
          type: 'warning',
          message: '请先关闭操作栏'
        })
        return
      }
      this.$confirm('此操作将删除该指标, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.titleBar.splice(index, 1);
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
    serchIndex (val) {
      this.showIndex = val
    },
    changeS (e, key, val) {
      let isTrue = e ? '1' : '0'
      this.$set(key, val, isTrue)
    },
    // 改变radio
    changeRadio (e, item) {
      item.value = e
      this.$set(item, 'value', e)
      item.child.forEach(val => {
        if (e === val.codevalue) {
          item.name = val.codename
        }
      })
    },
    //选择条件添加信息
    addNor (item) {
      let data = []
      if (!this.normInfo) {
        this.$message({
          type: 'warning',
          message: '请选择指标'
        })
        return
      }
      let message = JSON.parse(this.normInfo)
      if (message.input_type === 'expByType') {
        this.$set(message, 'cal_type', 'sum')
        this.$set(message, 'expByType', 'sum')
        this.$set(message, 'exp1', '<')
        this.$set(message, 'exp2', '<')
        this.$set(message, 'enddate', '')
        this.$set(message, 'showNum', false)
        this.$set(message, 'showDate', false)
      } else if (message.input_type === 'radio') {
        this.$set(message, 'value', null)
      }
      item.list.push(message)
    },
    // 删除当前条
    deleteItem (item, index) {
      item.list.splice(index, 1)
    },
    show (item) {
      let data = []
      if (item.condition) {
        data = JSON.parse(JSON.stringify(item.condition))
      }
      this.$set(item, 'list', data)
      console.error(this.isShow)
      if (this.isShow) {
        this.$message({
          type: 'warning',
          message: '请先关闭其他操作栏'
        })
        return
      }
      this.$set(item, 'isShow', true)
      this.isShow = true
    },
    changeColum (item) {
      if (this.isShow) {
        this.$message({
          type: 'warning',
          message: '请先关闭其他操作栏'
        })
        return
      }
      this.$set(item, 'isShow', true)
      this.isShow = true
    },
    addColum (val) {
      val.column_code = this.createCellPos(this.nowNum)
      this.titleBar.push(val)
      this.nowNum++
    },
    // 同比
    together () {
      if (this.titleBar.length >= 50) {
        this.titleBar.splice(val.newIndex, 1)
        this.$message({
          type: 'warning',
          message: '指标不能超过50个'
        })
        return
      }
      let obj = JSON.parse(JSON.stringify(this.titleBar[this.showIndex]))
      if (obj.condition) {
        for (const item of obj.condition) {
          if (item.isCompare === '1') {
            for (let key in item) {
              if (isNaN(item[key]) && !isNaN(Date.parse(item[key]))) {
                let d = new Date(item[key])
                d.setMonth(d.getMonth() - 12)
                item[key] = this.getDate(d, item[key].length > 7)
              }
            }
          }
        }
      }
      obj.column_code = this.createCellPos(this.nowNum)
      obj.showMask = true
      this.titleBar.push(obj)
      this.nowNum++
      this.$message({
        type: 'success',
        message: '同比成功'
      })
      this.$set(this, 'showIndex', null)
    },
    // 环比
    loop () {
      if (this.titleBar.length >= 50) {
        this.titleBar.splice(val.newIndex, 1)
        this.$message({
          type: 'warning',
          message: '指标不能超过50个'
        })
        return
      }
      let obj = JSON.parse(JSON.stringify(this.titleBar[this.showIndex]))
      if (obj.condition) {
        for (const item of obj.condition) {
          if (item.isCompare === '1') {
            for (let key in item) {
              if (isNaN(item[key]) && !isNaN(Date.parse(item[key]))) {
                let d = new Date(item[key])
                d.setMonth(d.getMonth() - 1)
                item[key] = this.getDate(d, item[key].length > 7)
              }
            }
          }
        }
      }
      obj.compareMonth = '1'
      obj.column_code = this.createCellPos(this.nowNum)
      obj.showMask = true
      this.titleBar.push(obj)
      this.nowNum++
      this.$message({
        type: 'success',
        message: '环比成功'
      })
      this.$set(this, 'showIndex', null)
    },
    // 点击确认
    affirm (item) {
      let data = JSON.parse(JSON.stringify(item.list))
      item.order = "2"
      item.condition = data
      item.isShow = false
      this.isShow = false
    },
    addMessageInfo () {
      if (this.titleBar.length >= 50) {
        this.titleBar.splice(val.newIndex, 1)
        this.$message({
          type: 'warning',
          message: '指标不能超过50个'
        })
        return
      }
      let obj = this.titleBar[this.showIndex]
      let data = JSON.parse(JSON.stringify(this.titleBar))
      obj.column_code = this.createCellPos(this.nowNum)
      data.push(obj)
      this.$set(this, 'titleBar', data)
      this.$set(this, 'showIndex', null)
      this.nowNum++
      this.$message({
        type: 'success',
        message: '复制成功'
      })
    },
    // 修改时间
    getDate (date, isDate) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = ''
      if (isDate) {
        d = date.getDate();
        d = d < 10 ? ('-0' + d) : ('-' + d);
      }
      return y + '-' + m + d;
    },
    close (item) {
      item.list = []
      item.isShow = false
      this.isShow = false
    },
    addInfo (val) {
      if (this.titleBar.length > 50) {
        this.titleBar.splice(val.newIndex, 1)
        this.$message({
          type: 'warning',
          message: '指标不能超过50个'
        })
        return
      }
      this.$set(this.titleBar[val.newIndex], 'list', [])
      this.$set(this.titleBar[val.newIndex], 'isShow', false)
      this.$set(this.titleBar[val.newIndex], 'type', 'census')
      this.$set(this.titleBar[val.newIndex], 'column_code', this.createCellPos(this.nowNum))
      this.nowNum++
      this.$emit('getBack')
    },
    // 改变 select 获取 codevalue 
    selectChange (key, e) {
      key.value = []
      key.names = []
      e.forEach(item => {
        key.value.push(JSON.parse(item).codevalue)
        key.names.push(JSON.parse(item).codename)
      })
    },
    changeDate (item, val, e) {
      let isfalse = item.startdate > item.enddate
      if (!item.startdate || !item.enddate) {
        return
      }
      if (isfalse) {
        this.$message({
          type: 'warning',
          message: '起始月不能大于结束月'
        })
        this.$set(item, val, '')
      }
      // console.error(e)
      // if (e) {
      //   console.error(e)
      // }
    },
    // 年龄条件进行改变
    changeAge (item, val) {
      let isfalse = Number(item.age_start) > Number(item.age_end)
      if (!item.age_start || !item.age_start) {
        return
      }
      if (isfalse) {
        this.$message({
          type: 'warning',
          message: '起始年龄不能大于结束年龄'
        })
        this.$set(item, val, '')
      }
    },
    closeMessage (key, type, val, val1) {
      this.$set(key, type, !key[type])
      this.$set(key, val, '')
      this.$set(key, val1, '')
    },
    // 数值转化为 a b c
    createCellPos (n) {
      var ordA = "A".charCodeAt(0);
      var ordZ = "Z".charCodeAt(0);
      var len = ordZ - ordA + 1;
      var s = "";
      while (n >= 0) {
        s = String.fromCharCode((n % len) + ordA) + s;
        n = Math.floor(n / len) - 1;
      }
      return s;
    },
  },
};
</script>
<style lang='less'>
.autoSpace () {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bBottom() {
  border-bottom: 1px solid #e3e3e3;
}
.columList {
  box-sizing: border-box;
  padding: 0 15px;
  > li {
    .autoSpace();
    padding: 10px 0;
    > div {
      width: calc(80% - 35px);
    }
    > .numberList {
      .autoSpace();
      > span {
        width: 24px;
        height: 24px;
        border: 1px solid #e3e3e3;
        color: #e3e3e3;
        text-align: center;
        line-height: 24px;
        font-size: 12px;
      }
      > .active {
        border-color: #40a9ff;
      }
    }
    > .tag {
      > .tagList {
        margin-right: 10px;
        height: 25px;
        line-height: 25px;
        i {
          color: red;
        }
      }
    }
    &:nth-child(1) {
      .bBottom();
    }
    &:nth-last-child(1) {
      align-items: flex-start;
    }
  }
}
.main {
  max-height: 300px;
  overflow-y: auto;
  > ul {
    margin-bottom: 20px;
    > li {
      padding: 17px 0;
      .bBottom();
      &:nth-last-child(1) {
        border: none;
      }
      > div {
        width: 330px;
      }
      .autoSpace();
      align-items: flex-start;
    }
  }
  > .fixation {
    width: 100%;
    // .bBottom();
    padding: 15px 0;
    > div {
      .autoSpace();
      margin-bottom: 8px;
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
      > .item {
        width: 330px;
        display: flex;
        align-items: center;
        > .right {
          width: 240px;
        }
        > .spaceItem {
          .autoSpace();
          width: 240px;
          > div {
            .el-input-group__append,
            .el-input-group__prepend {
              padding: 0;
            }
            &:nth-child(2) {
              margin: 0 5px;
              .autoSpace();
              > span {
                width: 14px;
                height: 14px;
                background: #ffffff;
                border-radius: 2px;
                border: 1px solid #e3e3e3;
                text-align: center;
                line-height: 10px;
                color: #e3e3e3;
                margin-right: 5px;
                &:nth-child(2) {
                  margin-right: 0;
                }
              }
              > .active {
                border-color: #40a9ff;
                color: black;
              }
            }
          }
        }
        .autoChild {
          .autoSpace();
          > button {
            width: 48%;
          }
        }
        > span {
          flex: 1;
          box-sizing: border-box;
          padding-right: 6px;
          text-align: right;
        }
      }
    }
  }
  .ageInfo {
    .autoSpace();
    align-items: flex-start;
    > span {
      flex: 1;
      text-align: right;
      padding-right: 6px;
      padding-top: 5px;
    }

    > div {
      width: 240px;
      > .top {
        margin-bottom: 10px;
        .autoSpace();
        > .han {
          .autoSpace();
        }
        .hanborder {
          border: 1px solid #e3e3e3;
        }
      }
    }
  }
  .comdateInfo {
    .autoSpace();
    align-items: flex-start;
    > div {
      width: 240px;
      > div {
        margin-bottom: 10px;
        &:nth-last-child(1) {
          margin-bottom: 0;
        }

        .autoSpace();
        > div,
        button {
          flex: 1;
        }
      }
      > span {
        flex: 1;
      }
    }
    > span {
      flex: 1;
      text-align: right;
      padding-right: 6px;
    }
  }
  .expByType {
    > div {
      margin-bottom: 10px;
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
      > div {
        margin-bottom: 10px;
        &:nth-last-child(1) {
          margin-bottom: 0;
        }
      }
    }
    > .title {
      .autoSpace();
      > span {
        flex: 1;
        text-align: right;
        padding-right: 6px;
      }
      > div {
        .autoSpace();
        width: 240px;
        > button {
          flex: 1;
        }
      }
    }
    > .sum {
      > .addList {
        position: relative;
        > i {
          position: absolute;
          top: 5px;
          right: -27px;
          color: #3090f8;
          font-size: 12px;
        }
      }
      > div {
        .autoSpace();
        .callNumber {
          position: relative;
          > i {
            position: absolute;
            top: 5px;
            right: -27px;
            color: #3090f8;
            font-size: 12px;
          }
          > div {
            .autoSpace();
            justify-content: flex-start;
            > div {
              &:nth-child(1) {
                width: 50%;
                margin-right: 10px;
              }
              &:nth-last-child(1) {
                border-radius: 20px;
                background: #e3e3e3;
                width: 80px;
                .autoSpace();
                > span {
                  flex: 1;
                  text-align: center;
                  color: white;
                }
                > .active {
                  background: #73a4ff;
                  border-radius: 20px;
                  line-height: 20px;
                }
              }
            }
          }
        }
        > span {
          flex: 1;
          text-align: right;
          padding-right: 6px;
        }
        > div {
          width: 240px;
          .autoSpace();
          > button,
          > div {
            flex: 1;
          }
        }
      }
    }
    > .count {
      > div {
        .autoSpace();
        > span {
          flex: 1;
          text-align: right;
          padding-right: 6px;
        }
        > div {
          width: 240px;
        }
      }
    }
  }
  .joindate {
    .autoSpace();
    > span {
      flex: 1;
      text-align: right;
      padding-right: 6px;
    }
    > div {
      width: 240px;
      .autoSpace();
    }
  }
  .jobCodeInfo {
    .autoSpace();
    align-items: flex-start;
    > span {
      flex: 1;
      text-align: right;
      padding-right: 6px;
    }
    > div {
      width: 240px;
      > div {
        margin-bottom: 10px;
        &:nth-last-child(1) {
          margin-bottom: 0;
        }
      }
    }
  }
  .selectInfo,
  .radioInfo {
    .autoSpace();
    > div {
      width: 240px;
      .autoSpace();
      > button {
        flex: 1;
      }
    }
    > span {
      flex: 1;
      text-align: right;
      padding-right: 6px;
    }
  }
}
.footerBar {
  text-align: center;
  display: flex;
  justify-content: space-evenly;
}
.draggableMain {
  height: 100%;
  display: flex;
  align-items: flex-start;
  width: 100%;
  overflow-x: auto;
  > div {
    background: #f2f8ff;
    border-right: 1px solid #fff;
    min-width: 219px;
    box-sizing: border-box;
    padding: 8px 10px;
    position: relative;
    text-align: center;
    &:nth-last-child(1) {
      border: none;
    }
    > div {
      > span {
        color: #3090f8;
      }
      > .action {
        display: inline-block;
        margin-left: 12px;
        > span {
          margin-right: 6px;
          &:nth-child(3) {
            margin: 0;
          }
        }
      }
    }
    > ul {
      text-align: left;
      position: absolute;
      top: 100%;
      left: 0;
      font-size: 14px;
      width: 100%;
      font-size: 12px;
      > li {
        &:nth-child(2n + 2) {
          background: #fafafa;
        }
        &:nth-last-child(1) {
          margin: 0;
        }
        > div {
          > div {
            .autoSpace();
            justify-content: flex-start;
            align-items: flex-start;
            padding: 5px 0;
            > span {
              width: 70px;
              box-sizing: border-box;
              padding-right: 6px;
              text-align: right;
            }
            > p {
              text-align: left;
              flex: 1;
              color: #5eaaff;
            }
          }
        }
        // > .jobcode {
        //   background: red;
        //   > div {
        //     align-items: flex-start;
        //   }
        // }
      }
    }
  }
  > .active {
    background: #e2e8ee;
  }
}
</style>