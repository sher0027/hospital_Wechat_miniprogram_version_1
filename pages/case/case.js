// pages/case/case.js
import http from '../../utils/api'; // 引入api接口管理文件
var util = require('../../utils/util.js');

Page({
  data: {
    patientInfo: {
      name: "未注册",
      realPatientId: "未注册",
      genderString: "未注册",
      birthdayString: util.formatTime(new Date())
    },
    caseList: [
      // {consultationDatetimeString: "就诊日期就诊日期", operationDatetimeString: "手术日期手术日期", treatment: "治疗方式治疗方式", consultationImg:"/images/show_info.png", xrayImg: "/images/show_info.png"}
    ],
  },

  register: function (options) {
    wx.navigateTo({
      url: '/pages/case_add/case_add',
    })
  },

  edit: function (options) {
    wx.navigateTo({
      url: '/pages/case_add/case_add',
    })
  },

  consulation_add: function (options) {
    wx.navigateTo({
      url: '/pages/consulation_add/consulation_add',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    http.case_info({
      data:{ },
      success :(res) =>{
        console.log(res.data.data.name);
        if(res.data.data.name){
          this.setData({
            'patientInfo': res.data.data,
          })
        }else{

        }
      }
    })
    http.case_list({
      data:{ },
      success :(res) =>{
        // console.log(res.data.data.pageList.length);
        if(res.data.data.pageList.length){
          this.setData({
            'caseList': res.data.data.pageList,
          })
        }
        else{}
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})