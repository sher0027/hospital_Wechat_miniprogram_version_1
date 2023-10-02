// pages/success/success.js
import http from '../../utils/api'; // 引入api接口管理文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "成功案例", // 导航栏标题
  },

  detail: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.index)
    // console.log(Object.keys(e.currentTarget.dataset).length)
    
    wx.navigateTo({
      url: '/pages/webview/webview',
      success: function(res){
        res.eventChannel.emit('getParam', { data: that.data.successList[e.currentTarget.dataset.index].mpUrl })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.success({
      data: {},
      success:(res) =>{
        console.log(res.data)
        this.setData({
          'successList': res.data.data.pageList,
        })
        console.log(this.data.successList)
      }
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