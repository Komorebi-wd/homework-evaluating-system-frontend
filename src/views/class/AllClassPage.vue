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

            <div class="scrollbar-demo-item" v-for="item in classes" :key="item.id">
              <el-icon><Document /></el-icon>
              {{item.cname}}
              <el-button type="primary" style="margin-left: auto"  @click="addClass(item.cid)" >确认选课</el-button>
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
import {getAllCourses, addScWithSidCid} from "@/net";
import {ElMessage} from "element-plus";
// 定义响应式变量来保存课程列表
const classes = ref([]);

function getClasses(){
  getAllCourses()
      .then((data) => {
        classes.value = data;
      })
      .catch((error) => {
        console.error(error);
      });
}

function addClass(cid) {
   addScWithSidCid(cid)
      .then((message) => {
         ElMessage.success("选课成功")
      })
      .catch((error) => {
         ElMessage.error("选课失败")
      });
}

//在页面加载前获取课程信息
onMounted(() => {
  getClasses()
});

const goToPage = (cid,cname)  => {
  //router.push(`/WorkFromCourse/${courseId}`);
  router.push({
    path: '/workFromCourse',
    query: {
      cid: cid,
      cname: cname
    }
  });
};


</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px; /* 增加左侧内边距以避免遮挡 */
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






