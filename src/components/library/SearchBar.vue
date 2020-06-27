<!--这个组件是用于搜索的搜索框。-->
<template>
  <!--display: flex是弹性布局  justify-content应用在弹性容器上,弹性项目居中紧挨着填充。 -->
  <!-- align-items定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。center是居中对齐弹性盒的各项 <div> 元素：-->
  <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
   <!-- 监听键盘事件时，添加了特殊的键盘修饰符
    注意！！！如果用了封装组件的话，比如element，这个时候使用按键修饰符需要加上.native-->
    <el-input
      @keyup.enter.native="searchClick"
      placeholder="通过书名或作者搜索..."
      prefix-icon="el-icon-search"
      size="small"
      style="width: 400px;margin-right: 10px"
      v-model="keywords">
    </el-input>
    <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',
    data () {
      return {
        keywords: '',
        books: [],
        cardLoading: []
      }
    },
    methods: {
      searchClick () {
        /*触发父组件中定义的 onSearch 事件*/
        this.$emit('onSearch')
      }
    }
  }
</script>

<style scoped>

</style>
