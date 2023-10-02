// pages/consulation_add/consulation_add.js
import http from '../../utils/api'; // 引入api接口管理文件

Page({
  data: {
    title: "新增治疗记录", // 导航栏标题
    treatment: '',
    treatmentList: [],
    treatmentIndex: 0,
    consulationday: '',
    operationday: '',
    consulation_img: '',
    Xray_img: ''
  },

  change_consulationday(e){ 
    const consulationday = new Date(e.detail.value);
    this.setData({
      'consulationday': consulationday.getFullYear()+"年"+(consulationday.getMonth()+1)+"月"+consulationday.getDate()+"日"
    })
    console.log(this.data.consulationday)
  },

  change_operationday(e){ 
    const operationday = new Date(e.detail.value);
    this.setData({
      'operationday': operationday.getFullYear()+"年"+(operationday.getMonth()+1)+"月"+operationday.getDate()+"日"
    })
    console.log(this.data.operationday)
  },

  change_treatment(e){ 
    this.setData({ 
      'treatmentIndex': e.detail.value,
      'treatment': this.data.treatmentList[e.detail.value]
    }) 
    console.log(this.data.treatment)
  },

  addConsulation: function(e){
    // if (!wx.getStorageSync('userInfo')) {
    //   wx.showModal({
    //     title: '温馨提示',
    //     content: '授权才可注册',
    //     success (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //         wx.switchTab({
    //           url: '/pages/me/me'
    //         })
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // } else {
    let info= e.detail.value;
    console.log(info);
    //判断提交数据是否合理
    if(e.detail.value.consulationday.length == 0){ 
      wx.showToast({
        title: '请选择\n就诊日期',
        icon: 'error',
        duration: 2000,
      })
    }
    else if(e.detail.value.operationday.length == 0){ 
      wx.showToast({
        title: '请选择\n手术日期',
        icon: 'error',
        duration: 2000,
      })
    }
    else if(e.detail.value.treatment.length == 0){ 
      wx.showToast({
        title: '请选择\n治疗方式',
        icon: 'error',
        duration: 2000,
      })
    }else if(this.data.consulation_img == ''){ 
      wx.showToast({
        title: '请上传\n病历',
        icon: 'error',
        duration: 2000,
      })
    }else if(this.data.Xray_img == ''){ 
      wx.showToast({
        title: '请上传\nX光片',
        icon: 'error',
        duration: 2000,
      })
    }else
    {
      console.log(e.detail.value.patienttreatment)
      const treatment = new Date(e.detail.value.patienttreatment);
      console.log(treatment)
      http.case_post({
        data: 
        {
          consultationDatetimeString: this.data.consulationday,
          operationDatetimeString: this.data.operationday,
          treatment: e.detail.value.treatment,
          consultationImg: this.data.consulation_img,
          xrayImg: this.data.Xray_img,
        },
        success:(res) =>{
          console.log(info);
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
  },

  upload: function (e) {
    var that = this;
    console.log(that.data)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        for (let i = 0; i < tempFilePaths.length; i += 1) {
          console.log(tempFilePaths[i])
          
          wx.uploadFile({
            url: 'https://seuclab.cn/to/xu-doctor/dev/common/img', 
            filePath: tempFilePaths[i],
            name: 'img',
            //  header: { token: wx.getStorageSync('token') },
            method:'POST',
            formData: { // HTTP 请求中其他额外的 form data
              img: tempFilePaths[i],
            },
            success: (res) => {
              console.log(res.data);
              // console.log(res.data[0]);
              console.log(JSON.parse(res.data));
              const response = JSON.parse(res.data)
              console.log(response.data);
              console.log(e.currentTarget.id)
               // 上传成功后相关操作
              if(e.currentTarget.id == 0){
                that.setData({
                  'consulation_img': response.data,
                })
              }else{
                that.setData({
                  'Xray_img': response.data,
                })
              }
             },
             fail() {
               wx.showToast({
                 title: '上传失败\n请重试', //弹框内容
                 icon: 'error',  //弹框模式
                 duration: 2000    //弹框显示时间
               })  
             },
           })
         }
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
    http.treatmentList({
      data: {},
      success :(res) =>{
        // console.log(res)
        this.setData({
          'treatmentList': res.data.data.list
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