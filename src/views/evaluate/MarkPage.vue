<script lang="ts" setup>
import {ref, onMounted, watch} from 'vue';
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import router from "@/router";
import {getMarkWithMid} from "@/net";


import mammoth from 'mammoth';


let comment = ref('');
const courseId = ref(0) as any;
const thId = ref(0) as any;
const homework = ref([]) as any;
const courseName = ref('') as any;
const mid=ref(0)as any;

onMounted(() => {
  courseId.value = router.currentRoute.value.query.cid;
  thId.value = router.currentRoute.value.query.thId;
  courseName.value = router.currentRoute.value.query.cname;
  mid.value = router.currentRoute.value.query.mid;
  getHomework()

});

function getHomework(){
  console.log("获取作业");
  console.log(mid.value);
  getMarkWithMid(mid.value)
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
      case 'png':0
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
          <el-col span="8" >
            <el-card class="box-card" style="margin-left: auto;display: flex">
              <template #header>
                <div class="card-header" >
                  <div style="margin-left: 45px">本次作业得分：{{homework.score}}</div>
<!--                  <span>{{ courseName }}课的第{{ thId%10}}次作业</span>-->
<!--                  <el-button class="button" type="primary" style="margin-left: 320px;margin-bottom: 10px" @click="downloadTh(courseId,thId)">下载本次作业</el-button>-->
                </div>

                <div class="homework-display "  v-html="homeworkDisplay"></div>
                <!-- 在线展示作业内容的区域 -->
                <!--                  <span>{{ courseName }}课的第{{ thId%10}}次作业的内容</span>-->
                <!--                </div>-->
              </template>

              <div class="comment-container vertical-section">

                <div class="comment-section" >
<!--                  <el-card class="box-card">-->
<!--                    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>-->
<!--                  </el-card>-->
<!--                   这里是你对本次批改作业的评论-->
<!--                  <el-input type="textarea" v-model="comment" :rows="10" size="large" ref="commentInput"  clearable>-->
<!--                        哈哈哈-->
<!--                  </el-input>-->

                </div>
              </div>

            </el-card>
          </el-col>

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
  width: 1200px;
  height: 550px;
  border: 1px solid #ccc;
  margin-left: 45px;
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
