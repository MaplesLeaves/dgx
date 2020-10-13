<template>
  <el-container class='detailEdit' >
    <el-header class='header'>
      <strong>
        报表配置
      </strong>
      <div class='right'>
        <el-button type="primary" size='mini' @click="callBack"> <i class='iconfont iconicon_fanhui' /> 返回</el-button>
        <el-button v-if="env !== 'production'" type="primary" size='mini' @click="submitTitle('1')"> <i
            class='iconfont iconicon_caidan' /> 本地测试保存
        </el-button>
        <el-button type="primary" size='mini' @click="submit('1')"> <i class='iconfont iconicon_caidan' /> 保存
        </el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class='aside'>
        <el-collapse accordion>
          <el-collapse-item v-for="(item, index) in info" :key="index+'22'" class="titleInfo">
            <template slot="title">
              <img src='~/img/basics.png' style='width: 16px; height:16px;margin-right: 10px'
                v-if='item.icon_name === "basics"' />
              <img src='~/img/structure.png' style='width: 16px; height:16px;margin-right: 10px'
                v-else-if='item.icon_name === "structure"' />
              <img src='~/img/capacity.png' style='width: 16px; height:16px;margin-right: 10px'
                v-else='item.icon_name === "capacity"' />
              {{item.categoryName}}
            </template>
            <draggable sort="true" v-model="info[index].child" :options="{group: {name: 'a', pull:'clone'}}">
              <div v-for="(key, num) in info[index].child" :key="num + 'a'" class="menuList">
                <el-tooltip class="item" effect="dark" :content="key.quota_COMMENT" placement="right-end">
                  <span>{{key.quota_name}}</span>
                </el-tooltip>
              </div>
            </draggable>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-main class='content'>
        <draggable-list ref='draggable' group="a" :title="list" @getBack="drop" :hidden='true'></draggable-list>
      </el-main>
    </el-container>
    <el-dialog title="添加菜单" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="80px" style="font-size: 12px">
        <el-form-item label="名称">
          <el-input size="mini" :maxlength='20' v-model='titleInfo.titleName' placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input size="mini" :maxlength='20' v-model='titleInfo.url' placeholder="请输入路径"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确认保存配置？" :show-close='false' :visible.sync="outerVisible" width="300px" custom-class='backLog'>
      <!-- <h3></h3> -->
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="mini" type="primary" @click="backSub">保 存</el-button>
        <el-button size="mini" @click="closeBack(true)">不保存</el-button>
        <el-button size="mini" @click="closeBack(false)">取 消</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import draggable from "vuedraggable";

import draggableList from "@/components/draggableInfo";
import { letMenu, addTitle, updateTitle, getTitleByName } from '@/api/detail.js'
export default {
  name: 'detailEdit',
  data () {
    return {
      outerVisible: false,
      info: [],
      oldList: [],
      isVisible: '1',
      titleInfo: {
        url: '',
        titleName: '',
      },
      env: '',
      list: [],
      dialogVisible: false
    }
  },
  components: {
    draggableList,
    draggable,
  },
  created () {
    this.env = process.env.VUE_APP_NODE_ENV || process.env.NODE_ENV
    let name = ''
    if (this.env !== 'production') {
      name = this.$route.query.name
      if (name) {
        this.type = 'update'
        getTitleByName({ title_name: name }).then(res => {
          this.titleInfo.url = res.title.url
          this.list = res.title.title_json
          this.oldList = res.title.title_json
        })
      }
    } else {
      name = sessionStorage.getItem('name')
      this.type = sessionStorage.getItem('type')
      this.titleInfo.titleName = name
      if (this.type === 'update') {
        getTitleByName({ title_name: name }).then(res => {
          this.titleInfo.url = res.title.url
          this.list = res.title.title_json
          this.oldList = res.title.title_json
        })
      }
    }

    this.load()
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('type')
  },
  methods: {
    backSub () {
      this.outerVisible = false
      this.submit()
      setTimeout(() => {
        window.doCallback()
      }, 2000)
    },
    closeBack (isBack) {
      this.outerVisible = false
      if (isBack) {
        window.doCallback()
      }
    },
    callBack () {
      let isSubmit = JSON.stringify(this.oldList) === JSON.stringify(this.$refs.draggable.titleBar)
      if (isSubmit) {
        window.doCallback()
      } else {
        this.outerVisible = true
      }
    },
    // 环比
    loop () {
      if (this.$refs.draggable.showIndex !== null) {
        this.$refs.draggable.addMessageInfo()
      } else {
        this.$message({
          type: 'warning',
          message: '请选择环比指标'
        })
      }
    },
    // 同比
    together () {
      if (this.$refs.draggable.showIndex !== null) {
        this.$refs.draggable.addMessageInfo()
      } else {
        this.$message({
          type: 'warning',
          message: '请选择同比指标'
        })
      }
    },
    copy () {
      if (this.$refs.draggable.showIndex !== null) {
        this.$refs.draggable.addMessageInfo()
      } else {
        this.$message({
          type: 'warning',
          message: '请选择复制指标'
        })
      }
    },
    load () {
      letMenu().then(res => {
        res.forEach(item => {
          item.child.forEach(key => {
            key.visible = false
          })
        })
        this.getInfo = res
        this.info = JSON.parse(JSON.stringify(res))
      })
    },
    drop () {
      let data = JSON.parse(JSON.stringify(this.getInfo));
      this.info = data;
    },
    addColum () {
      this.$refs.draggable.addColum({
        quota_name: "请输入",
        visible: false,
        order: '3'
      })
    },
    submitTitle (val) {
      this.isVisible = val
      this.dialogVisible = true
    },
    submit () {
      if (!this.titleInfo.titleName) {
        this.$message({
          type: 'warning',
          message: '请输入名称'
        })
        return
      }
      this.oldList = JSON.parse(JSON.stringify(this.$refs.draggable.titleBar))
      if (this.type === 'update') {
        updateTitle({ ...this.titleInfo, num: this.$refs.draggable.nowNum, isVisible: this.isVisible, titleJson: this.$refs.draggable.titleBar }).then(res => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: res
          })
          this.close()
        })
      } else {
        addTitle({ ...this.titleInfo, num: this.$refs.draggable.nowNum, isVisible: this.isVisible, titleJson: this.$refs.draggable.titleBar }).then(res => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: res
          })
          this.close()
        })
      }
    },
    close () {
      this.dialogVisible = false
    },
  }
}
</script>
<style lang='less' scoped>
.el-message {
  z-index: 10000 !important;
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
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
.backLog {
  > .el-dialog__body {
    padding: 0;
  }
}
.detailEdit {
  height: 100%;
  background: #fafafa;
  .header {
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .aside {
    background: white;
    margin-right: 10px;
    box-sizing: border-box;
    padding-left: 20px;
    .menuList {
      padding: 5px 0;
      box-sizing: border-box;
      padding-left: 20px;
    }
  }
  .content {
    background: white;
    color: #333333;
    font-size: 14px;
  }
}
</style>
