<script setup>
import { ref } from 'vue'
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
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

        <el-main>
          Main
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>