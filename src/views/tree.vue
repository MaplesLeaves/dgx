<!--
 * @Descripttion: 
 * @version: 
 * @Author: MapleLeaves
 * @Date: 2020-09-29 15:48:17
 * @LastEditors:  
 * @LastEditTime: 2020-09-29 17:01:47
-->
<template>
  <el-tree :data="data"
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
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
              ],
            },
            {
              id: 19,
              label: '二级 1-1',
              children: [
                {
                  id: 29,
                  label: '三级 1-1-1',
                },
                {
                  id: 130,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 21,
          label: '一级 1',
          children: [
            {
              id: 24,
              label: '二级 1-1',
              prentId: 'is',
              children: [
                {
                  id: 29,
                  label: '三级 1-1-1',
                  prentId: 'is',
                },
                {
                  id: 210,
                  prentId: 'is',
                  label: '三级 1-1-2',
                },
              ],
            },
            {
              id: 219,
              label: '二级 1-1',
              prentId: 'is',
              children: [
                {
                  prentId: 'is',
                  id: 229,
                  label: '三级 1-1-1',
                },
                {
                  prentId: 'is',
                  id: 2130,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  methods: {
    handleDragStart(node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
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
      if (draggingNode.data.prentId === dropNode.data.prentId && draggingNode.level === 3 && dropNode.level  === 3 && type === 'next') {
        return true
      } else if(draggingNode.data.prentId === dropNode.data.prentId && draggingNode.level === 3 && dropNode.level  === 2 && type === 'inner'){
        return true 
      }
      return  false
    },
    allowDrag(draggingNode, dropNode) {
      return true
    },
  },
}
</script>

<style>
</style>