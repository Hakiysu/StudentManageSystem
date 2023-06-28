<!-- login page -->
<script setup>
import axios from "axios";
import {ref} from "vue";
import router from "@/router/router.js";
import {ElMessage} from "element-plus";

const userdata = ref({
  username: undefined,
  password: undefined,
  passwordConfirm: undefined
});

function register() {
  //check password is equal to passwordConfirm
  if (userdata.value.password !== userdata.value.passwordConfirm) {
    alert("两次输入的密码不一致");
    return;
  }
  //use axios to send request
  axios.post("http://localhost:3003/register", {
    username: userdata.value.username,
    password: userdata.value.password
  }).then((res) => {
    console.log(res);
    if (res.status === 200) {
      if (res.data === 'pass') {
        //跳转到主控制面板
        localStorage.setItem("username", userdata.value.username);
        ElMessage({
          message: "注册成功！管理员：" + userdata.value.username+"，即将跳转到主页。",
          type: "success"
        });
        router.push("/");
      } else if (res.data === 'userExist') {
        alert("此用户名已存在，请更换用户名");
      }
    } else {
      alert("注册失败");
    }
  }).catch((err) => {
    console.log(err);
  });

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
    <el-form-item label="确认密码">
      <el-input v-model="userdata.passwordConfirm" placeholder="请再次输入密码" type="password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register">提交</el-button>
    </el-form-item>
  </el-form>
</template>