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
            <div class="scrollbar-demo-item" v-for="item in classes">
              <el-icon><Document /></el-icon>
              {{item}}
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
import {ChatLineSquare, Document} from "@element-plus/icons-vue";
const count = ref(15)
const classes=[
    '数据库系统原理','人工智能基础','大数据概论','操作系统','机器学习','计算机网络','科技论文写作','专业课程实训','微积分','线性代数','概率论与数理统计','计算机组成原理'
]

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






