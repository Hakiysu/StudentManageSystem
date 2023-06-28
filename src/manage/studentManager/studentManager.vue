<script lang="js" setup>
import {ref} from "vue";
import axios from "axios";
import moment from "moment";

//check if user has logged in
if (localStorage.getItem("username") === null) {
  alert("请先登录");
  location.href = "/login";
}
let id = 1
// init data about person information to test v-for
const studentInfo = ref([])
//get student info from backend
axios.post("http://localhost:3003/getStudentInfo").then((res) => {
  console.log(res);
  if (res.status === 200) {
    studentInfo.value = res.data;
    //add id into studentInfo
    for (let i = 0; i < studentInfo.value.length; i++) {
      studentInfo.value[i].id = id;
      id++;
    }
    //change stuBirth style by using moment.js
    for (let i = 0; i < studentInfo.value.length; i++) {
      studentInfo.value[i].stuBirth = moment(studentInfo.value[i].stuBirth).format("YYYY-MM-DD");
    }
  } else {
    alert("后台返回数据失败");
  }
}).catch((err) => {
  console.log(err);
});

function deleteStudentInfo(stuID) {
  axios.post("http://localhost:3003/deleteStudentInfo", {
    stuID: stuID
  }).then((res) => {
    console.log(res);
    if (res.status === 200) {
      alert("学号为" + stuID + "的学生信息已删除,正在刷新页面");
      //refresh page by vue-router
      location.href = "/studentManager";
    } else {
      alert("后台返回数据失败");
    }
  }).catch((err) => {
    console.log(err);
  });
}
</script>

<template>
  <el-table :data="studentInfo" on-row-click="deleteStudentInfo" style="width: 100%">
    <el-table-column fixed label="ID" prop="id" min-width="10%"/>
    <el-table-column label="姓名" prop="stuName" min-width="10%"/>
    <el-table-column label="学号" prop="stuID" min-width="20%"/>
    <el-table-column label="性别" prop="stuSex" min-width="10%"/>
    <el-table-column label="专业" prop="stuMajor" min-width="20%"/>
    <el-table-column label="出生日期" prop="stuBirth" min-width="20%"/>
    <el-table-column fixed="right" label="操作" min-width="10%">
      <template v-slot="scope">
        <el-button link size="large" type="danger" @click="deleteStudentInfo(scope.row.stuID)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
</style>