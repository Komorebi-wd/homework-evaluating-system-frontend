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
          <div v-if="loading" style="display: flex; height: 100%; width: 100%;">
            <p>加载中...</p>
          </div>
          <div style="height: 700px; width: 1500px; overflow-y: auto;" >
          <el-table :data="displayWorks" v-loading="loading" style="width: 100% ;font-size: 17px" :row-style="{ height: '90px' }">
            <el-table-column prop="fileName" label="教师作业名称"></el-table-column>
            <el-table-column  v-loading="loading" prop="score" label="学生作业分数"></el-table-column>
            <!-- 新增的下载文件列 -->
            <el-table-column label="下载学生作业">
              <template #default="scope">
                <el-button type="primary" size="default" @click="downloadFile(cid, sid, scope.row.thId)">下载</el-button>
              </template>
            </el-table-column>
            <el-table-column label="修改学生成绩">
              <template #default="scope">
                <el-button type="success" size="default" @click="requestNewScoreAndEdit(cid, sid, scope.row.thId)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalItems">
          </el-pagination>
          </div>
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
import {getThsWithTidCid, getAvgScoreMarkWithSidThId, changeStudentScore,downloadStudentHomework} from "@/net";
import {ElMessageBox} from "element-plus";

// 定义响应式变量来保存课程列表
const scoreList = ref([]);
const cid = ref(0);
const works=ref([]);
const sid = ref(0);
const currentPage = ref(1); // 当前页码
const pageSize = ref(5); // 每页显示的条目数
const totalItems = ref(0); // 总条目数
const displayWorks = ref([]); // 当前页显示的数据
const loading = ref(false); // 控制加载状态
function downloadFile(cid, sid, thId) {
  console.log('downloadFile: ' + cid);
  downloadStudentHomework(cid, sid, thId)
      .then((data) => {
        console.log(data);
        if (data) {
          ElMessageBox.alert('下载成功', '操作结果', {
            confirmButtonText: '确定'
          });
        } else {
          ElMessageBox.alert('下载失败', '操作结果', {
            confirmButtonText: '确定'
          });
        }
      })
      .catch((error) => {
        console.error(error);
        ElMessageBox.alert('下载时发生错误', '错误', {
          confirmButtonText: '确定'
        });
      });
}
function requestNewScoreAndEdit(cid, sid, thId) {
  console.log('cid: ' + cid);
  console.log('sid: ' + sid);
  console.log('thId: ' + thId);
  // 请求输入新分数
  ElMessageBox.prompt('请输入新的分数', '修改分数', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValidator: (value) => {
      // 验证输入是否为有效的分数
      if (value !== null && !isNaN(value) && value >= 0 && value <= 100) {
        return true;
      } else {
        return '请输入一个介于0到100之间的有效数字';
      }
    },
    inputErrorMessage: '无效的分数'
  }).then(({ value }) => {
    // 获取到新分数后调用 editScore 方法进行修改
    console.log('新分数为: ' + value);
    console.log('index: ' + thId);
    console.log('cid: ' + cid);
    console.log('sid: ' + sid);
    editScore(cid, sid, thId, parseFloat(value));
  }).catch(() => {
    console.log('取消修改分数');
  });
}

function editScore(cid, sid, thId, newScore) {
  console.log("cid sid"+cid+" "+sid)
  changeStudentScore(cid, thId ,sid, newScore)
      .then((data) => {
        // console.log(data);
        if (data) {
          ElMessageBox.alert('修改成功', '操作结果', {
            confirmButtonText: '确定'
          });
        } else {
          ElMessageBox.alert('修改失败', '操作结果', {
            confirmButtonText: '确定'
          });
        }
      })
      .catch((error) => {
        console.error(error);
        ElMessageBox.alert('修改时发生错误', '错误', {
          confirmButtonText: '确定'
        });
      });
}
function getAvgScore(thId, index) {
  // loading.value = true;
  getAvgScoreMarkWithSidThId(sid.value, cid.value, thId)
      .then((data) => {
        console.log("第" + thId + "次作业的分数为：" + data);
        loading.value = false;
        displayWorks.value[index].score = data; // 更新分数
      })
      .catch((error) => {
        loading.value = false;
        console.error(error);
      });
}


function getScoreList(){
    for (let i = 0; i < works.value.length; i++) {
      // console.log("getlist里面"+works.value[i].thId)
    getAvgScore(works.value[i].thId%10)
  }
}


function getAllWorks() {
  loading.value = true;
  getThsWithTidCid(cid.value)
      .then((data) => {
        loading.value = false;
        works.value = data;
        totalItems.value = data.length;
        updateDisplayWorks(); // 更新显示的数据
      })
      .catch((error) => {
        loading.value = false;
        console.error(error);
      });
}

function updateDisplayWorks() {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  displayWorks.value = works.value.slice(start, end).map(work => ({ ...work, score: null })); // 初始化分数为null

  // 获取当前页面的作业分数
  for (let i = 0; i < displayWorks.value.length; i++) {
    getAvgScore(displayWorks.value[i].thId % 10, i);
  }
  loading.value = false;
}


function handlePageChange(newPage) {
  currentPage.value = newPage;
  updateDisplayWorks();
}

//在页面加载前获取课程信息
onMounted(() => {
  cid.value = router.currentRoute.value.query.cid;
  sid.value = router.currentRoute.value.query.sid;
  getAllWorks()
});

</script>

<style scoped>
.ellipsis-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 400px; /* 可以根据需要调整最大宽度 */
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px; /* 增加左侧内边距以避免遮挡 */
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* 根据需要调整间距 */
}
.my-calendar {
  border: 2px solid #ccc;
  border-radius: 2px;
  background-color: lightskyblue;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>



