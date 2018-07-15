<template>
  <div id="app">
    <el-container>
      <el-header height="50px">
        <el-row type="flex" class="row-bg">
          <h1><router-link to="/">DIYgod 的媒体库</router-link></h1>
          <el-col :span="3"><router-link to="/">首页</router-link></el-col>
          <el-col :span="3"><router-link to="/about">关于</router-link></el-col>
        </el-row>
      </el-header>
      <el-main><router-view/></el-main>
      <el-footer height="40px">© 2018 <a href="https://diygod.me/" target="_blank">Hi, DIYgod</a></el-footer>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
  html,
  body,
  #app {
    height: 100%;
  }

  .el-container {
    min-height: 100%;
  }

  body {
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #333;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  .el-header {
    text-align: center;
    line-height: 50px;
    position: relative;
    font-size: 14px;
  }

  .el-header h1 {
    margin: 0;
    font-size: 17px;
    padding-right: 20px;
  }

  .el-header::after {
    bottom: -5px;
    box-shadow: inset 0px 4px 8px -3px rgba(17, 17, 17, .06);
    content: "";
    height: 5px;
    left: 0px;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    right: 0px;
    width: 100%;
  }

  .el-header .el-col a {
    display: inline-block;
    width: 100%;
  }

  .el-main {
    padding: 30px 0;
    width: 980px;
    margin: auto;
    overflow: visible;
  }

  .el-footer {
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    border-top: 1px solid #eee;
  }

  .el-row {
    width: 980px;
    margin: auto;
  }
</style>
