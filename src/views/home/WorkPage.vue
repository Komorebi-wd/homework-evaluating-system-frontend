<script setup>

import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import {Document, Timer} from "@element-plus/icons-vue";
import router from "@/router";

import {onMounted, ref} from "vue";
import {downloadThWithCidThid, showAllUnSubmitHomework} from "@/net";
const works=ref([]);
const loading = ref(false); // 添加一个变量来控制加载状态

function getAllUnSubmitHomework(){
  loading.value = true; // 开始加载数据时，设置loading为true
  showAllUnSubmitHomework()
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
  getAllUnSubmitHomework()
});
function downloadTh(cid, thId) {
  console.log("下载作业");
  downloadThWithCidThid(cid, thId)
      .then((message) => {
        console.log(message);
      })
      .catch((error) => {
        console.error('Download failed', error);
      });
}

const goToPage = (cid,thId,cname)  => {
  router.push({
    path: '/submitStuHomework',
    query: {
      cid: cid,
      thId: thId,
      cname: cname
    }
  });
};


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
            <!-- 截止日期列 -->
            <el-table-column label="截止日期" width="200">
              <template #default="scope">
                <el-icon><Timer /></el-icon>
                <span>{{ scope.row.endTime }}</span>
              </template>
            </el-table-column>

            <!-- 文件名列 -->
            <el-table-column label="文件名" width="260">
              <template #default="scope">
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                  <el-icon><Document /></el-icon>
                  <span style="margin-left: 10px">{{ scope.row.fileName }}</span>
                </div>
              </template>
            </el-table-column>

            <!-- 课程名列 -->
            <el-table-column label="课程" width="180">
              <template #default="scope">
                <span>{{ scope.row.cname }}</span>
              </template>
            </el-table-column>

            <!-- 操作列 -->
            <el-table-column label="操作" >
              <template #default="scope">
                <el-button type="primary" @click="downloadTh(scope.row.cid, scope.row.thId)">下载</el-button>
                <el-button type="success" @click="goToPage(scope.row.cid, scope.row.thId, scope.row.cname)">提交</el-button>
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