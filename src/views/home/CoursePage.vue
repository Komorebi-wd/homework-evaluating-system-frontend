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

          <el-scrollbar max-height="100vh" style="width: 700px;height: 100vh">
            <div class="scrollbar-demo-item" v-for="item in classes">
              <el-icon><Document /></el-icon>
              {{item.cname}}
              <el-button type="primary" @click="getClasses()" style="margin-left: auto">前往作业</el-button>
            </div>

          </el-scrollbar>
          <el-calendar style="width: 600px;height: 550px" class="my-calendar" v-model="value" />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from "@/views/elements/Header.vue";
import Sider from "@/views/elements/Sider.vue";
import {onMounted, ref} from 'vue'
import {Document} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {showClasses} from "@/net";
const count = ref(15)
var classes=['1']

function getClasses(){
    showClasses()
        .then((data) => {
          classes = data;
          console.log(classes)
          window.location.reload();
        })
        .catch((error) => {
          //console.error(error);
        });
}

//
// onMounted(() => {
//   getClasses()
// });


// function showClasses() {
//     axios.get('http://localhost:8080/api/student/course/getAll').then(function (resp) {
//     classes=resp.data;
//   })
// }






// new Vue({
//   el:"#get_class_list",
//   data: {
//     class_list: []
//   },
//   methods:{
//     GetHostData:function(){
//       var that=this;
//       axios.get('http://localhost:8081/book/getAll').then(function (resp) {
//         that.class_list=resp.data;
//       })
//     }
//   },
//   mounted:function () {   //自动触发写入的函数
//     this.GetHostData();
//   }
// })


// axios.get("http://localhost:8080/mem/findbyid/" + this.sno).then((resp) => {
//   console.log(resp);
// });


</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
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






