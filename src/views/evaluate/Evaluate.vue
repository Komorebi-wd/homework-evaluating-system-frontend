<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue';
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import {addMarkWithShIdCommentCommentIdScore, getShWithShId,downloadShWithShId} from "@/net";
import router from "@/router";
import mammoth from 'mammoth';
import {UploadProps, UploadUserFile} from "element-plus";
let comment = ref('');
const homework = ref([]) as any;
const empty = () => {
  // 取消逻辑
  // 获取文本框的引用
  // 清空文本框的值
  comment.value = '';

};
const cancel = () => {
  router.go(-1); // 后退到上一个页面
};
const shId = ref(0) as any;
const Date = ref('') as any;
const score = ref(0) as any;
onMounted(() => {
   shId.value = router.currentRoute.value.query.shId;
   Date.value = router.currentRoute.value.query.submitTime;
   getHomework()
});

function downloadTh() {
  console.log("下载作业");
  downloadShWithShId(shId.value)
      .then((message) => {
        console.log(message);
      })
      .catch((error) => {
        console.error('Download failed', error);
      });
}

function getHomework(){
  console.log("获取作业");
  getShWithShId(shId.value)
      .then((data) => {
        homework.value = data;
        console.log(homework.value);
      })
      .catch((error) => {
      });
}

const homeworkDisplay = ref(''); // 存储转换后的内容用于显示

watch(homework, (newValue) => {

  console.log(newValue.fileData);
  if(newValue && newValue.fileData && newValue.fileType) {
    switch(newValue.fileType) {
      case 'png':
        console.log("case里的"+newValue.fileType);
        // 将数字对象映射转换为字节数组
        let byteArray = new Uint8Array(Object.values(newValue.fileData));
        // 创建 Blob 对象
        let blob = new Blob([byteArray], {type: "png"});
        convertBlobToImageSrc(blob);
        break;
      case 'pdf':
        // 调用处理 PDF 的方法
        // 将数字对象映射转换为字节数组
        let byteArray1 = new Uint8Array(Object.values(newValue.fileData));
        // 创建 Blob 对象
        let blob1 = new Blob([byteArray1], {type: "application/pdf"});
        convertBlobToPdfSrc(blob1);
        break;
      case 'docx':
        // 调用处理 DOCX 的方法
        // 假设 docxArrayBuffer 是从文件输入或其他方式获取的 .docx 文件的 ArrayBuffer
        // 例如，如果您使用 <input type="file"> 让用户选择文件，那么可以使用 FileReader API 来获取 ArrayBuffer
        // 处理可能存在的负数，将其转换为正确的字节值
        const docxDataBytes = newValue.fileData.map(byte => byte < 0 ? byte + 256 : byte);
        // 创建 Uint8Array 并转换为 ArrayBuffer
        const uint8Array = new Uint8Array(docxDataBytes);
        const arrayBuffer = uint8Array.buffer;

        mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
            .then((result) => {
              homeworkDisplay.value = result.value; // HTML 内容
              console.log(result.messages); // 可选：显示任何转换消息或警告
            })
            .catch((error) => {
              console.error('Error converting .docx to HTML:', error);
            });
        break;
      default:
        // 处理其他类型或错误
    }
  }
});

function convertBlobToImageSrc(blob) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () => {
    homeworkDisplay.value = `<img src="${reader.result}" alt="作业预览" style="max-width: 100%; max-height: 100%; object-fit: contain;"/>`;
  };
}
function convertBlobToPdfSrc(blob) {
  const url = URL.createObjectURL(blob);
  homeworkDisplay.value = `<iframe src="${url}" style="width:100%; height:100%;" frameborder="0"></iframe>`;
}
function determineFileType(blob) {
  // 根据 Blob 数据确定文件类型
  return blob.type;
}
const fileList= ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}
const handleChange = (value: number) => {
  console.log(value)
}
const submit = () => {
  let file = fileList.value[0].raw
  addMarkWithShIdCommentCommentIdScore(shId.value,comment.value,score.value,file)
      .then((message) => {
        console.log("提交成功", message);
        // 这里处理提交成功后的逻辑
      })
      .catch((error) => {
        console.error("提交失败", error);
        // 这里处理提交失败的逻辑
      });
};

const setScore = (num) => {
  score.value = num;
  console.log(score.value);
};


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
                  <span>作业内容</span>
<!--                  <span>{{ courseName }}课的第{{ thId%10}}次作业</span>-->
                  <el-button class="button" type="primary" style="margin-left: 480px;margin-bottom: 10px" @click="downloadTh()">下载此待批改作业</el-button>
                </div>

                <span>{{homework.comment}}</span>
                <div class="homework-display " v-html="homeworkDisplay"></div>
                <!-- 在线展示作业内容的区域 -->
<!--                                  <span>{{ courseName }}课的第{{ thId%10}}次作业的内容</span>-->
                <!--                </div>-->
              </template>

              <div class="comment-container vertical-section">

                <div class="comment-section" >

                  <!-- 文字输入框，用于输入评价内容 -->
                  <el-input type="textarea" v-model="comment" :rows="10" size="large" placeholder="请输入你的批改意见，并给出相应分数" ref="commentInput"  clearable>
                  </el-input>

                  <div class="score-section ">
                    <!-- 0到10的数字按钮用于选择得分 -->
                    <el-button-group size="large">
                      <el-button v-for="num in 10" :key="num" @click="setScore(num)">{{ num }}</el-button>
                    </el-button-group>
                  </div>

                  <div class="button-container">
                    <div class="left-buttons">
                      <el-upload
                          v-model:file-list="fileList"
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
            <el-button type="default" @click="cancel" >取消</el-button>
            <el-button type="primary" @click="submit()">提交</el-button>
          </div>
        </div>

      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
/* 样式部分 */
.score-section{
  margin-top: 20px;
  margin-left: 65px;
  margin-bottom: 20px;
}
.content-container{
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;

}
.card-header{
  font-size: 25px;
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
  width: 730px;
  height: 550px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 20px; /* 内边距 */
  box-sizing: border-box;
  line-height: 1.6;
  font-size: 18px;
  /*display: flex;*/
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  overflow-y: auto;
}
.homework-display img {
  object-fit: contain; /* 保持图片的纵横比 */
}
.comment-section {
  margin-top: 34px;
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
