<script setup>

import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import {Document} from "@element-plus/icons-vue";
import router from "@/router";
import {getDistributions, downloadAllDistributions, downloadThWithCidThid} from "@/net";
import {onMounted, ref} from "vue";


const goToPage = (shId,submitTime)  => {
  router.push({
    path: '/evaluate',
    query: {
      shId: shId,
      submitTime: submitTime
    }
  });
};

const homeworks= ref([]);

onMounted(() => {
  getMyDistributions()
});

function getMyDistributions(){
  getDistributions()
      .then((data) => {
        homeworks.value = data;
        console.log("成功获取到待批改作业")
        console.log(homeworks.value)
      })
      .catch((error) => {
        console.error(error);
      });
}

function downloadTh() {
  console.log("下载作业");
  downloadAllDistributions()
      .then((message) => {
        console.log(message);
      })
      .catch((error) => {
        console.error('Download failed', error);
      });
}

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
            <div className="scrollbar-demo-item" >
                  待批改作业
              <el-button type="primary" @click="downloadTh()" style="margin-left: auto">全部下载</el-button>
            </div>

            <div className="scrollbar-demo-item" v-for="item in homeworks">
              <el-icon>
                <Document/>
              </el-icon>
              {{item.fileName}}
              <el-button type="primary" @click="goToPage(item.shId,item.submitTime)" style="margin-left: auto">批改</el-button>
            </div>

          </el-scrollbar>
          <el-calendar style="width: 600px;height: 650px" class="my-calendar" v-model="value"/>
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

