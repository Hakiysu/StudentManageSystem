<template>
  <el-menu :collapse-transition="false" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
           text-color="#fff">
    <h3>后台管理</h3>
    <el-menu-item v-for="item in list" :key="item.label" :index="item.path+''">
      <component :is="item.icon" class="icons"></component>
      <span>{{ item.label }}</span>
    </el-menu-item>
  </el-menu>
</template>


<script>
export default {
  setup() {
    const list = [
      {
        path: '/',
        name: 'home',
        label: '主页',
        url: '/'
      },
      {
        path: '/studentManager',
        name: 'studentManager',
        label: '学生列表',
        url: '/studentManager'
      },
      {
        path: '/studentAdder',
        name: 'studentAdder',
        label: '学生添加',
        url: '/studentAdder'
      }
    ];
    return {
      list,
    }
  }
}
</script>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
  margin-right: 4px;
}

.el-menu-vertical-demo {
  width: 100%;
  border-right: none;

  h3 {
    color: #fff;
    text-align: center;
    margin-top: 10px;
  }
}
</style>
