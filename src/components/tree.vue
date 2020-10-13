<!--
 * @Author: your name
 * @Date: 2020-08-03 17:17:48
 * @LastEditTime: 2020-08-06 19:38:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit   
 * @FilePath: \taibao\src\pages\home\App.vue
-->
<template>
  <div class='treeInfoname' v-loading="loading">
    <el-tree ref='tree' show-checkbox lazy :load="loadNode" :data="data" :props="defaultProps" @node-click="handleNodeClick">
      <span class="custom-tree-node" slot-scope="{ node }">
        <img src="~img/folder.png" width="16px" height="16px" alt style="vertical-align:middle; margin-right:5px" />
        <!-- <img src="~img/outPut.png"  width='10px' style="margin-right: 15px" alt=""> -->
        <span @dbclick='dbClick(node)'>{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import {getTreeList} from '@/api'
export default {
  data() {
    return {
      loading: false,
      data: [
        {
          id: "1131",
          code: "00000000000011",
          name: "中国太平洋人寿保险股份有限公司",
          child: [
            {
              id: "1131",
              code: "00000000000011",
              name: "浙江分公司",
              child: [
                {
                  id: "262",
                  code: "00000000001940",
                  name: "绍兴中心支公司",
                  child: [
                    {
                      id: "266",
                      code: "00000000001944",
                      name: "嵊州支公司",
                      child: [
                        {
                          id: "19612002",
                          code: "HAZ7000319",
                          name: "嵊州支公司陈英区",
                          child: [
                            {
                              id: "18614892",
                              code: "HAZ7000256",
                              name: "嵊州支公司陈英区竺康军部",
                              child: [
                                {
                                  id: "18614892",
                                  code: "HAZ7000256",
                                  name: "嵊州支公司陈英区竺康军部直辖室",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "234",
                  code: "00000000001912",
                  name: "嘉兴中心支公司",
                  child: [
                    {
                      id: "239",
                      code: "00000000001917",
                      name: "平湖支公司",
                      child: [
                        {
                          id: "147304",
                          code: "HAZ2120000",
                          name: "嘉兴平湖02督导区",
                          child: [
                            {
                              id: "16786819",
                              code: "HAZ2000169",
                              name: "嘉兴平湖02区02部(王川观)王卫杰室",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "257",
                  code: "00000000001935",
                  name: "衢州中心支公司",
                  child: [
                    {
                      id: "258",
                      code: "00000000001936",
                      name: "江山支公司",
                      child: [
                        {
                          id: "20567868",
                          code: "HAZA000470",
                          name: "江山支公司徐珍玉区",
                          child: [
                            {
                              id: "2127250210",
                              code: "HAZA000542",
                              name: "江山支公司徐珍玉区柴玉青部王丽君室",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "269",
                  code: "00000000001947",
                  name: "台州中心支公司",
                  child: [
                    {
                      id: "271",
                      code: "00000000001949",
                      name: "黄岩支公司",
                      child: [
                        {
                          id: "497399",
                          code: "HAZ6000061",
                          name: "黄岩区支公司屠菊芳区",
                          child: [
                            {
                              id: "2127276471",
                              code: "HAZ6000919",
                              name: "黄岩区支公司屠菊芳区王银飞部王娌室",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "234",
                  code: "00000000001912",
                  name: "嘉兴中心支公司",
                  child: [
                    {
                      id: "238",
                      code: "00000000001916",
                      name: "桐乡支公司",
                      child: [
                        {
                          id: "2127244947",
                          code: "HAZ2000493",
                          name: "桐乡支公司向桂珍区",
                          child: [
                            {
                              id: "2127258153",
                              code: "HAZ2000537",
                              name: "桐乡支公司向桂珍区王明琼部李敏室",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "child",
        label: "text",
        id: "",
      },
      message: {},
    };
  },
  props: {
    serch: {
      type: Object,
      default: ()=>{}
    }  
  },
  methods: {
    getMessage(){
      return this.$refs.tree.getCheckedNodes()
    },
    handleNodeClick(data) {
      this.message = data;
    },
    loadNode(node, resolve) {
      let message = !node.data.id ? this.serch : null
      this.loading = true
      getTreeList({
          id:node.data.id || null,
          level:node.data.level || null,
          code:node.data.code || null,
          levelDefine:node.data.levelDefine || null,
          _:new Date().getTime(),
          ...message
      }).then(res=>{
        this.loading = false
        return resolve(res)
        
        
      }).catch(()=>{
        this.loading = false
      })
    },
  },
};
</script>
<style>
.treeInfoname{
  max-height:288px;
  overflow-y: auto
}
</style>