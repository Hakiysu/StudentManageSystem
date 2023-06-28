<!-- login page -->
<script setup>
import axios from "axios";
import {ref} from "vue";
import router from "@/router/router.js";
import {ElMessage} from "element-plus";

const userdata = ref({
  username: undefined,
  password: undefined
});

function login() {
  //use axios to send request
  axios.post("http://localhost:3003/login", {
    username: userdata.value.username,
    password: userdata.value.password
  }).then((res) => {
    console.log(res);
    if (res.status === 200) {
      if (res.data === 'pass') {
        //跳转到主控制面板
        localStorage.setItem("username", userdata.value.username);
        ElMessage({
          message: "登录成功！管理员账户:" + localStorage.getItem("username"),
          type: "success"
        });
        router.push("/");
      } else if (res.data === 'userNotExist') {
        alert("此用户不存在");
      } else if (res.data === 'passwdError') {
        alert("密码错误");
      }
    } else {
      alert("登录失败");
    }
  }).catch((err) => {
    console.log(err);
  });

}

function registerNewUser() {
  //just jump to register page
  router.push("/register");
}
</script>

<template>
  <el-form :model="userdata" label-width="100px" @change="$forceUpdate()">
    <el-form-item label="用户名">
      <el-input v-model="userdata.username" placeholder="请输入用户名" type="text"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="userdata.password" placeholder="请输入密码" type="password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="primary" @click="registerNewUser">注册新用户</el-button>
    </el-form-item>
  </el-form>
</template>