<template>
  <div class="common-layout">
    <el-container>

      <el-header style="display: flex; grid-template-columns: 1fr auto;">
        <!--        <Header />-->
        <h1>{{courseName}}</h1>
        <h5 style="font-size: large;text-align: center;flex: 1">同伴作业互评系统</h5>
        <div style="display: flex; justify-content: flex-end; align-items: center;">
          <el-button type="default" @click="cancel">返回</el-button>
          <el-button type="primary" @click="dialogVisible=true">用户中心</el-button>
          <el-button type="info" @click="userLogout">退出登录</el-button>
        </div>

      </el-header>
      <el-dialog
          v-model="dialogVisible"
          title="用户信息"
          width="40%"
      >
        <!--    <div v-for="(info, index) in personInfo" :key="index">-->
        <p class="user-info">身份：{{ personInfo.role }}</p>
        <div class="change-Username">
          <p class="user-info">用户名：{{ personInfo.username }}</p>
          <el-button style="margin-top: 20px;margin-left: 5px" type="primary"  @click="changeName">
            修改用户名
          </el-button>
        </div>

        <p class="user-info">邮箱：{{ personInfo.email }}</p>
        <!-- 其他需要展示的信息 -->
        <!--      </div>-->
        <template #footer>
          <el-button type="primary" @click="changePassword">修改密码</el-button>
          <span class="dialog-footer">
        <el-button @click="dialogVisible = false">返回</el-button>
        <el-button type="success" @click="dialogVisible = false">
          确认
        </el-button>
      </span>
        </template>
      </el-dialog>
      <el-container>
        <el-aside width="200px">

          <Sider />
        </el-aside>

        <el-main style="display:flex">
          <div v-if="loading" style="display: flex; height: 100%; width: 100%;">
            <p>加载中...</p>
          </div>
          <div style="height: 700px; width: 100%; overflow-y: auto;" >
          <!--列表显示速度正常-->
          <el-table :data="displayScores" v-loading="loading" stripe style="width: 100%" :row-style="{ height: '100px' }">

            <!-- 姓名列 -->
            <el-table-column label="教师号" width="280">
              <template #default="scope">
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                  <el-icon><Document /></el-icon>
                  <span >{{ scope.row.tid }}</span>
                </div>
              </template>
            </el-table-column>

            <!-- 成绩得分列 -->
            <el-table-column label="作业序次" width="150">
              <template #default="scope">
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                  <!--                  <el-icon><Document /></el-icon>-->
                  <span >{{ (scope.row.thId)%10 }}</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="作业名" width="380">
              <template #default="scope">
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                  <!--                  <el-icon><Document /></el-icon>-->
                  <span >{{ (scope.row.fileName) }}</span>
                </div>
              </template>
            </el-table-column>


            <!-- 学号列 -->
            <el-table-column label="备注" width="350">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-icon><Timer /></el-icon>
                  <span  >{{ scope.row.comment }}</span>
                </div>
              </template>
            </el-table-column>

            <!-- 详细成绩列 -->
            <el-table-column label="查重" width="280">
              <template #default="scope">
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                  <!--                  <el-icon><Document /></el-icon>-->
                  <span >
                     <el-button type="primary" @click="promptSimilarityThreshold(scope.row.cid,scope.row.thId)">进行查重</el-button>
                  </span>
                </div>
              </template>
            </el-table-column>

          </el-table>
          <!-- 分页控件 -->
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
import Sider from "@/views/elements/Sider.vue";
import {Document, Timer} from "@element-plus/icons-vue";
import router from "@/router";
import { onMounted, ref} from "vue";
import {
  showAllHomework,
  getAvgTotalScoresWithCidTid,
  showPersonInfo,
  changeUsername,
  changeUserPassword,
  getAllTeacherHomeworks, getSimilarHomeworks
} from "@/net";
import {ElMessageBox} from "element-plus";

const courseId = ref(0);
const courseName = ref('');
const Scores= ref([]);
const personInfo = ref([]);
const dialogVisible = ref(false);
const currentPage = ref(1); // 当前页码
const pageSize = ref(5); // 每页显示的条目数
const totalItems = ref(0); // 总条目数
const displayScores = ref([]); // 当前页显示的数据
const loading = ref(false); // 控制加载状态
const cancel = () => {
  router.go(-1); // 后退到上一个页面
};
function promptSimilarityThreshold(courseId, thId) {
  ElMessageBox.prompt('请输入相似度阈值（0-100）', '设置阈值', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[0-9]{1,2}$/,
    inputErrorMessage: '无效的阈值（必须是0到100之间的整数）'
  }).then(({ value }) => {
    findSimilarity(courseId, thId, value);
  }).catch(() => {
    console.log("用户取消输入");
  });
}

function findSimilarity(courseId,thId, similarityThreshold) {
  similarityThreshold = parseInt(similarityThreshold); // 确保阈值是整数
  if (isNaN(similarityThreshold) || similarityThreshold < 0 || similarityThreshold > 100) {
    ElMessageBox.alert('请输入有效的阈值（0-100之间的整数）', '无效阈值', {
      confirmButtonText: '确定'
    });
    return;
  }
  getSimilarHomeworks(courseId, thId)
      .then((data) => {
        console.log(data);

        // 过滤出超过阈值的记录
        const highSimilarityResults = data.filter(item => item.value > similarityThreshold);

        if (highSimilarityResults.length > 0) {
          // 格式化显示信息
          let message = "检测结果如下：<br/>";
          highSimilarityResults.forEach(item => {
            message += `学生一：${item.sid1}, 与其最相似的学生：${item.sid2}, 相似度：${item.value}%<br/>`;
          });

          // 显示格式化后的信息
          ElMessageBox.alert(message, '查重结果', {
            dangerouslyUseHTMLString: true,  // 允许使用HTML字符串
            confirmButtonText: '确定',
            callback: action => {
              // 可以在这里添加用户确认后的操作
            }
          });
        } else {
          // 如果没有超过阈值的记录，则提示用户
          ElMessageBox.alert('没有找到超过阈值的相似作业', '查重结果', {
            confirmButtonText: '确定'
          });
        }
      })
      .catch((error) => {
        console.error(error);
        ElMessageBox.alert('查重时发生错误，请稍后再试', '错误', {
          confirmButtonText: '确定'
        });
      });

}
function getPersonInfo() {
  showPersonInfo()
      .then((data) => {
        personInfo.value = data;
        console.log(personInfo.value);
      })
      .catch((error) => {
        console.error(error);
      });
}
function changeName() {
  console.log("修改用户名")
  ElMessageBox.prompt('请输入新的用户名，修改之后需要重新登陆', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /\S+/,
    inputErrorMessage: '用户名不能为空'
  }).then(({ value }) => {
    console.log(value);
    changeUsername(value)
        .then((data) => {
          console.log(data);
          userLogout();
          //getPersonInfo()
        })
        .catch((error) => {
          console.error(error);
        });
  }).catch(() => {
    console.log("取消修改用户名")
  });
}
function changePassword() {
  console.log("修改密码");
  ElMessageBox.prompt('请输入旧密码', '提示', {
    confirmButtonText: '下一步',
    cancelButtonText: '取消',
    inputPattern: /\S+/,
    inputErrorMessage: '密码不能为空'
  }).then(({ value: oldPassword }) => {
    ElMessageBox.prompt('请输入新密码，修改之后需要重新登陆', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /\S+/,
      inputErrorMessage: '密码不能为空'
    }).then(({ value: newPassword }) => {
      console.log(`旧密码: ${oldPassword}, 新密码: ${newPassword}`);
      changeUserPassword(oldPassword, newPassword)
          .then((data) => {
            console.log(data);
            userLogout();
            //getPersonInfo();
          })
          .catch((error) => {
            console.error(error);
            ElMessageBox.alert(error.message, '错误,旧密码不匹配', {
              confirmButtonText: '确定'
            });
          });
    }).catch(() => {
      console.log("取消输入新密码");
    });
  }).catch(() => {
    console.log("取消输入旧密码");
  });
}

onMounted(() => {
  //console.log("onMounted")
  getPersonInfo()
  courseId.value = router.currentRoute.value.query.cid;
  courseName.value = router.currentRoute.value.query.cname;
  getTeacherHomework()
});

function userLogout() {
// 删除 token
  localStorage.removeItem('token'); // 假设 token 存储在 localStorage
  // 或者如果使用 Vuex, 可以 dispatch 一个 action 来清除 token

  // 路由跳转到首页或登录页
  router.push('/'); // 假设 '/' 是首页或登录页的路由
}

function getTeacherHomework() {
  loading.value = true;
  getAllTeacherHomeworks(courseId.value)
      .then((data) => {
        // console.log(data);
        loading.value = false;
        totalItems.value = data.length;
        Scores.value = data;
        updateDisplayScores(); // 更新显示的数据
      })
      .catch((error) => {
        loading.value = false;
        console.error(error);
      });
}

// 更新当前页显示的数据
function updateDisplayScores() {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  displayScores.value = Scores.value.slice(start, end);
}
function handlePageChange(newPage) {
  currentPage.value = newPage;
  updateDisplayScores();
}


const goToPage = (cid,sid)  => {
  router.push({
    path: '/detectionDetails',
    query: {
      sid: sid,
      cid: cid
    }
  });
};

</script>


<style scoped>
/* 居中分页按钮 */
.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* 根据需要调整间距 */
}
.dialog-footer button:first-child {
  margin-left: 20px;
  margin-right: 10px;
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
.my-calendar {
  border: 2px solid #ccc;
  border-radius: 2px;
  background-color: lightskyblue;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>