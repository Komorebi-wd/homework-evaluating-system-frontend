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

          <el-scrollbar class="el-scrollbar" max-height="100vh" style="width: 700px;height: 100vh">

            <div class="scrollbar-demo-item">
              <el-icon class="el-icon"><Document /></el-icon>
              {{"查看未回复学生申诉"}}
              <el-button type="primary" @click="goToPage(cid,cname,'/teacherUnAnsweredAppeal')" style="margin-left: auto" >前往</el-button>
            </div>

            <div class="scrollbar-demo-item">
              <el-icon class="el-icon"><Document /></el-icon>
              {{"查看已回复学生申诉"}}
              <el-button type="primary" @click="goToPage(cid,cname,'/teacherAnsweredAppeal')" style="margin-left: auto" >前往</el-button>
            </div>

          </el-scrollbar>
          <el-calendar style="width: 600px;height: 650px" class="my-calendar" v-model="value" />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import router from "@/router";
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import {onMounted, ref} from 'vue'
import {Document} from "@element-plus/icons-vue";


const goToPage = (cid,cname,url)  => {
  router.push({
    path: url,
    query: {
      cid: cid,
      cname: cname
    }
  });
};

const cid = ref(0);
const cname = ref('');

onMounted(() => {
  cid.value = router.currentRoute.value.query.cid;
  cname.value = router.currentRoute.value.query.cname;

})


</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: start; /* 从左侧开始排列内容 */
  height: 50px;
  margin: 10px;
  padding-left: 20px; /* 增加左侧内边距以避免遮挡 */
  text-align: left; /* 文字对齐到左侧 */
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  overflow: hidden; /* 防止内容溢出 */
  white-space: nowrap; /* 避免文字换行 */
}

.el-icon {
  margin-right: 10px; /* 为图标和文字之间添加间隙 */
}

.el-scrollbar {
  width: calc(100% - 240px); /* 调整滚动条宽度以适应侧边栏 */
  height: 100vh;
  overflow-x: hidden; /* 隐藏水平滚动条 */
}

.my-calendar {
  border: 2px solid #ccc;
  border-radius: 2px;
  background-color: lightskyblue;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
