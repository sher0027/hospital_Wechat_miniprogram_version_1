// pages/introduction/introduction.js
import http from '../../utils/api'; // 引入api接口管理文件

Page({
  data: {
    doctorList:[
      // {avatar:'/images/me_1.png', name:"医生", job:"副主任医生", duty:"硕士生导师", disease:"擅长各种疾病擅长各种疾病擅长各种疾病擅长各种疾病", skills:"擅长各种技术擅长各种技术擅长各种技术擅长各种技术" }
    ],
    exampleList: [
      // {questionContent:"测试问题测试问题测试问题测试问题", replyContent:"测试回答测试回答测试回答测试回答测试回答测试回答测试回答测试回答测试回答测试回答测试回答测试回答测试回答"},
      // {questionContent:"测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题", replyContent:"测试回答测试回答测试回答测试回答测试回答测试回答测试回答测试回答测试回答"},
      // {questionContent:"测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题", replyContent:"测试回答测试回答测试回答"}
    ],
  },

  introduction_detail: function (e) {
    console.log(e)
    var idx = e.currentTarget.dataset.index;
    var that = this;
    console.log(that.data.doctorList[idx].did);
    if(e.target.offsetTop == 6 && e.target.offsetLeft == 13){
      wx.navigateTo({
        url: '/pages/consulate/consulate',
        success: function(res){
        res.eventChannel.emit('getParam', { data: [that.data.doctorList[idx].name, that.data.doctorList[idx].did] })
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/introduction_detail/introduction_detail',
        success: function(res){
        res.eventChannel.emit('getParam', { data: that.data.doctorList[idx].did })
        }
      })
    }
  },

  example_list: function (e) {
    wx.navigateTo({
      url: '/pages/example_list/example_list',
    })
  },

  example_detail: function (e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset)
    var idx = e.currentTarget.dataset.index;
    var that = this;
    wx.navigateTo({
      url: '/pages/example_detail/example_detail',
      success: function(res){
        // console.log(that.data.exampleList[idx].pqid)
        res.eventChannel.emit('getParam', { data: that.data.exampleList[idx].pqid })
      }
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
    http.doctor_list({
      data:{ },
      success :(res) =>{
        console.log(res.data.data.pageList);
        this.setData({
          'doctorList': res.data.data.pageList,
        })
      }
    })
    http.example_list({
      data:{ },
      success :(res) =>{
        console.log(res.data.data.pageList);
        this.setData({
          'exampleList': res.data.data.pageList,
        })
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