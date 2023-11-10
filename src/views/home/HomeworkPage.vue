<template>
  <div class="common-layout">
    <el-container>
      <el-header style="display: grid; grid-template-columns: 1fr auto;">
        <Header />
      </el-header>

      <el-container>
        <el-aside width="200px">
          <Sider />
        </el-aside>

        <el-main style="display: flex">

          <el-scrollbar max-height="100vh" style="width: 700px;height: 100vh">
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              数据库系统原理
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              人工智能基础
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              大数据概论
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              操作系统
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              机器学习
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              计算机网络
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              科技论文写作
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              专业课程实训
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              微积分
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              线性代数
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              概率论与数理统计
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>
            <div class="scrollbar-demo-item">
              <el-icon><ChatLineSquare /></el-icon>
              计算机组成原理
              <el-button type="primary" style="margin-left: auto">前往作业</el-button>
            </div>

          </el-scrollbar>
          <el-calendar style="width: 600px;height: 550px" class="my-calendar" v-model="value" />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import { ref } from 'vue'
import {ChatLineSquare} from "@element-plus/icons-vue";
const count = ref(15)


</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.my-calendar {
  border: 2px solid #ccc;
  border-radius: 2px;
  background-color: lightskyblue;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>

