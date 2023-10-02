import http from '../../utils/api' // 引入api接口管理文件

// pages/share/share.js
Page({
  data: {
    title: "分享",
  },

preserve: function(options){
  let that = this
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.writePhotosAlbum']) {
        that.saveImg();
      } 
      else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            that.saveImg();
          },
          fail() {
            that.authConfirm()
          }
        })
      } 
      else {
        that.authConfirm()
      }
    }
  })
},
// 授权拒绝后，再次授权提示弹窗
authConfirm(){
  let that = this
  wx.showModal({
    content: '检测到您没打开保存图片权限，是否去设置打开？',
    confirmText: "确认",
    cancelText: "取消",
    success: function (res) {
      if (res.confirm) {
        wx.openSetting({
          success(res) {
            if (res.authSetting['scope.writePhotosAlbum']) {
              that.saveImg();
            }
            else {
              wx.showToast({
                title: '您没有授权，无法保存到相册',
                icon: 'none'
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '您没有授权，无法保存到相册',
          icon: 'none'
        })
      }
    }
  });
},
// 图片保存到本地
saveImg(){
  wx.downloadFile({
    url: this.data.picURL,//图片地址
    success: function (res) {
      wx.showLoading()
      //图片保存到本地
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function (res) {
          wx.hideLoading()
          console.log(res)
          wx.showModal({
            title: '提示',
            content: '保存成功！',
            showCancel: false,
          })
        },
        fail: function (err) {
          wx.hideLoading()
          console.log(err)
        }
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    http.poster({
      data: {},
      success:(res) =>{
        console.log(res.data.data)
        this.setData({
          'picURL': res.data.data,
        })
      }
    })
  }
})