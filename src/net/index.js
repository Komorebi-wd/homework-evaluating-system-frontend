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
            //console.log("成功")
            success(data.data)
        }

        else{
            //console.log("失败")
            failure(data.message, data.code, url)
        }
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

function post(url, data, success, failure = defaultFailure) {
    //他应该是先调post 然后再调interpost
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

function getAllCourses(){
    return new Promise((resolve, reject) => {
        get('/api/student/course/getAll', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);

        });
    });
}

export function showPersonInfo() {
    return new Promise((resolve, reject) => {
        get('/api/test/myDetail', (data) => {
            //console.log("data是什么"+data)
            resolve(data);
        }, (error) => {
            reject(error);

        });
    });
}

export function changeUsername(username) {
    const formData = new FormData();
    formData.append('newName', username);

    return new Promise((resolve, reject) => {
        post('/api/test/changeUsername', formData, (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });

}
export function changeUserPassword(oldPassword,newPassword) {
    const formData = new FormData();
    formData.append('oldPassword', oldPassword);
    formData.append('newPassword', newPassword);

    return new Promise((resolve, reject) => {
        post('/api/test/changePassword', formData, (data) => {
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
        get('/api/student/course/'+cid+'/tHomework/'+thId%10+'/mark/getAll', (data) => {
            console.log("开始查询")
            resolve(data);
            console.log("查询成功")
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

function getMarkWithMid(mid){
    console.log("mid是什么"+mid)
    return new Promise((resolve, reject) => {
        get('/api/student/course/tHomework/sHomework/mark/'+mid, (data) => {
            console.log("开始查询批改作业")
            resolve(data);
            console.log("查询成功")
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

//查询学生在指定课程的所有作业
function showAllHomework(courseId) {
    return new Promise((resolve, reject) => {
        get('/api/student/course/'+courseId+'/tHomework/getAll', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}
//查询老师在指定课程下布置的所有作业
function getThsWithTidCid(cid) {
    return new Promise((resolve, reject) => {
        get('/api/teacher/course/'+cid+'/tHomework/getAll', (data) => {
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

function getAvgTotalScoresWithCidTid(cid) {
    return new Promise((resolve, reject) => {
        get('/api/teacher/course/'+cid+'/getAllScore', (data) => {
            //console.log("开始查询")
            resolve(data);
            //console.log("查询成功")
        }, (error) => {
            reject(error);
        });
    });
}

function getSubmittedAvgScoresWithSidCid(cid){
    return new Promise((resolve, reject) => {
        console.log("开始查询已提交作业分数1")
        get('/api/student/course/'+cid+'/getSubmittedScores', (data) => {
            console.log("开始查询已提交作业分数2")
            resolve(data);
            console.log("查询成功")
        }, (error) => {
            console.log("查询失败")
            reject(error);
        });
    });
}

function getAvgScoreMarkWithSidThId(sid,cid,thId) {
    return new Promise((resolve, reject) => {
        get('/api/teacher/course/'+cid+'/tHomework/'+thId+'/student/'+sid+'/getScore', (data) => {
            resolve(data);
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



//查询学生在指定课程的所有未回复的申诉
function getNSuggestionWithCid(cid) {
    return new Promise((resolve, reject) => {
        get('/api/student/course/'+cid+'/suggestion/getN', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}


//查询学生在指定课程的所有已回复的申诉
function getYSuggestionWithCid(cid) {
    return new Promise((resolve, reject) => {
        get('/api/student/course/'+cid+'/suggestion/getY', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

//查询教师在cid课堂中已回复的申诉
function getTYSuggestionWithCid(cid) {
    return new Promise((resolve, reject) => {
        get('/api/teacher/course/'+cid+'/suggestion/getY', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

//查询教师在cid课堂中未回复的申诉
function getTNSuggestionWithCid(cid) {
    return new Promise((resolve, reject) => {
        get('/api/teacher/course/'+cid+'/suggestion/getN', (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
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

//学生选课
function addScWithSidCid(cid){
    const formData = new FormData();
    formData.append('cid', cid);
    return new Promise((resolve, reject) => {
        post('/api/student/course/addSc', formData, (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
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

function addSuggestionWithCidQ(cid, question) {
    const formData = new FormData();
    formData.append('cid', cid);
    formData.append('question', question);
    return new Promise((resolve, reject) => {
        post('/api/student/course/suggestion/add', formData, (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

function addScoreForTopNStudentWithCidAddScoreNum(cid, addScore, n) {
    const formData = new FormData();
    formData.append('cid', cid);
    formData.append('addScore', addScore);
    formData.append('n', n);
    console.log(cid, addScore, n)
    return new Promise((resolve, reject) => {
        post('/api/teacher/course/score/addScore', formData, (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

function answerSuggestionWithSuggestionIdAnswer(suggestionId, answer) {
    const formData = new FormData();
    formData.append('suggestionId', suggestionId);
    formData.append('answer', answer);
    return new Promise((resolve, reject) => {
        post('/api/teacher/course/suggestion/answer', formData, (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

/**
 * 获取指定课程的所有教师作业
 * @param {number} cid - 课程ID
 * @returns {Promise} - 返回一个Promise对象，成功时包含作业数据，失败时包含错误信息
 * /course/{cid}/tHomework/getAll
 */
function getAllTeacherHomeworks(cid) {
    return new Promise((resolve, reject) => {
        console.log(cid+"进入了getAllTeacherHomeworks方法");
        console.log("获取指定课程的所有教师作业");
        get(`/api/teacher/course/`+cid+`/tHomework/getAll`, (data) => {
            console.log("get方法进去了");
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}
/**
 * 获取指定课程和教师作业的相似作业信息
 * @param {number} cid - 课程ID
 * @param {number} thId - 教师作业ID
 * @returns {Promise} - 返回一个Promise对象，成功时包含相似作业信息，失败时包含错误信息
 */
function getSimilarHomeworks(cid, thId) {
    return new Promise((resolve, reject) => {
        get(`/api/teacher/course/${cid}/tHomework/${(thId)%10}/compare`, (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

/**
 * 修改指定学生在特定课程和作业下的分数
 * @param {number} cid - 课程ID
 * @param {number} thId - 教师作业ID
 * @param {string} sid - 学生ID
 * @param {number} newScore - 新分数
 * @returns {Promise} - 返回一个Promise对象，成功时包含修改成功的信息，失败时包含错误信息
 */
function changeStudentScore(cid, thId, sid, newScore) {
    console.log("进入了changeStudentScore方法");
    console.log("参数分别是"+cid, thId, sid, newScore);
    return new Promise((resolve, reject) => {
        post(`/api/teacher/course/${cid}/tHomework/${(thId)%10}/student/${sid}/changeScore/${newScore}`, {}, (data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}
/**
 * 下载学生的作业
 * @param {number} cid - 课程ID
 * @param {string} sid - 学生ID
 * @param {number} thId - 第x次作业ID
 */
function downloadStudentHomework(cid, sid, thId) {
    return new Promise((resolve, reject) => {
        const url = `/api/teacher/course/${cid}/tHomework/${(thId)%10}/sHomework/student/${sid}/download`;
        getForDownload(url, (response) => {
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
    getAllMarksWithShId,getMyMarksWithCidThId,getMarkWithMid,
    getAllCourses,addScWithSidCid,getAvgTotalScoresWithCidTid,
    getAvgScoreMarkWithSidThId,getThsWithTidCid,getSubmittedAvgScoresWithSidCid,
    addSuggestionWithCidQ,getNSuggestionWithCid,getYSuggestionWithCid,
    getTYSuggestionWithCid,getTNSuggestionWithCid,answerSuggestionWithSuggestionIdAnswer,
    getAllTeacherHomeworks,getSimilarHomeworks,changeStudentScore,downloadStudentHomework,
    addScoreForTopNStudentWithCidAddScoreNum}
