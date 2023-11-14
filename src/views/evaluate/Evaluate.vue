<script setup>
import { ref, reactive } from 'vue';
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import {ChatLineSquare} from "@element-plus/icons-vue";

let comment = ref('');
let fileUrl = ref('');

// 从数据库中获取文件链接并设置给fileUrl
fileUrl.value = 'http://www.example.com/path-to-your-file.pdf';
// 假设的作业信息
const homeworkInfo = reactive({
  course: '数学',
  studentName: '张三'
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
const submit = () => {
  // 提交逻辑
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
            <el-card class="box-card" style="margin-left: 60px">
              <template #header>
                <div class="card-header">
                  <span>来自{{ homeworkInfo.studentName }}的{{ homeworkInfo.course }}作业</span>
<!--                  <el-button class="button" text>前往</el-button>-->
                </div>
              </template>
              <div class="homework-display">
                <!-- 在线展示作业内容的区域 -->
                <span v-if="fileUrl">
              <a :href="fileUrl" download>点击下载作业</a>
            </span>
              </div>
            </el-card>
          </el-col>


          <div class="score-comment-container vertical-section">
            <div class="score-section ">
              <!-- 0到10的数字按钮用于选择得分 -->
              <el-button-group>
                <el-button v-for="num in 10" :key="num" @click="setScore(num)">{{ num }}</el-button>
              </el-button-group>
            </div>

            <div class="comment-section">
              <!-- 文字输入框，用于输入评价 -->
              <el-input type="textarea" v-model="comment" placeholder="请输入评价" ref="commentInput"></el-input>
            </div>
          </div>

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
.homework-info-display {
  margin-left: auto;
  margin-bottom: 20px; /* 与作业展示区域的间距 */
  /* 其他可能的样式，如字体大小、颜色等 */
}

.homework-display{
  width: 700px;
  height: 450px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.score-section > .el-button-group > .el-button {
  width: 10%; /* 每个按钮宽度设置为父元素的10%，确保填满整个按钮组 */
}
.score-section, .comment-section {
  margin-top: 10px;
  width: 330px;
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
