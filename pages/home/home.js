// pages/home/home.js
import http from '../../utils/api'; // 引入api接口管理文件
var app = getApp();

Page({
  data: {
    // 轮播图数组
    swiperList: [
      {img:'/images/banner.png'}
    ],
    consulationList: [],
  },

  search: function (e) {
    let info= e.detail.value.keyWord;
    console.log(info);
    wx.navigateTo({
      url: '/pages/search/search',
      success: function(res){
        res.eventChannel.emit('getParam', { data: e.detail.value.keyWord })
      }
    })
  },

  consulate: function (options) {
    wx.switchTab({
      url: '/pages/introduction/introduction',
    })
  },

  success: function (options) {
    wx.navigateTo({
      url: '/pages/success/success',
    })
  },

  science: function (options) {
    wx.navigateTo({
      url: '/pages/science/science',
    })
  },

  detail: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.index)
   if(that.data.consulationList[e.currentTarget.dataset.index].tag == "患者案例"){
    wx.navigateTo({
      url: '/pages/example_detail/example_detail',
      success: function(res){
        console.log(that.data.consulationList[e.currentTarget.dataset.index].mpUrl)
        res.eventChannel.emit('getParam', { data: that.data.consulationList[e.currentTarget.dataset.index].mpUrl })
      }
    })
   }else{
      wx.navigateTo({
        url: '/pages/webview/webview',
        success: function(res){
          res.eventChannel.emit('getParam', { data: that.data.consulationList[e.currentTarget.dataset.index].mpUrl })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      app.Login().then(res => {
        console.log("promise回调后的数据：");
        console.log(res)
        if (res == 200) {
          //把首页需要请求的数据接口都提取到一个自定义方法中
          http.banners({
            data:{ },
            success :(res) =>{
              console.log(res.data.data.pageList.length)
              if(res.data.data.pageList.length == 0){
                console.log("默认banner")
              }else{
                that.setData({
                  'swiperList': res.data.data.pageList,
                })
              }
            }
          })
          http.consulation({
            data:{},
            success :(res) =>{
              console.log(res.data.data.pageList)
              that.setData({
                'consulationList': res.data.data.pageList,
              })
            }
          })
        }
      })
      //   http.banners({
      //   data:{ },
      //   success :(res) =>{
      //     console.log(res.data.data.pageList)
      //     that.setData({
      //       'swiperList': res.data.data.pageList,
      //     })
      //   }
      // })
      // http.consulation({
      //   data:{},
      //   success :(res) =>{
      //     console.log(res.data.data.pageList)
      //     that.setData({
      //       'consulationList': res.data.data.pageList,
      //     })
      //   }
      // })
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
    http.banners({
      data:{ },
      success :(res) =>{
        console.log(res.data.data.pageList)
        that.setData({
          'swiperList': res.data.data.pageList,
        })
      }
    })
    http.consulation({
      data:{},
      success :(res) =>{
        console.log(res.data.data.pageList)
        that.setData({
          'consulationList': res.data.data.pageList,
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