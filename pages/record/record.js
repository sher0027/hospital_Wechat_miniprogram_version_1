// pages/record/record.js
import http from '../../utils/api'; // 引入api接口管理文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "咨询记录",
    record: [
      {
        // title: "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
        // questionContent: "问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题",
        // doctorName: "姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名姓名",
        // replyContent: "回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复回复"
      }
    ]
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
    http.record({
      data: {},
      success: (res) =>{
        console.log(res.data)
        this.setData({
          'record': res.data.data.pageList,
        })
        console.log(this.data.record)
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