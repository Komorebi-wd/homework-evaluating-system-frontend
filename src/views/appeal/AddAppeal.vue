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

        <el-main style="display: flex">

          <div class="container">
            <el-input style="width: 600px"
                      v-model="textarea"
                      :rows="20"
                      type="textarea"
                      placeholder="请输入申诉理由："
            />
            <div >
              <el-button type="primary" @click="submitAppeal">提交申诉</el-button>
              <el-button type="success" @click="submitCancel">取消申诉</el-button>
            </div>
          </div>



          <el-calendar style="width: 600px;height: 650px" class="my-calendar" v-model="value" />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import router from "@/router";
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import {onMounted, ref} from 'vue'
import {Document} from "@element-plus/icons-vue";
import {addSuggestionWithCidQ} from "@/net";
import {ElMessage} from "element-plus";


const goToPage = (path) => {
  router.push(path).then(() => {
  });
}
const textarea = ref('')
const cid = ref(0);
const cname = ref('');


onMounted(() => {
   cid.value = router.currentRoute.value.query.cid;
   cname.value = router.currentRoute.value.query.cname;

})

const submitAppeal = () => {
  addSuggestionWithCidQ(cid.value,textarea.value)
      .then((data) => {
        console.log(data)
        ElMessage.success("提交成功")
      })
      .catch((error) => {
        console.error(error);
      });
}

</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: start; /* 从左侧开始排列内容 */
  height: 50px;
  margin: 10px;
  padding-left: 20px; /* 增加左侧内边距以避免遮挡 */
  text-align: left; /* 文字对齐到左侧 */
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  overflow: hidden; /* 防止内容溢出 */
  white-space: nowrap; /* 避免文字换行 */
}

.el-icon {
  margin-right: 10px; /* 为图标和文字之间添加间隙 */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-scrollbar {
  width: calc(100% - 240px); /* 调整滚动条宽度以适应侧边栏 */
  height: 100vh;
  overflow-x: hidden; /* 隐藏水平滚动条 */
}

.my-calendar {
  border: 2px solid #ccc;
  border-radius: 2px;
  background-color: lightskyblue;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>






