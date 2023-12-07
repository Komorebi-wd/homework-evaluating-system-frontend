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
            <div class="scrollbar-demo-item" >
                作业名称
              <div style="margin-left: auto">
                作业分数
              </div>
            </div>

            <div class="scrollbar-demo-item" v-for="(item,index) in works" :key="item.id">
              <el-icon><Document /></el-icon>
              {{item.fileName}}

              <div style="margin-left: auto">
                {{scoreList[index]}}
              </div>
            </div>

          </el-scrollbar>
          <el-calendar style="width: 600px;height: 550px" class="my-calendar" v-model="value" />
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
import {getThsWithTidCid,getAvgScoreMarkWithSidThId} from "@/net";

// 定义响应式变量来保存课程列表
const scoreList = ref([]);
const cid = ref(0);
const works=ref([]);
const sid = ref(0);

function getAvgScore(thId){
  getAvgScoreMarkWithSidThId(sid.value, cid.value,thId)
      .then((data) => {
        console.log("第"+thId+"次作业的分数为："+data)
        scoreList.value.push(data);
      })
      .catch((error) => {
        console.error(error);
      });
}

function getScoreList(){
    for (let i = 0; i < works.value.length; i++) {
    getAvgScore(works.value[i].thId%10)
  }
}


function getAllWorks(){
  getThsWithTidCid(cid.value)
      .then((data) => {
        works.value = data;
        getScoreList()
      })
      .catch((error) => {
        console.error(error);
      });
}


//在页面加载前获取课程信息
onMounted(() => {
  cid.value = router.currentRoute.value.query.cid;
  sid.value = router.currentRoute.value.query.sid;
  getAllWorks()
});

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



