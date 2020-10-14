<!--  -->
<template>
<div class="">
    <div class="btnNav">
        <div class="btnForm"></div>
        <div class="btnList">
            <el-button type="success" size="mini">
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
                <i class="el-icon-right" />
                <i class="el-icon-back" />
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconw_shaixuan-192beifen3"></use>
                </svg>
                <span>指标{{ il + 1 }}</span>
            </div>
            <div class="td" v-for="(span, is) in item" :key="is + 'is'">
                <div v-if="span.type === 'judge'">
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
        <el-cascader-panel :options="popoverBoxOptions" :props="popoverBoxProps"></el-cascader-panel>
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
            popoverBoxOptions: [{
                    value: "zhinan",
                    label: "指南",
                    children: [{
                            value: "shejiyuanze",
                            label: "设计原则",
                            children: [{
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
                        {
                            value: "daohang",
                            label: "导航",
                            children: [{
                                    value: "cexiangdaohang",
                                    label: "侧向导航",
                                },
                                {
                                    value: "dingbudaohang",
                                    label: "顶部导航",
                                },
                            ],
                        },
                    ],
                },
                {
                    value: "zujian",
                    label: "组件",
                    children: [{
                            value: "basic",
                            label: "Basic",
                            children: [{
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
                        {
                            value: "form",
                            label: "Form",
                            children: [{
                                    value: "radio",
                                    label: "Radio 单选框",
                                },
                                {
                                    value: "checkbox",
                                    label: "Checkbox 多选框",
                                },
                                {
                                    value: "input",
                                    label: "Input 输入框",
                                },
                                {
                                    value: "input-number",
                                    label: "InputNumber 计数器",
                                },
                                {
                                    value: "select",
                                    label: "Select 选择器",
                                },
                                {
                                    value: "cascader",
                                    label: "Cascader 级联选择器",
                                },
                                {
                                    value: "switch",
                                    label: "Switch 开关",
                                },
                                {
                                    value: "slider",
                                    label: "Slider 滑块",
                                },
                                {
                                    value: "time-picker",
                                    label: "TimePicker 时间选择器",
                                },
                                {
                                    value: "date-picker",
                                    label: "DatePicker 日期选择器",
                                },
                                {
                                    value: "datetime-picker",
                                    label: "DateTimePicker 日期时间选择器",
                                },
                                {
                                    value: "upload",
                                    label: "Upload 上传",
                                },
                                {
                                    value: "rate",
                                    label: "Rate 评分",
                                },
                                {
                                    value: "form",
                                    label: "Form 表单",
                                },
                            ],
                        },
                        {
                            value: "data",
                            label: "Data",
                            children: [{
                                    value: "table",
                                    label: "Table 表格",
                                },
                                {
                                    value: "tag",
                                    label: "Tag 标签",
                                },
                                {
                                    value: "progress",
                                    label: "Progress 进度条",
                                },
                                {
                                    value: "tree",
                                    label: "Tree 树形控件",
                                },
                                {
                                    value: "pagination",
                                    label: "Pagination 分页",
                                },
                                {
                                    value: "badge",
                                    label: "Badge 标记",
                                },
                            ],
                        },
                        {
                            value: "notice",
                            label: "Notice",
                            children: [{
                                    value: "alert",
                                    label: "Alert 警告",
                                },
                                {
                                    value: "loading",
                                    label: "Loading 加载",
                                },
                                {
                                    value: "message",
                                    label: "Message 消息提示",
                                },
                                {
                                    value: "message-box",
                                    label: "MessageBox 弹框",
                                },
                                {
                                    value: "notification",
                                    label: "Notification 通知",
                                },
                            ],
                        },
                        {
                            value: "navigation",
                            label: "Navigation",
                            children: [{
                                    value: "menu",
                                    label: "NavMenu 导航菜单",
                                },
                                {
                                    value: "tabs",
                                    label: "Tabs 标签页",
                                },
                                {
                                    value: "breadcrumb",
                                    label: "Breadcrumb 面包屑",
                                },
                                {
                                    value: "dropdown",
                                    label: "Dropdown 下拉菜单",
                                },
                                {
                                    value: "steps",
                                    label: "Steps 步骤条",
                                },
                            ],
                        },
                        {
                            value: "others",
                            label: "Others",
                            children: [{
                                    value: "dialog",
                                    label: "Dialog 对话框",
                                },
                                {
                                    value: "tooltip",
                                    label: "Tooltip 文字提示",
                                },
                                {
                                    value: "popover",
                                    label: "Popover 弹出框",
                                },
                                {
                                    value: "card",
                                    label: "Card 卡片",
                                },
                                {
                                    value: "carousel",
                                    label: "Carousel 走马灯",
                                },
                                {
                                    value: "collapse",
                                    label: "Collapse 折叠面板",
                                },
                            ],
                        },
                    ],
                },
                {
                    value: "ziyuan",
                    label: "资源",
                    children: [{
                            value: "axure",
                            label: "Axure Components",
                        },
                        {
                            value: "sketch",
                            label: "Sketch Templates",
                        },
                        {
                            value: "jiaohu",
                            label: "组件交互文档",
                        },
                    ],
                },
            ],
            myTableData: [],
            tableIndex: 0,
        };
    },
    created() {
        this.tableDataRecursion(this.tableData.startNodes);
        console.log(this.myTableData);
    },
    methods: {
        // 将树结构转为列list结构
        tableDataRecursion(list) {
            let arr = [];
            list.forEach((item) => {
                arr = arr.concat(item.childNodes);
            });
            if (arr.length) {
                this.myTableData[this.tableIndex] = arr;
            }
            this.tableIndex++;
            if (arr.length) {
                this.tableDataRecursion(arr);
            }
        },
        // 创建右键弹窗
        addTarget(type, e, scope) {
            console.log(e);
            const {
                pageX,
                pageY
            } = e;
            const popoverBox = document.getElementById("popoverBox");
            popoverBox.style.top = pageY + "px";
            popoverBox.style.left = pageX + "px";
            this.popoverBox = true;
            // popoverBox.style.display = pageX;
            // TODO 区分弹窗
            if (type === 0) {}
            if (type === 1) {}
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

        >div {
            padding: 10px;
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

            i {
                position: absolute;
                margin: auto;
                top: 0;
                bottom: 0;
                width: 15px;
                height: 15px;
            }

        }

        .el-icon-right {
            right: 0;
        }

        .el-icon-back {
            left: 0;
        }
    }

    .td:nth-child(odd) {
        background-color: #fafafa;
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
