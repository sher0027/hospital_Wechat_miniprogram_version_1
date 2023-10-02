// pages/introduction_detail/introduction_detail.js
import http from '../../utils/api'; // 引入api接口管理文件
let eventChannel; 

Page({
  data: {
    title: "医生介绍",
    did: '',
    doctorDetail: {
      // disease: "擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病",
      // skills: "擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病擅长疾病",
      // description: "描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
    }
    
  },

  consulate: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/consulate/consulate',
      success: function(res){
      res.eventChannel.emit('getParam', { data: [that.data.doctorDetail.name, that.data.doctorDetail.did] })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(that.data.detail)
    eventChannel = this.getOpenerEventChannel(); 
		eventChannel.on("getParam",function(data){
      console.log(data.data);//传递过来的参数
      that.setData({
        'did': data.data,
      }, () =>{
          console.log(that.data.did)
          let did = that.data.did;
          http.doctor_detail({
            data: {
              did: did
            },success:(res) =>{
              console.log(did)
              console.log(res.data.data)
              that.setData({
                'doctorDetail': res.data.data,
              })
            }
          })
        }
      )
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
    var that = this;
    // console.log(that.data.detail)
    eventChannel = this.getOpenerEventChannel(); 
		eventChannel.on("getParam",function(data){
      console.log(data.data);//传递过来的参数
      that.setData({
        'did': data.data,
      }, () =>{
          console.log(that.data.did)
          let did = that.data.did;
          http.doctor_detail({
            data: {
              did: did
            },success:(res) =>{
              console.log(did)
              console.log(res.data.data)
              that.setData({
                'doctorDetail': res.data.data,
              })
            }
          })
        }
      )
    })
  },

})