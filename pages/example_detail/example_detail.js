// pages/example_detail/example_detail.js
import http from '../../utils/api'; // 引入api接口管理文件
let eventChannel; 

Page({
  data: {
    title: "问答详情", // 导航栏标题
    pqid: '',
    exampleDetail: {
      // questionContent:"测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试问题测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试", replyContent:"测试回答测试回答测试回答测试问题测试问题测试问题测试问题",
      // patientName:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
      // genderString:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"
    }
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
        'pqid': data.data,
      }, () =>{
          console.log(that.data.pqid)
          let pqid = that.data.pqid;
          http.example_detail({
            data: {
              pqid: pqid
            },success:(res) =>{
              // console.log(pqid)
              // console.log(res.data.data)
              that.setData({
                'exampleDetail': res.data.data,
              })
              console.log(that.data.exampleDetail)
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