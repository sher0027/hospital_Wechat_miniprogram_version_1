// pages/search/search.js
import http from '../../utils/api'; // 引入api接口管理文件
let eventChannel; 

Page({
  data: {
    title: "搜索",
    key: '',
    searchList: []
  },

  detail: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.index)
    // console.log(Object.keys(e.currentTarget.dataset).length)
    wx.navigateTo({
      url: '/pages/webview/webview',
      success: function(res){
        res.eventChannel.emit('getParam', { data: that.data.searchList[e.currentTarget.dataset.index].mpUrl })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    eventChannel = this.getOpenerEventChannel(); 
		eventChannel.on("getParam",function(data){
      console.log(data.data);//传递过来的参数
      that.setData({
        'key': data.data,
      }, () =>{
        console.log(that.data.key)
        let key = that.data.key;
        http.search({
          data: {
            keyWord: key
          },
          success:(res) =>{
            console.log(res.data)
            that.setData({
              'searchList': res.data.data.pageList,
            })
            console.log(that.data.searchList)
          }
        })
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
    
  }
})