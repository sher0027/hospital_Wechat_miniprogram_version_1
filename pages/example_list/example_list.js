// pages/example_list/example_list.js
import http from '../../utils/api'; // 引入api接口管理文件
let eventChannel; 

Page({
  data: {
    title: "查看全部", // 导航栏标题
    exampleList: [
      // {questionContent:"测试问题测试问题测试问题", replyContent:"测试回答测试回答测试回答"}
    ],
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
    http.example_list_all({
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