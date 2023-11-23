<script setup>
import Sider from "@/views/elements/Sider.vue";
import {Document} from "@element-plus/icons-vue";
import router from "@/router";
import { onMounted, ref} from "vue";
import {showAllHomework,downloadThWithCidThid,getMyMarksWithCidThId} from "@/net";

const courseId = ref(0);
const thId = ref(0);
const courseName = ref('');
const works= ref([]);
onMounted(() => {
  courseId.value = router.currentRoute.value.query.cid;
  thId.value = router.currentRoute.value.query.thId;
  courseName.value = router.currentRoute.value.query.cname;
  getClasses()
});

function getClasses(){
  getMyMarksWithCidThId(courseId.value,thId.value)
      .then((data) => {
        works.value = data;
      })
      .catch((error) => {
      });
}

const goToPage = (cid,thId,mid)  => {
  router.push({
    path: '/mark',
    query: {
      cid: cid,
      thId: thId,
      cname: courseName.value,
      mid: mid
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
            <div class="scrollbar-demo-item"  style="display: flex; justify-content: space-between; align-items: center;">
              <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                作业名称
              </div>
            </div>

            <div class="scrollbar-demo-item" v-for="item in works" style="display: flex; justify-content: space-between; align-items: center;">
              <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                <el-icon><Document /></el-icon>
                {{item.comment}}
              </div>
              <div>
                <el-button @click="goToPage(courseId,thId,item.mid)" type="primary"  >查看详情</el-button>
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

