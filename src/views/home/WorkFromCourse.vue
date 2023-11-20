<script setup>

import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import {Document} from "@element-plus/icons-vue";
import router from "@/router";
import {onMounted, ref} from "vue";
import {showAllHomework, showClasses} from "@/net";
const courseId = ref(0);
const works= ref([]);
onMounted(() => {
  console.log("onmount收到的courseId"+router.currentRoute.value.params.courseId)
  courseId.value = router.currentRoute.value.params.courseId;
  getClasses()
});
function getClasses(){
     showAllHomework(courseId.value)
      .then((data) => {
        works.value = data;
        console.log(works.value)
      })
      .catch((error) => {
        console.error(error);
      });
}


const goToPage = (homework)  => {
  console.log(homework+"跳转咯");
  router.push(`/SubmitStuHomework/${homework}`);
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
          <el-scrollbar max-height="100vh" style="width: 700px;height: 100vh">
            <div class="scrollbar-demo-item" v-for="item in works" style="display: flex; justify-content: space-between; align-items: center;">
              <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                <el-icon><Document /></el-icon>
                {{item.fileName}}
              </div>
              <div>
                <el-button type="primary">下载</el-button>
                <el-button type="primary" @click="goToPage(item)">提交</el-button>
              </div>
            </div>
          </el-scrollbar>
          <el-calendar style="width: 600px;height: 550px" class="my-calendar" v-model="value" />
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