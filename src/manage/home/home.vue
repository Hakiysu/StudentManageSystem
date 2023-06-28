<script lang="js" setup>
import {ElMessage} from "element-plus";
import router from "@/router/router";
//check if user has logged in
if (localStorage.getItem("username") === null) {
  alert("请先登录");
  location.href = "/login";
}
const logout = () => {
  localStorage.removeItem("username");
  ElMessage.success("退出成功");
  setTimeout(() => {
    location.reload();
  }, 700);
  //jump to login page
  router.push("/login");
};
//get username from localStorage
const username = localStorage.getItem("username");
//get time and always refresh,format yyyy-mm-dd hh:mm,no seconds
const time = new Date().toLocaleString("chinese", {
  hour12: false,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});
</script>
<template>
  <h2>您好，管理员{{ username }}</h2>
  <h3>现在时间：{{ time }}</h3>


  <div class="mb-4">
    <el-button size="large" @click="logout">退出账户</el-button>
  </div>


</template>

<style scoped>

</style>
