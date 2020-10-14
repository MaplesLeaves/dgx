<!--
 * @Descripttion: 
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-09-29 15:48:17
 * @LastEditors:  
 * @LastEditTime: 2020-10-10 17:55:07
-->
<template>
  <div>
    <el-button type="primary" @click="append">
      添加
    </el-button>
    <el-tree 
    ref="tree"
    :data="data"
             show-checkbox
             node-key="id"
             default-expand-all
             @node-drag-start="handleDragStart"
             @node-drag-enter="handleDragEnter"
             @node-drag-leave="handleDragLeave"
             @node-drag-over="handleDragOver"
             @node-drag-end="handleDragEnd"
             @node-drop="handleDrop"
             draggable
             :allow-drop="allowDrop"
             :allow-drag="allowDrag">
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      node: {
      },
      data: [
        {
          id: 1,
          label: '总公司',
          type: 'order',
          children: [
            {
              id: 1.1,
              label: '分公司1',
              type: 'order',
            },
            {
              id: 1.2,
              label: '分公司2',
              type: 'order',
            },
            {
              id: 1.3,
              label: '分公司3',
              type: 'order',
            },
            {
              id: 1.4,
              label: '分公司4',
              type: 'order',
            },
            {
              id: 1.5,
              label: '分公司5',
            },
          ],
        },
      ],
      id: 100,
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  methods: {
    append() {
      let data = this.$refs.tree.getCurrentNode()
      console.error(data)
      if (!data)  return false
      const newChild = { id: this.id++, label: 'asdfas', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.$refs.tree.append(newChild, data)
      this.$refs.tree.setCurrentNode([])
    },
    handleDragStart(node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log(dropNode, draggingNode)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      // if (
      //   draggingNode.data.prentId === dropNode.data.prentId &&
      //   draggingNode.level === 3 &&
      //   dropNode.level === 3 &&
      //   type === 'next'
      // ) {
      //   return true
      // } else if (
      //   draggingNode.data.prentId === dropNode.data.prentId &&
      //   draggingNode.level === 3 &&
      //   dropNode.level === 2 &&
      //   type === 'inner'
      // ) {
      //   return true
      // }
      if (draggingNode.data.type === 'order') {
        return false
      }
      return true
    },
    allowDrag(draggingNode, dropNode) {
      return true
    },
  },
}
</script>

<style>
</style>