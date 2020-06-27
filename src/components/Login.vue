<template>
    <body id="poster">
    <el-form class="login-container" label-width="0px" label-position="left">
        <h3 class="login-title">系统登录</h3>
        <el-form-item>
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
        </el-form-item>
    </el-form>
    </body>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                loginForm: {
                    username: 'admin',
                    password: '123',
                },
                responseResult: []
            }
        },
        methods: {
            login () {
              var _this = this
              // console.log(this)
              console.log(this.$store.state)
              this.$axios
                //  ajax请求的地址为http://localhost:8443/api/login
                .post('/login', {
                    username: this.loginForm.username,
                    password: this.loginForm.password
                })
                .then(successResponse => {
                    if (successResponse.data.code === 200) {
                        _this.$store.commit('login', _this.loginForm)
                      // console.log(this) 这俩是一样的
                      // console.log(_this)
                        var path = this.$route.query.redirect
                        console.log(path)
                        // 如果path是/index则跳转到该path
                        // 如果是undefined说明store里已经存在user的登录信息，无需再次登录
                        this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                    }
                })
                .catch(failResponse => {
                    alert(failResponse)
                })
            }
        }
    }
</script>

<style scoped>
    .login-container {
        border-radius: 15px; /*添加圆角的边框*/
        background-clip: padding-box;  /*指定背景绘制区域。看https://www.runoob.com/try/try.php?filename=trycss3_background-clip*/
        margin: 90px auto; /*设置所有外边距属性 上右下左*/
        width: 350px;/*定义元素内容区的宽度*/
        padding: 35px 35px 15px 35px; /*设置所有内边距属性。指一个元素的内容和其边界之间的空间*/
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login-title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    #poster {
        background: url("../assets/eva.jpg") no-repeat; /*no-repeat此图片做背景时不平铺*/
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;/*cover:把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。*/
        position: fixed;/*规定元素的定位类型,生成绝对定位的元素，相对于浏览器窗口进行定位。*/
    }
    body {
        margin: 0px;
    }
</style>
