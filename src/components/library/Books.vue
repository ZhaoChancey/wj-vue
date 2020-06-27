<!--Books.vue 是我们图书管理页面的核心组件-->
<template>
    <div>
      <!--第一行，高度840px-->
      <el-row style="height: 840px">
        <!--根据子组件的onSearch来调用searchResult方法-->
        <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
        <!--Tooltip 文字提示-->
        <!--用v-for循环，遍历到的每一个数据都按照tooltip里的样式渲染-->
        <!--slice()从已有的数组中返回选定的元素.例如：0-10,10-20,20-30...-->
        <el-tooltip effect="dark" placement="right"
                    v-for="item in books.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    :key="item.id">
          <p slot="content" style="font-size: 14px;margin-bottom: 6px">{{item.title}}</p>
          <p slot="content" style="font-size: 13px;margin-bottom: 6px">
            {{item.author}}111
            {{item.date}}
            {{item.press}}
          </p>
          <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
          <!--card设置文字提示框左边的内容-->
          <!--body-style设置内置内容的样式，shadow设置阴影显示时机-->
          <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
                   bodyStyle="padding:10px" shadow="hover">
            <!--设置图片的样式-->
            <!--书籍封面部分我们也添加了一个点击事件，并传递了书籍的参数：-->
            <div class="cover" @click="editBook(item)">
              <!--: 其实是 v-bind: 的缩写，用于绑定,把标签的属性与 data 中的值绑定起来。-->
              <img :src="item.cover" alt="封面">
            </div>
            <!--设置图书名的样式-->
            <div class="info">
              <div class="title">
                <a href="">{{item.title}}</a>
              </div>
              <!--删除图书的图标-->
              <i class="el-icon-delete" @click="deleteBook(item.id)"></i>
            </div>
            <div class="author">{{item.author}}</div>
          </el-card>
        </el-tooltip>
        <!--根据子组件的onSubmit来调用loadBooks方法-->
        <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
      </el-row>
      <!--第二行-->
      <el-row>
        <!--当前页数--><!--每页显示条目个数--><!--总条目数-->
        <!--current-change	currentPage 改变时会触发。回调参数为当前页-->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="books.length">
        </el-pagination>
      </el-row>
    </div>
</template>

<script>
  import SearchBar from './SearchBar'
  import EditForm from './EditForm'
  export default {
    name: 'Books',
    components: {EditForm, SearchBar},
    data () {
      return {
        books: [],
        currentPage: 1,
        pageSize: 17
      }
    },
    /*mounted 即 “已挂载” ，所谓挂载，就是我们写的 Vue 代码被转换为 HTML 并替换相应的 DOM 这个过程，这个过程完事儿的时候，就会执行 mounted 里面的代码*/
    mounted: function () {
      this.loadBooks()
    },
    methods: {
      /*利用 axios 发送了一个 get 请求，在接受到后端返回的成功代码后把 本组件data
      里的数据替换为后端返回的数据。利用 data 和 template 里相应元素的双向绑定，实现页面的动态渲染。*/
      loadBooks () {
        var _this = this
        this.$axios.get('/books')
          .then(resp => {
            if (resp && resp.status === 200) {
              _this.books = resp.data
            }
          })
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
        console.log(this.currentPage)
      },
      /*this.$refs.searchBar.keywords:引用ref为searchBar的子组件里的keywords数据*/
      searchResult () {
        var _this = this
        this.$axios
          .get('/search?keywords=' + this.$refs.searchBar.keywords, {
          }).then(resp => {
            if (resp && resp.status === 200) {
              _this.books = resp.data
              _this.currentPage = 1
            }
        })
      },
      /*editBook 这个方法即负责弹出修改表单并渲染(回显)数据：*/
      editBook (item) {
        this.$refs.edit.dialogFormVisble = true
        this.$refs.edit.form = {
          id: item.id,
          cover: item.cover,
          title: item.title,
          author: item.author,
          date: item.date,
          press: item.press,
          abs: item.abs,
          category: {
            id: item.category.id.toString(),
            name: item.category.name
          }
        }
      },
      /*这里需要注意的一个是确认对话框的使用，一个是 post 请求的构造方式，post 不能像 get 请求那样直接把参数写在 url 里，
      而需要以键值对的方式传递。*/
      deleteBook (id) {
        this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/delete', {id: id}).then(resp => {
            if (resp && resp.status === 200){
              this.loadBooks()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }

    }

  }
</script>

<style scoped>
  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden; /*当内容溢出元素框时发生的事情。内容会被修剪，并且其余内容是不可见的。*/
    cursor: pointer; /*规定要显示的光标的类型 光标呈现为指示链接的指针（一只手）*/
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;/*此元素将显示为块级元素，此元素前后会带有换行符。*/
    line-height: 17px;
  }

  a {
    text-decoration: none;
  }

  .el-icon-delete {
    cursor: pointer;
    float: right;
  }

  .switch {
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }

</style>
