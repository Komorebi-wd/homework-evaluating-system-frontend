<template>

  <el-upload
      v-model:file-list="fileList1"
      class="upload-demo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      list-type="picture"
      :auto-upload="false"
  >
  <el-button type="primary">添加图片</el-button>
  </el-upload>


  <el-upload
      v-model:file-list="fileList2"
      class="upload-demo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :auto-upload="false"
  >
    <el-button type="primary">添加文件</el-button>
  </el-upload>


</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList1 = ref<UploadUserFile[]>([])
const fileList2 = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  fileList1.value = uploadFiles.slice(-3)
  fileList2.value = uploadFiles.slice(-3)
}
</script>
