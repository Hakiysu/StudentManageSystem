<script lang="js" setup>
import {ref} from "vue";
import axios from "axios";
//check if user has logged in
if (localStorage.getItem("username") === null) {
  alert("请先登录");
  location.href = "/login";
}
const stuInfo = ref({
  stuID: undefined,
  stuName: undefined,
  stuSex: undefined,
  stuMajor: undefined,
  stuBirth: undefined
});

const majorOptions = ref([
  {value: '计算机科学与技术', label: '计算机科学与技术'},
  {value: '软件工程', label: '软件工程'},
  {value: '网络工程', label: '网络工程'},
  {value: '信息安全', label: '信息安全'},
  {value: '物联网工程', label: '物联网工程'},
  {value: '数字媒体技术', label: '数字媒体技术'},
  {value: '电子信息工程', label: '电子信息工程'},
  {value: '通信工程', label: '通信工程'},
  {value: '电子科学与技术', label: '电子科学与技术'},
  {value: '土木工程', label: '土木工程'},
  {value: '财经管理', label: '财经管理'},
  {value: '国际贸易', label: '国际贸易'},
  {value: '材料工程', label: '材料工程'}
]);

function addNewStudent() {
  //change stuBirth to the format of "yyyy-mm-dd" by using moment.js
  stuInfo.value.stuBirth = stuInfo.value.stuBirth.getFullYear() + "-" + (stuInfo.value.stuBirth.getMonth() + 1) + "-" + stuInfo.value.stuBirth.getDate();
  axios.post("http://localhost:3003/addNewStudent", {
    stuID: stuInfo.value.stuID,
    stuName: stuInfo.value.stuName,
    stuSex: stuInfo.value.stuSex,
    stuMajor: stuInfo.value.stuMajor,
    stuBirth: stuInfo.value.stuBirth
  }).then((res) => {
    console.log(res);
    if (res.status === 200) {
      if (res.data === 'pass') {
        alert("添加成功,正在刷新页面");
        //refresh page by vue-router
        location.href = "/studentAdder";
      } else if (res.data === 'stuIDExist') {
        alert("学号冲突！此学生已存在");
        //refresh page by vue-router
        location.href = "/studentAdder";
      }
    } else {
      alert("添加失败");
    }
  }).catch((err) => {
    console.log(err);
  });
}
</script>

<template>
  <el-form :model="stuInfo" label-width="100px" @change="$forceUpdate()">
    <el-form-item label="姓名">
      <el-input v-model="stuInfo.stuName" placeholder="请输入姓名"/>
    </el-form-item>
    <el-form-item label="学号">
      <el-input v-model="stuInfo.stuID" placeholder="请输入学号"/>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="stuInfo.stuSex">
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="专业">
      <el-select v-model="stuInfo.stuMajor" placeholder="请选择专业">
        <el-option v-for="major in majorOptions"
                   :key="major.value"
                   :label="major.label"
                   :value="major.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期">
      <el-col :span="11">
        <el-date-picker
            v-model="stuInfo.stuBirth"
            placeholder="请选择出生日期"
            type="date"
        />
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addNewStudent">提交</el-button>
    </el-form-item>
  </el-form>

</template>

<style scoped>
</style>