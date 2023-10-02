// 在这里面定义所有接口，一个文件管理所有接口，易于维护
import { http } from './http'; // 引入刚刚封装好的http模块，import属于ES6的语法，微信开发者工具必须打开ES6转ES5选项


function login(params) { // 登录接口
  http('/mini/login', 'GET', params)
}

function upload(params) { // 问医生接口
  http('/common/img', 'POST', params)
}

function banners(params) { // 获取滑动海报接口
  http('/mini/banners?pageIndex=1&pageSize=5', 'GET', params)
}

function consulation(params) { // 获取咨询接口
  http('/mini/medicalTweets?pageIndex=1&pageSize=5', 'GET', params)
}

function success(params) { // 获取成功案例接口
  http('/mini/searchMedicalTweetOfSuccess?pageIndex=1&pageSize=5', 'GET', params)
}

function science(params) { // 获取科普知识接口
  http('/mini/searchMedicalTweetOfScience?pageIndex=1&pageSize=5', 'GET', params)
}

function search(params) { // 搜索
  http('/mini/searchMedicalTweet?pageIndex=1&pageSize=5', 'GET', params)
}

function doctor_list(params) { // 获取团队成员接口
  http('/mini/doctors', 'GET', params)
}

function consulate(params) { // 问医生接口
  http('/mini/askDoctor', 'POST', params)
}

function example_list(params) { // 获取问答接口
  http('/mini/patientQuestions?pageIndex=1&pageSize=6', 'GET', params)
}

function example_list_all(params) { // 获取问答接口
  http('/mini/patientQuestions?pageIndex=1&pageSize=32767', 'GET', params)
}

function example_detail(params) { // 问答详情接口
  http('/mini/patientQuestionDetail', 'GET', params)
}

function doctor_detail(params) { // 医生详情接口
  http('/mini/doctorDetail', 'GET', params)
}

function case_post(params) { // 新增病例接口
  http('/mini/medicalRecord', 'POST', params)
}

function treatmentList(params) { // 咨询记录接口
  http('/mini/allTreatments', 'GET', params)
}

function case_list(params) { // 病例列表接口
  http('/mini/medicalRecords?pageIndex=1&pageSize=5', 'GET', params)
}

function case_info(params) { // 病人信息接口
  http('/mini/myPatientInfo', 'GET', params)
}

function edit(params) { // 修改信息接口
  http('/mini/myPatientInfo', 'PUT', params)
}

function record(params) { // 咨询记录接口
  http('/mini/myPatientQuestions?pageIndex=1&pageSize=5', 'GET', params)
}

function avatar(params) { // 更新头像接口
  http('/mini/myPatientAvatar', 'PUT', params)
}

function poster(params) { // 获取海报接口
  http('/mini/reportUrl', 'GET', params)
}



// 每一个接口定义一个函数，然后暴露出去，供逻辑代码调用
export default { // 暴露接口
  login,
  upload,
  banners,
  consulation,
  success,
  science,
  search,
  doctor_list,
  consulate,
  example_list,
  example_list_all,
  example_detail,
  doctor_detail,
  case_post,
  treatmentList,
  case_list,
  case_info,
  edit,
  record,
  avatar,
  poster
}