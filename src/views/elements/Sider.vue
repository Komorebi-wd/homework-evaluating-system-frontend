<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, Star,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue'
const router = useRouter();
const selectedItem = ref('1'); // 默认选中第一个菜单项
const goToPage = (path) => {
  //selectedItem.value = index; // 更新选中的菜单项
  //defaultActive.value = index;
  router.push(path).then(() => {
    selectedItem.value = index; // 在页面成功跳转后更新选中的菜单项
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
    <router-link to="/homework">
    <el-menu-item index="2" >
      <el-icon><icon-menu /></el-icon>
      <span>课程平台</span>
    </el-menu-item>
    </router-link>
    <router-link to="/work">
    <el-menu-item index="3" @click="goToPage('/work')" >
        <el-icon><document /></el-icon>
         <span>作业平台</span>
    </el-menu-item>
    </router-link>
    <el-menu-item index="4" @click="goToPage('/evaluateHomework')">
      <el-icon><setting /></el-icon>
      <span>批改平台</span>
    </el-menu-item>
    <el-menu-item index="5" @click="goToPage('/homework')">
      <el-icon><Star /></el-icon>
      <span>成绩统计</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>