<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, Star,
} from '@element-plus/icons-vue'
</script>

<template>
  <el-menu
      style="height: 100vh"
      active-text-color="#ffd04b"
      background-color="#545c64"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-menu-item index="1">
      <el-icon><location /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>课程平台</span>
    </el-menu-item>
    <el-menu-item index="3" >
      <el-icon><document /></el-icon>
      <span>作业平台</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <span>批改平台</span>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon><Star /></el-icon>
      <span>成绩统计</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>