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

        <el-main>
          <el-col :span="24" style="display: grid; place-items: center;height: 50px;background-color: lightskyblue">
            同学你好，新的一天也要加油哦！
          </el-col>
          <el-carousel :interval="4000" type="card" height="300px" >

            <el-carousel-item v-for="(index, item) in images" :key="item" >
              <img :src="index.url" :alt="index.description">
            </el-carousel-item>


          </el-carousel>

        <div style="margin-top: 30px">
          <el-row>

            <el-col span="4">
          <el-card class="box-card" style="margin-left: 15px">
            <template #header>
              <div class="card-header">
                <span>课程平台</span>
                <el-button class="button" text>前往</el-button>
              </div>
            </template>
            <div>
              在课程平台，你可以看到自己的所有课程，以及是否有作业需要完成。
            </div>
          </el-card>
            </el-col>

            <el-col span="4" >
          <el-card class="box-card" style="margin-left: 60px">
            <template #header>
              <div class="card-header">
                <span>作业平台</span>
                <el-button class="button" text>前往</el-button>
              </div>
            </template>
            <div>
              在作业平台，你可以看到自己相应课程的所有作业，并选择下载作业或者提交作业。
            </div>
          </el-card>
            </el-col>
            <el-col span="4">

          <el-card class="box-card" style="margin-left: 60px">
            <template #header>
              <div class="card-header">
                <span>批改平台</span>
                <el-button class="button" text>前往</el-button>
              </div>
            </template>
            <div>
              在批改平台，你可以看到自己待批改的所有作业，并选择批改作业。
            </div>
          </el-card>
            </el-col>

          </el-row>
        </div>

        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>

import Sider from "@/views/elements/Sider.vue";
import Header from "@/views/elements/Header.vue";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const buttons = [
  { type: 'primary', text: 'primary' },
  { type: 'info', text: 'info' },
] as const

const images=[
        { url: "/src/resources/home1.png", description: 'Image 1' },
        { url: "/src/resources/home2.png", description: 'Image 2' },
        { url: "/src/resources/home3.png", description: 'Image 3' },
        { url: "/src/resources/home4.png", description: 'Image 4' },
        // Add more images as needed
      ]as const


</script>

<style scoped>
.el-carousel__item h3 {
  image-rendering: pixelated;
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 370px;
  height: 260px;
  background-color: lightgoldenrodyellow;
}
</style>



