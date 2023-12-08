<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, Star, Avatar, Box, Search,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue'
const router = useRouter();
const selectedItem = ref('1'); // 默认选中第一个菜单项
const goToPage = (path) => {
  //selectedItem.value = index; // 更新选中的菜单项
  //defaultActive.value = index;
  router.push(path).then(() => {
    //selectedItem.value = index; // 在页面成功跳转后更新选中的菜单项
    //defaultActive.value = index;
  //default-active="1"
  });
}
</script>

<template>
  <el-menu
      v-model:selectedIndex="selectedItem"
      style="height: 100vh"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"

      @open="handleOpen"
      @close="handleClose"
  >
    <router-link to="/home">
    <el-menu-item index="1">
      <el-icon><location /></el-icon>
      <span>首页</span>
    </el-menu-item>
    </router-link>

    <router-link to="/course">
    <el-menu-item index="2" >
      <el-icon><icon-menu /></el-icon>
      <span>课程平台</span>
    </el-menu-item>
    </router-link>

    <el-menu-item index="3" @click="goToPage('/allClass')">
      <el-icon><Box /></el-icon>
      <span>选课管理</span>
    </el-menu-item>


<!--    <router-link to="/workPlatform">-->
    <el-menu-item index="4" @click="goToPage('/workPlatform')" >
        <el-icon><document /></el-icon>
         <span>作业平台</span>
    </el-menu-item>
<!--    </router-link>-->

    <el-menu-item index="5" @click="goToPage('/evaluatePlatform')">
      <el-icon><setting /></el-icon>
      <span>批改平台</span>
    </el-menu-item>

    <el-menu-item index="6" @click="goToPage('/showCourse')">
      <el-icon><Star /></el-icon>
      <span>成绩统计</span>
    </el-menu-item>

    <el-menu-item index="7" @click="goToPage('/teachCourse')">
      <el-icon><Avatar /></el-icon>
      <span>教学平台</span>
    </el-menu-item>

    <el-menu-item index="8" @click="goToPage('/showDetectionCourse')">
      <el-icon><Search /></el-icon>
      <span>作业查重</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>