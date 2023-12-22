<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import { reactive } from 'vue'
import router from "@/router";
import {ElMessage, UploadProps, UploadUserFile} from "element-plus";
import{putThWithCidEndDateComment} from "@/net";
// do not use same name with ref
const form = reactive({
  comment: '',
  date: '',
})
const courseId = ref(0) as any;
onMounted(() => {
  courseId.value = router.currentRoute.value.query.cid;
});


const onSubmit = () => {
  //console.log(form)
  if (form.comment === '') {
    ElMessage.error("作业注意事项不能为空")
    return
  }
  if (form.date === '') {
    ElMessage.error("提交截止日期不能为空")
    return
  }
  if(form.date < new Date().toISOString().slice(0, 10)){
    ElMessage.error("提交截止日期不能小于当前日期")
    return
  }
  if (fileList.value.length === 0) {
    ElMessage.error("作业文件不能为空")
    return
  }
  let file = fileList.value[0].raw
  putThWithCidEndDateComment(num.value,courseId.value,form.date,form.comment,file)
      .then((message) => {
        console.log(message);
        ElMessage.success("发布作业成功")
      })
      .catch((error) => {
        ElMessage.error("发布作业失败")
        console.error('发布作业失败', error);
      });
}

const fileList= ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}
const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
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
            <div style="display: flex">
            <el-form-item label="作业内容">

            </el-form-item>
            <el-upload
                v-model:file-list="fileList"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :auto-upload="false"
            >
              <el-button type="primary">选择文件</el-button>
            </el-upload>
            </div>

            <el-form-item label="作业布置次数">
              <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
            </el-form-item>
            <el-form-item label="作业注意事项">
              <el-input v-model="form.comment" style="width: 530px"/>
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