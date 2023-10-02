// pages/me/me.js
import http from '../../utils/api'; // 引入api接口管理文件
var util = require('../../utils/util.js');


Page({
  data: { 
    userInfo: {
      name: '未注册',
      avatar: '/images/me_1.png',
      birthdayString: util.formatTime(new Date())
    },
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  wxGetUserProfile: function () {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '用户登录',
        success: (res) => {
          // console.log('userProfile获取userInfo')
          // console.log(res);
          this.setData({
            // userInfo: res.userInfo,
            hasUserInfo: true
          })
          resolve(res) 
          
          wx.showToast({ //显示消息提示框
            icon: "success",
            title: '欢迎使用',
            duration: 2000, 
          })
        },
        // 失败回调
        fail: (err) => {
          reject(err)
          wx.showToast({ //显示消息提示框
            icon: "error",
            title: '小程序\n需要授权',
            duration: 1500,
            success:(res) =>{
              setTimeout(function (){
                wx.navigateBack()
              },500)
            } 
          })
        }
      })
    })
  },

  wxSilentLogin: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success :(res) =>{
          // console.log('login获取code')
          // console.log(res);
          resolve(res.code)// jsCode
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },

  login: function (e) {
    var that = this;
    if (that.data.userInfo.avatar == '/images/me_1.png') {
      let p1 = this.wxSilentLogin()
      let p2 = this.wxGetUserProfile()
      Promise.all([p1, p2]).then((res) => {
        console.log(res);
        let jsCode = res[0]
        wx.setStorageSync('iv', res[1].iv);
        wx.setStorageSync('encryptedData', res[1].encryptedData);
        // 请求服务器
        http.login({
          data: { //前端向后端发送的数据（后：前）
            jsCode: jsCode,
          },
          success :(res) =>{
            // console.log(res);
            // // //登录成功将后端返回的token存储到本地缓存中
            // wx.setStorageSync('token', res.data.data);
            // console.log(wx.getStorageSync('token'));
            that.getavatar();
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  },

  getavatar(){
    console.log('你好')
    let iv = wx.getStorageSync('iv')
    let encryptedData = wx.getStorageSync('encryptedData')
    http.avatar({
      data: {
        iv: iv,
        encryptedData: encryptedData
      },
      success :(res) =>{
        console.log(res.data);
        wx.removeStorageSync('iv');
        wx.removeStorageSync('encryptedData');
      }
    })
    http.case_info({
      data:{ },
      success :(res) =>{
        console.log(res.data.data);
        if(res.data.data.avatar){
          this.setData({
            'userInfo.avatar': res.data.data.avatar,
          })
        }else{}
      }
    })
  },

  edit: function (options) {
    wx.navigateTo({
      url: '/pages/case_add/case_add',
    })
  },

  record: function (options) {
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },

  share: function (options) {
    wx.navigateTo({
      url: '/pages/share/share',
    })
  },

  about: function (options) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    console.log(wx.getStorageSync('token'));
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    http.case_info({
      data:{ },
      success :(res) =>{
        console.log(res.data.data);
        if(res.data.data.avatar){
          this.setData({
            'userInfo': res.data.data,
          })
          if(res.data.data.name){
          }else{
            this.setData({
              'userInfo.name': '未注册',
            })
          }
        }else{}
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
})