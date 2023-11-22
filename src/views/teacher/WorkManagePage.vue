<script lang="ts" setup>
import { ref } from 'vue'
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import { reactive } from 'vue'
// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}
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
          <el-form :model="form" label-width="120px">

            <el-form-item label="作业名称">
              <el-input v-model="form.name" />
            </el-form-item>

            <el-form-item label="Activity zone">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>

            <el-form-item label="提交截止日期">

              <el-col :span="11">
                <el-date-picker
                    v-model="form.date"
                    type="date"
                    placeholder="Pick a date"
                    style="width: 100%"
                />
              </el-col>

            </el-form-item>

            <el-form-item label="Instant delivery">
              <el-switch v-model="form.delivery" />
            </el-form-item>


            <el-form-item label="Resources">
              <el-radio-group v-model="form.resource">
                <el-radio label="Sponsor" />
                <el-radio label="Venue" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">发布</el-button>
              <el-button>取消</el-button>
            </el-form-item>

          </el-form>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>