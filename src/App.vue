<script setup>
</script>

<template>
  <div class="common-layout" >
    <el-container>
      <el-header style="
      text-align: center;
      font-size: xxx-large;
      background-color: deepskyblue">学生管理系统
      </el-header>
      <el-container>
        <el-aside width="200px" style="
        margin-left: 15px;
        margin-right: 15px;">
          <el-row class="tac">
            <el-col :span="12">
              <h5 class="menuTitle" style="
              font-size: x-large;
              margin-top: 10px;
              margin-bottom: 10px;">学生管理</h5>
              <el-menu class="stuManagerMENU" default-active="1" router="router" >
                <el-menu-item index="/">
                  <span>主页</span>
                </el-menu-item>
                <el-menu-item index="/studentManager">
                  <span>学生列表</span>
                </el-menu-item>
                <el-menu-item index="/studentAdder">
                  <span>学生添加</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  height: 100%;
  &>.el-container {
    height: 100%;
    &>.el-aside {
      height: 100%;
      background: #545c64;
    }
    &>.el-container {
      &>.el-header {
        padding: 0;
      }
    }
  }
}
</style>