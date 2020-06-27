<!--图书页面的根组件-->
<template>
  <el-container>
    <el-aside style="width:200px;margin-top: 20px">
      <!--滑块开关-->
      <switch></switch>
      <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
    <el-main>
      <books class="books-area" ref="booksArea"></books>
    </el-main>
  </el-container>
</template>

<script>
  import SideMenu from './SideMenu'
  import Books from './Books'
  export default {
    name: 'LibraryIndex',
    components: {Books, SideMenu},
    methods: {
      /*实现按分类查询
      * 点击左侧导航栏，向后端发送一个带有参数的 get 请求，然后同样是修改 data 里的数据以实现动态渲染*/
      listByCategory () {
        var _this = this
        var cid = this.$refs.sideMenu.cid
        var url = '/categories/' + cid + '/books'
        this.$axios.get(url)
          .then(resp => {
            if (resp && resp.status === 200){
              _this.$refs.booksArea.books = resp.data
              //加上下行
              _this.$refs.booksArea.currentPage = 1
            }
          })
      }
    }
  }
</script>

<style scoped>
  .books-area {
    width: 990px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
