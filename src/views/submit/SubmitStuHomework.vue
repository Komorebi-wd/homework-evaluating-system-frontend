<script setup>
import {ref, reactive, onMounted} from 'vue';
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import {ChatLineSquare} from "@element-plus/icons-vue";
import router from "@/router";

let comment = ref('');
let fileUrl = ref('');
const homework = ref(0);

onMounted(() => {
  console.log("测试submitOnMount")
  homework.value = router.currentRoute.value.params.homework;
  console.log(homework.value)
});
const setScore = (num) => {
  // 设置评分逻辑
};
const cancel = () => {
  // 取消逻辑
  // 获取文本框的引用
  // 清空文本框的值
  comment.value = '';

};
// const submit = () => {
//   // 提交逻辑
// };
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
            <el-card class="box-card" style="margin-left: auto">
              <template #header>
                <div class="card-header" >
                  <span>{{ homework }}课的第{{ homework }}次作业</span>
                  <!--                  <el-button class="button" text>前往</el-button>-->
                  <span v-if="fileUrl" >
                  <a :href="fileUrl" download>点击下载作业</a>
                  </span>
                </div>
                <div class="homework-display">
                  <!-- 在线展示作业内容的区域 -->
                  <span>{{ homework }}课的第{{ homework}}次作业的内容</span>
                </div>
              </template>

              <div class="comment-container vertical-section">

                <div class="comment-section" >
                  <!-- 文字输入框，用于输入作业内容 -->
                  <el-input type="textarea" v-model="comment" :rows="8" size="large" placeholder="请输入你的答案" ref="commentInput"  clearable></el-input>
                  <div class="button-container">
                  <el-upload
                      class="upload-btn"
                      action="/upload"
                      :on-success="handleUploadSuccess"
                      :on-error="handleUploadError"
                      :show-file-list="false"
                      :before-upload="beforeUpload"
                  >
                    <el-button>添加图片</el-button>
                  </el-upload>
                  <el-upload
                      class="upload-btn"
                      action="/upload"
                      :on-success="handleUploadSuccess"
                      :on-error="handleUploadError"
                      :show-file-list="false"
                      :before-upload="beforeUpload"
                  >
                    <el-button>添加文件</el-button>
                  </el-upload>
                  </div>
                </div>
              </div>

            </el-card>
          </el-col>

          <div class="action-buttons">
            <!-- 取消和提交按钮 -->
            <el-button type="default" @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
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
.homework-info-display {
  margin-left: auto;
  margin-bottom: 20px; /* 与作业展示区域的间距 */
  /* 其他可能的样式，如字体大小、颜色等 */
}
.button-container {
  display: flex;

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
