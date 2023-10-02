// pages/consulate/consulate.js
import http from '../../utils/api'; // 引入api接口管理文件
let eventChannel; 

Page({
  data: {
    title: "问诊",
    // name: "医生",
    did: ""
  },

  consulate: function(e){
    http.case_info({
      data:{ },
      success :(res) =>{
        console.log(res.data.data);
        if (!res.data.data.avatar) {
          wx.showModal({
            title: '温馨提示',
            content: '授权才可咨询',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '/pages/me/me'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else if (!res.data.data.name) {
          wx.showModal({
            title: '温馨提示',
            content: '注册才可问诊',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '/pages/case_add/case_add'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          let info= e.detail.value;
          console.log(info);
          //判断提交数据是否合理
          if(e.detail.value.title.length == 0){ 
            wx.showToast({
              title: '请输入标题',
              icon: 'error',
              duration: 2000,
            })
          }
          else if(e.detail.value.questionContent.length ==0){ 
            wx.showToast({
              title: '问题内容\n不能为空',
              icon: 'error',
              duration: 2000,
            })
          }else{
            http.consulate({
              data: {
                did: this.data.did,
                title: e.detail.value.title,
                questionContent: e.detail.value.questionContent,
              },
            
              success:(res) =>{
                console.log(res.data.data)
                if(res.data.data){
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 1000,
                    success:(res) =>{
                      setTimeout(function (){
                        wx.navigateBack()
                      },500)
                    }
                  }) 
                }
                else{
                  wx.showToast({
                    title: '提交失败',
                    icon: 'error',
                    duration: 2000,
                  }) 
                }
              } 
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // ios设备上textarea有默认padding，故在此判断机型
    var phone = wx.getSystemInfoSync();  //调用方法获取机型
    var that = this;
    if (phone.platform == 'ios') {
      that.setData({
        isIos: true
      });
    } else if (phone.platform == 'android') {
      that.setData({
        isIos: false
      });
    }

    var that = this;
    // console.log(that.data.detail)
    eventChannel = this.getOpenerEventChannel(); 
		eventChannel.on("getParam",function(data){
      console.log(data.data[0]);//传递过来的参数
      that.setData({
        'name': data.data[0],
        'did': data.data[1]
      })
    })
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