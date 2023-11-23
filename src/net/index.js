import axios from "axios";
import {ElMessage} from "element-plus";

const authItemName = "authorize"

const accessHeader = () => {
    return {
        'Authorization': `Bearer ${takeAccessToken()}`
    }
}

const defaultError = (error) => {
    //console.error(error)
    ElMessage.error('发生了一些错误，请联系管理员')
}

const defaultFailure = (message, status, url) => {
    console.warn(`请求地址: ${url}, 状态码: ${status}, 错误信息: ${message}`)
    ElMessage.warning(message)
}

function takeAccessToken() {
    const str = localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName);
    if(!str) return null
    const authObj = JSON.parse(str)
    if(new Date(authObj.expire) <= new Date()) {
        deleteAccessToken()
        ElMessage.warning("登录状态已过期，请重新登录！")
        return null
    }
    return authObj.token
}

function storeAccessToken(remember, token, expire){
    const authObj = {
        token: token,
        expire: expire
    }
    const str = JSON.stringify(authObj)
    if(remember)
        localStorage.setItem(authItemName, str)
    else
        sessionStorage.setItem(authItemName, str)
}

function deleteAccessToken() {
    localStorage.removeItem(authItemName)
    sessionStorage.removeItem(authItemName)
}

function internalPost(url, data, headers, success, failure, error = defaultError){
    axios.post(url, data, { headers: headers }).then(({data}) => {
        if(data.code === 200)
            success(data.data)
        else
            failure(data.message, data.code, url)
    }).catch(err => error(err))
}

function internalGet(url, headers, success, failure, error = defaultError){
    axios.get(url, { headers: headers }).then(({data}) => {
        if(data.code === 200){
            console.log("成功")
            success(data.data)
        }
            //success(data.data)
            //return data.data;
        else{
            console.log("失败")
            //console.log(data.code,data.data)
            failure(data.message, data.code, url)
        }
            //failure(data.message, data.code, url)
    }).catch(err => error(err))
}





function login(username, password, remember, success, failure = defaultFailure){
    internalPost('/api/auth/login', {
        username: username,
        password: password
    }, {
        'Content-Type': 'application/x-www-form-urlencoded'
    }, (data) => {
        storeAccessToken(remember, data.token, data.expire)
        ElMessage.success(`登录成功，欢迎 ${data.username} 来到我们的系统`)
        success(data)
    }, failure)
}
// function showAllHomework(success, failure = defaultFailure){
//     return new Promise=(resolve,reject)=>{
//
//     }
// }
function post(url, data, success, failure = defaultFailure) {
    internalPost(url, data, accessHeader() , success, failure)
}

function logout(success, failure = defaultFailure){
    get('/api/auth/logout', () => {
        deleteAccessToken()
        ElMessage.success(`退出登录成功，欢迎您再次使用`)
        success()
    }, failure)
}


function showClasses() {
    return new Promise((resolve, reject) => {
        get('/api/student/course/getMyCourses', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);

        });
    });
}

//获取自己被分配的所有待批改作业
function getDistributions() {
    return new Promise((resolve, reject) => {
        get('/api/student/distribution/getAll', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

//查询我的所有提交记录
function getMyMarksWithCidThId(cid,thId){
    return new Promise((resolve, reject) => {
        get('/api/student/course/'+cid+'/tHomework/'+thId+'/mark/getAll', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

//查询指定ShId的被批改记录
function getAllMarksWithShId(shId){
    return new Promise((resolve, reject) => {
        get('/api/student/course/tHomework/sHomework'+shId+'/mark/getAll', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}


function getAllCoursesByTid() {
    return new Promise((resolve, reject) => {
        get('/api/teacher/course/getAll', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}


function showMyClasses() {
    return new Promise((resolve, reject) => {
        get('/api/student/course/getMyCourses', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

function showAllHomework(courseId) {
    return new Promise((resolve, reject) => {
        get('/api/student/course/'+courseId+'/tHomework/getAll', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

function showOneHomework(courseId,thId) {
    return new Promise((resolve, reject) => {
        console.log(courseId,thId)
        get('/api/student/course/'+courseId+'/tHomework/'+thId%10, (data) => {
            console.log("开始查询")
            resolve(data);
            console.log("查询成功")
        }, (error) => {
            reject(error);
        });
    });
}

function getShWithShId(shId) {
    return new Promise((resolve, reject) => {
        console.log(shId)
        console.log("开始查询")
        get('/api/student/course/tHomework/sHomework/'+shId, (data) => {
            console.log("到达此处")
            resolve(data);
            console.log("查询成功")
        }, (error) => {
            reject(error);
            console.log("查询失败")
        });
    });
}



function showAllUnSubmitHomework() {
    return new Promise((resolve, reject) => {
        get('/api/student/tHomework/unSubmit/getAll', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}


function getForDownload(url, success, failure = defaultFailure) {
    internalGetForDownload(url, accessHeader(), success, failure)
}

function internalGetForDownload(url, headers, success, failure, error = defaultError) {
    axios.get(url, {
        headers: headers,
        responseType: 'blob'  // 设置响应类型为 blob
    }).then(response => {
        success(response);
    }).catch(err => error(err));
}
function getFilenameFromContentDisposition(contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename\*=UTF-8''(.+)/) || contentDisposition.match(/filename="(.+)"/);
    if (filenameMatch && filenameMatch.length > 1) {
        return decodeURIComponent(filenameMatch[1]);
    }
    return null;
}

function downloadThWithCidThid(cid, thId) {
    return new Promise((resolve, reject) => {
        const url = `/api/student/course/${cid}/tHomework/${thId%10}/download`;
        getForDownload(url, response => {
            const contentDisposition = response.headers['content-disposition'];
            const filename = getFilenameFromContentDisposition(contentDisposition) || `homework-${cid}-${thId}.ext`;
            const blobUrl = window.URL.createObjectURL(response.data);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename; // 使用后端提供的文件名
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
            resolve('Download successful');
        }, reject);
    });
}

function downloadShWithShId(shId) {
    return new Promise((resolve, reject) => {
        const url = `/api/student/course/tHomework/sHomework/${shId}/download`;
        getForDownload(url, response => {
            const contentDisposition = response.headers['content-disposition'];
            const filename = getFilenameFromContentDisposition(contentDisposition) || `homework-${shId}.ext`;
            const blobUrl = window.URL.createObjectURL(response.data);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename; // 使用后端提供的文件名
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
            resolve('Download successful');
        }, reject);
    });
}

//一键下载所有被分配的待批改作业
function downloadAllDistributions() {
    return new Promise((resolve, reject) => {
        getForDownload('/api/student/distribution/downloadAll', response => {
            const contentDisposition = response.headers['content-disposition'];
            const filename = getFilenameFromContentDisposition(contentDisposition) || 'all-homeworks.zip';
            const blobUrl = window.URL.createObjectURL(response.data);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobUrl);
            console.log('Download successful');
        },reject);
    });
}

function putThWithCidEndDateComment(thId, cid, Date, comment,multipartFile) {
    const formData = new FormData();
    formData.append('thId', thId);
    formData.append('cid', cid);
    formData.append('endDate', Date);
    formData.append('comment', comment);
    formData.append('multipartFile', multipartFile);
    console.log("准备发布的作业已封装好")
    console.log(thId);
    // console.log(cid);
    // console.log(Date);
    // console.log(comment);
    // console.log(multipartFile);
    return new Promise((resolve, reject) => {
        post('/api/teacher/tHomework/upload', formData, (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

function addMarkWithShIdCommentCommentIdScore(shId, comment, score,multipartFile) {
    const formData = new FormData();
    formData.append('shId', shId);
    formData.append('comment', comment);
    formData.append('score', score);
    formData.append('multipartFile', multipartFile);
    console.log("准备发布的作业已封装好")
    console.log(shId);
    console.log(comment);
    console.log(score);
    console.log(multipartFile);
    return new Promise((resolve, reject) => {
        post('/api/student/course/tHomework/sHomework/comment/submit', formData, (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

function submitShWithSidCidThId(cid, thId,comment, multipartFiles) {
    const formData = new FormData();
    formData.append('cid', cid);
    formData.append('thId', thId % 10);
    formData.append('comment', comment);
    // 循环遍历文件数组，将每个文件添加到formData中
    multipartFiles.forEach((file, index) => {
        //formData.append(`multipartFiles[${index}]`, file);
        formData.append('multipartFiles', file);
    });

    console.log("准备提交的文件已封装好");
    console.log(cid, thId, comment,formData);

    return new Promise((resolve, reject) => {
        post('/api/student/course/tHomework/sHomework/submitAll', formData, (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}


function get(url, success, failure = defaultFailure) {
    internalGet(url, accessHeader(), success, failure)
}

function unauthorized() {
    return !takeAccessToken()
}

export { post, get, login, logout,
    unauthorized,showClasses,showMyClasses,showAllHomework,
    showAllUnSubmitHomework,showOneHomework,downloadThWithCidThid,
    submitShWithSidCidThId,getAllCoursesByTid,getDistributions,
    putThWithCidEndDateComment,addMarkWithShIdCommentCommentIdScore,
    getShWithShId,downloadShWithShId,downloadAllDistributions,
    getAllMarksWithShId,getMyMarksWithCidThId}
