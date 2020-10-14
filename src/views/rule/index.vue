<template>
<div class="page" @click="pageClick">
    <div class="navLeft" @contextmenu.prevent.stop="(e) => show(e, 0)">
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color='#FFFFFF'>
            <el-submenu index="1">
                <template slot="title">
                    <div class="menaReference" slot="reference" @contextmenu.prevent.stop="(e) => show(e, 1)">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </div>
                </template>
                <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-menu>
    </div>
    <div class="content">
        <div class="views">
            <router-view />
        </div>
    </div>
    <div class="popoverBox" id="popoverBoxNav" v-show="popoverBox">
        <div v-if="popoverBoxType !== 0" class="cell" @click="addCatalog(0)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconicon_tianjia"></use>
            </svg>
            新建指标
        </div>
        <div class="cell" @click="addCatalog(1)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconicon_tianjia"></use>
            </svg>
            新建目录
        </div>
        <div v-if="popoverBoxType !== 0" class="cell">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconicon_tianjia"></use>
            </svg>
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
            popoverBox: false,
            activeName: "second",
        };
    },
    mounted() {},
    methods: {
        // 全屏收起弹出框
        pageClick() {
            this.popoverBox = false;
        },
        // 展示弹出框
        show(e, type) {
            /**
             * 0: 在空白处右键
             * 1: 在目录上右键
             * 2: 在指标上右键
             */
            this.popoverBoxType = type;
            const {
                pageX,
                pageY
            } = e;
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
                })
                .then(({
                    value
                }) => {
                    console.log(value);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消创建",
                    });
                });
        },
        // handleOpen(key, keyPath) {
        //   console.log(key, keyPath);
        // },
        // handleClose(key, keyPath) {
        //   console.log(key, keyPath);
        // },
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
