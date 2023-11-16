<script setup>

import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import {ChatLineSquare, Document} from "@element-plus/icons-vue";
import router from "@/router";

const goToPage = (path)  => {
  router.push(path);
};
const homeworks=[
    '作业一','作业二','作业三','作业四','作业五','作业六','作业七'
]

</script>

<template>
  <div className="common-layout">
    <el-container>

      <el-header style="display: grid; grid-template-columns: 1fr auto;">
        <Header/>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <Sider/>
        </el-aside>

        <el-main style="display:flex">
          <el-scrollbar max-height="100vh" style="width: 700px;height: 100vh">
            <div className="scrollbar-demo-item" v-for="item in homeworks">
              <el-icon>
                <Document/>
              </el-icon>
              {{item}}
              <el-button type="primary" @click="goToPage('/evaluate')" style="margin-left: auto">批改</el-button>
            </div>

          </el-scrollbar>
          <el-calendar style="width: 600px;height: 550px" className="my-calendar" v-model="value"/>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

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

