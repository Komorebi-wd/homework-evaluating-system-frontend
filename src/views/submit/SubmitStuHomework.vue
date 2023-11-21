<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import router from "@/router";
import {showOneHomework,submitShWithSidCidThId} from "@/net";
import type { UploadProps, UploadUserFile } from 'element-plus'


let comment = ref('');
let fileUrl = ref('');
const courseId = ref(0) as any;
const thId = ref(0) as any;
const homework = ref([]) as any;
const courseName = ref('') as any;


onMounted(() => {
  courseId.value = router.currentRoute.value.query.cid;
  thId.value = router.currentRoute.value.query.thId;
  courseName.value = router.currentRoute.value.query.cname;
  getHomework()
});

function getHomework(){
  showOneHomework(courseId.value, thId.value)
      .then((data) => {
        homework.value = data;
      })
      .catch((error) => {
      });
}
function submit() {
  if (fileList2.value.length === 0) {
    console.error("没有选择文件");
    return;
  }
  // 获取第一个上传的文件
  let file = fileList2.value[0].raw;

  submitShWithSidCidThId(courseId.value, thId.value, file)
      .then((message) => {
        console.log("提交成功", message);
        // 这里处理提交成功后的逻辑
      })
      .catch((error) => {
        console.error("提交失败", error);
        // 这里处理提交失败的逻辑
      });
}

// function submit(cid,thId,file){
//   submitShWithSidCidThId(cid,thId,file)
//       .then((message) => {
//         console.log(message);
//       })
//       .catch((error) => {
//         console.error('Download failed', error);
//       });
// }

// function submit() {
//   // 假设 fileList1 和 fileList2 分别存储图片和文件
//   let allFiles = [...fileList1.value, ...fileList2.value];
//
//   console.log("显示提交的图片："+allFiles);
//   let formData = new FormData();
//   allFiles.forEach(file => {
//     formData.append('multipartFile', file.raw); // 确保字段名称与后端期望的一致
//   });
//   formData.append('cid', courseId.value);
//   formData.append('thId', thId.value);
//
//   submitShWithSidCidThId(courseId.value, thId.value, formData)
//       .then((message) => {
//         console.log(message);
//         // 处理提交成功逻辑
//       })
//       .catch((error) => {
//         console.error('Error during submission:', error);
//         // 处理错误
//       });
// }


const setScore = (num) => {
  // 设置评分逻辑
};
const cancel = () => {
  router.go(-1); // 后退到上一个页面
};
const empty = () => {
  // 取消逻辑
  // 获取文本框的引用
  // 清空文本框的值
  comment.value = '';
};



let uploadFiles = ref([]) ;
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


<template>
  <div class="common-layout">
    <el-container >
      <el-header style="display: grid; grid-template-columns: 1fr auto;">
        <Header />
      </el-header>

      <el-container>
        <el-aside width="200px">
          <Sider />
        </el-aside>

        <div class="content-container" >
          <!-- 新增的显示作业信息的组件 -->
          <!--          <div class="homework-info-display">-->

          <!--          </div>-->
          <el-col span="4" >
            <el-card class="box-card" style="margin-left: auto;display: flex">
              <template #header>
                <div class="card-header" >
                  <span>{{ courseName }}课的第{{ thId%10}}次作业</span>
                  <!--                  <el-button class="button" text>前往</el-button>-->
                  <span v-if="fileUrl" >
                  <a :href="fileUrl" download>点击下载作业</a>
                  </span>
                </div>
                <div class="homework-display">
                  <!-- 在线展示作业内容的区域 -->
                  <span>{{ courseName }}课的第{{ thId%10}}次作业的内容</span>
                </div>
              </template>

              <div class="comment-container vertical-section">

                <div class="comment-section" >

                  <!-- 文字输入框，用于输入作业内容 -->
                  <el-input type="textarea" v-model="comment" :rows="8" size="large" placeholder="请输入你的答案" ref="commentInput"  clearable>

                  </el-input>

                  <div class="button-container">
                    <div class="left-buttons">
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

                    </div>
                    <el-button type="default" @click="empty">清空</el-button>
                  </div>
                </div>
              </div>

            </el-card>
          </el-col>

          <div class="action-buttons">
            <!-- 取消和提交按钮 -->
            <el-button type="default" @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit()">提交</el-button>
          </div>
        </div>

      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
/* 样式部分 */

.content-container{
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;

}
.card-header span + span {
  margin-left: 400px;
}

.button-container {
  display: flex;
  justify-content: space-between;
}
.left-buttons {
  display: flex; /* 设置为 flex 布局以横向排列按钮 */
}
.homework-display{
  width: 630px;
  height: 350px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.comment-section {
  margin-top: 10px;
  width: 630px;
}

.vertical-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.action-buttons{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

</style>
