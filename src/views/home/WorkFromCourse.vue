<script setup>
import Sider from "@/views/elements/Sider.vue";
import {Document} from "@element-plus/icons-vue";
import router from "@/router";
import { onMounted, ref} from "vue";
import {showAllHomework,downloadThWithCidThid} from "@/net";

const courseId = ref(0);
const courseName = ref('');
const works= ref([]);
onMounted(() => {
  courseId.value = router.currentRoute.value.query.cid;
  courseName.value = router.currentRoute.value.query.cname;
  getClasses()
});

function getClasses(){
     showAllHomework(courseId.value)
      .then((data) => {
        works.value = data;
      })
      .catch((error) => {
      });
}

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



const goToPage = (cid,thId)  => {
  router.push({
    path: '/submitStuHomework',
    query: {
      cid: cid,
      thId: thId,
      cname: courseName.value
    }
  });
};

</script>

<template>
  <div class="common-layout">
    <el-container>

      <el-header style="display: flex; grid-template-columns: 1fr auto;">
<!--        <Header />-->
        <h1>{{courseName}}</h1>
        <h5 style="font-size: large;text-align: center;flex: 1">同伴作业互评系统</h5>
        <div style="display: flex; justify-content: flex-end; align-items: center;">
          <el-button type="primary">用户中心</el-button>
          <el-button type="info">退出登录</el-button>
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px">

          <Sider />
        </el-aside>

        <el-main style="display:flex">


          <el-scrollbar max-height="100vh" style="width: 700px;height: 100vh">
            <div class="scrollbar-demo-item" v-for="item in works" style="display: flex; justify-content: space-between; align-items: center;">
              <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                <el-icon><Document /></el-icon>
                {{item.fileName}}
              </div>
              <div>
                <el-button type="primary" @click="downloadTh(item.cid,item.thId)">下载</el-button>
                <el-button type="primary" @click="goToPage(item.cid,item.thId)">提交</el-button>
              </div>
            </div>
          </el-scrollbar>


          <el-calendar style="width: 600px;height: 550px" class="my-calendar" v-model="value" >
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