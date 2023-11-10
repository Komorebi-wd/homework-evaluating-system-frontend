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
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 text="2xl" justify="center">{{ item }}</h3>
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
            <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
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
            <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
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
            <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
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
</script>

<style scoped>
.el-carousel__item h3 {
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
}
</style>


