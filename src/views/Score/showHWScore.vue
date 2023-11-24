<script setup>
import Sider from "@/views/elements/Sider.vue";
import {Document, Timer} from "@element-plus/icons-vue";
import router from "@/router";
import { onMounted, ref} from "vue";
import {showAllHomework, downloadThWithCidThid, showPersonInfo, changeUsername, changeUserPassword} from "@/net";
import {ElMessageBox} from "element-plus";

const courseId = ref(0);
const courseName = ref('');
const works= ref([]);
onMounted(() => {
  courseId.value = router.currentRoute.value.query.cid;
  courseName.value = router.currentRoute.value.query.cname;
  getClasses()
});

const personInfo = ref([]);
const dialogVisible = ref(false);
const cancel = () => {
  router.go(-1); // 后退到上一个页面
};
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
  console.log("onMounted")
  getPersonInfo()
});

function userLogout() {
// 删除 token
  localStorage.removeItem('token'); // 假设 token 存储在 localStorage
  // 或者如果使用 Vuex, 可以 dispatch 一个 action 来清除 token

  // 路由跳转到首页或登录页
  router.push('/'); // 假设 '/' 是首页或登录页的路由
}
function getClasses(){
  showAllHomework(courseId.value)
      .then((data) => {
        works.value = data;
         console.log(works);
      })
      .catch((error) => {
      });
}
function sortWorksByDate() {
  new Promise((resolve, reject) => {
    try {
      console.log("排序")
      const sorted = [works].sort((a, b) => new Date(b.endTime) - new Date(a.endTime));
      resolve(sorted);
    } catch (error) {
      reject(error);
    }
  })
      .then((sortedData) => {
        this.sortedWorks = sortedData;
      })
      .catch((error) => {
        console.error('排序出错:', error);
      });
}

function downloadTh(cid, thId) {
  console.log("下载作业");
  downloadThWithCidThid(cid, thId)
      .then((message) => {
        console.log(message);
      })
      .catch((error) => {
        console.error('Download failed', error);
      });
}



const goToPage = (cid,thId)  => {
  router.push({
    path: '/submitStuHomework',
    query: {
      cid: cid,
      thId: thId,
      cname: courseName.value
    }
  });
};

</script>

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
          <!--          <div class="scrollbar+card">-->
          <!--          <el-card class="box-card" style="margin-left: 10px" >-->
          <!--              <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">-->
          <!--                作业列表-->
          <!--              </div>-->
          <!--          </el-card>-->
          <!--          <el-scrollbar max-height="100vh" style="width: 700px;height: 100vh">-->

          <!--            <div class="scrollbar-demo-item" v-for="item in works" style="display: flex; justify-content: space-between; align-items: center;">-->
          <!--              <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">-->
          <!--                <el-icon><Document /></el-icon>-->
          <!--                {{item.fileName}}-->
          <!--              </div>-->
          <!--              <div>-->
          <!--                <el-button type="primary" @click="downloadTh(item.cid,item.thId)">下载</el-button>-->
          <!--                <el-button type="primary" @click="goToPage(item.cid,item.thId)">提交</el-button>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </el-scrollbar>-->
          <el-table :data="works" stripe style="width: 100%">
            <!-- 截止日期列 -->
            <el-table-column label="截止日期" width="250">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-icon><Timer /></el-icon>
                  <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
                </div>
              </template>
            </el-table-column>

            <!-- 文件名列 -->
            <el-table-column label="文件名" width="380">
              <template #default="scope">
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                  <el-icon><Document /></el-icon>
                  <span style="margin-left: 10px">{{ scope.row.fileName }}</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="学生" width="380">
              <template #default="scope">
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
<!--                  <el-icon><Document /></el-icon>-->
                  <span style="margin-left: 10px">{{ "21301055" }}</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="得分" width="380">
              <template #default="scope">
                <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 60%;">
                  <!--                  <el-icon><Document /></el-icon>-->
                  <span style="margin-left: 10px">{{ Math.floor(Math.random() * 101) }}</span>
                </div>
              </template>
            </el-table-column>


          </el-table>

<!--          <el-table :data="personInfo" stripe style="width: 100%">-->
<!--            &lt;!&ndash; 学生姓名列 &ndash;&gt;-->
<!--            <el-table-column label="学生姓名" width="200">-->
<!--              <template #default="scope">-->
<!--                <span>{{ scope.row.username}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            &lt;!&ndash; 成绩得分列 &ndash;&gt;-->
<!--            <el-table-column label="成绩得分" width="200">-->
<!--              <template #default="scope">-->
<!--                <span>{{ scope.row.score }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--          </el-table>-->

          <!--          </div>-->
<!--          <el-calendar style="width: 600px;height: 550px" class="my-calendar" v-model="value" >-->
<!--          </el-calendar>-->

        </el-main>

      </el-container>
    </el-container>

  </div>
</template>

<style scoped>
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