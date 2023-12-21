<script setup>

import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import {Document, Timer} from "@element-plus/icons-vue";
import router from "@/router";

import {onMounted, ref} from "vue";
import {getTNSuggestionWithCid} from "@/net";
const works=ref([]);
const cid = ref(0);
const cname = ref('');
const loading = ref(false); // 添加一个变量来控制加载状态

function getAllUnSubmitHomework(){
  loading.value = true; // 开始加载数据时，设置loading为true
  getTNSuggestionWithCid(cid.value)
      .then((data) => {
        works.value = data;
        loading.value = false; // 数据加载完成后，设置loading为false
        // console.log(works.value)
      })
      .catch((error) => {
        console.error(error);
        loading.value = false; // 出错时，也要确保设置loading为false
      });
}

//在页面加载前获取课程信息
onMounted(() => {
  cid.value = router.currentRoute.value.query.cid;
  cname.value = router.currentRoute.value.query.cname;
  getAllUnSubmitHomework()
});


</script>

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

        <el-main style="display:flex">
          <!-- 加载提示 -->
          <div v-if="loading" style="display: flex; height: 100%; width: 100%;">
            <p>加载中...</p>
          </div>
          <el-table :data="works"  v-loading="loading" stripe style="width: 100%">
            <!-- 学号列 -->
            <el-table-column label="学号" width="200">
              <template #default="scope">
                <el-icon><Timer /></el-icon>
                <span>{{ scope.row.sid }}</span>
              </template>
            </el-table-column>

            <!-- 教师号列 -->
            <el-table-column label="教师号" width="180">
              <template #default="scope">
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                  <el-icon><Document /></el-icon>
                  <span style="margin-left: 10px">{{ scope.row.cid }}</span>
                </div>
              </template>
            </el-table-column>

            <!-- 申诉内容列 -->
            <el-table-column label="申诉内容" width="240">
              <template #default="scope">
                <span>{{ scope.row.question }}</span>
              </template>
            </el-table-column>

          </el-table>

          <el-calendar style="width: 600px;height: 650px" class="my-calendar" v-model="value" >
          </el-calendar>
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
  padding-left: 20px; /* 增加左侧内边距以避免遮挡 */
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