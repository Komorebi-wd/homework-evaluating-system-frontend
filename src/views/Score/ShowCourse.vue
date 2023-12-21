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
              <el-icon><House /></el-icon>
              {{item.cname}}
              <div style="margin-left: auto">
                <el-button type="primary"    @click="goToPage(item.cid,item.cname)" >查看成绩</el-button>
                <el-button type="success"    @click="open(item.cid)">加分鼓励</el-button>
              </div>
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
import {House} from "@element-plus/icons-vue";
import {getAllCoursesByTid,addScoreForTopNStudentWithCidAddScoreNum} from "@/net";
import {ElMessage, ElMessageBox} from "element-plus";

// 定义响应式变量来保存课程列表
const classes = ref([]);
const score = ref(0);
const n = ref(0);

function getClasses(){
  getAllCoursesByTid()
      .then((data) => {
        classes.value = data;
        //console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
}

function addScore(cid){
  addScoreForTopNStudentWithCidAddScoreNum(cid,score.value,n.value)
      .then((data) => {
        console.log(data)
        ElMessage.success("加分成功")
      })
      .catch((error) => {
        console.error(error);
      });
}

//在页面加载前获取课程信息
onMounted(() => {
  getClasses()
});
const goToPage = (cid,cname)  => {
  router.push({
    path: '/showHWScore',
    query: {
      cid: cid,
      cname: cname
    }
  });
};


const open = (cid) => {
  // 首先输入分数
  ElMessageBox.prompt('请输入分数', '输入', {
    confirmButtonText: '下一步',
    cancelButtonText: '取消',
    inputValidator: (value) => {
      return !isNaN(value) && value !== '';
    },
    inputErrorMessage: '无效的分数'
  })
      .then(({ value }) => {
        score.value = Number(value);

        // 接着输入人数
        return ElMessageBox.prompt('请输入人数', '输入', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: (value) => {
            return !isNaN(value) && value !== '';
          },
          inputErrorMessage: '无效的人数'
        });
      })
      .then(({ value }) => {
        n.value = Number(value);
        addScore(cid)
        ElMessage({
          type: 'success',
          message: `您选择的加分是: ${score.value}, 人数是: ${n.value}`
        });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '输入取消'
        });
      });
}


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






