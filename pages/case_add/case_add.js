// pages/case_add/case_add.js
import http from '../../utils/api'; // 引入api接口管理文件
var util = require('../../utils/util.js');


Page({
  data: {
    title: "添加患者信息", // 导航栏标题
    patientGender: '',
    Gender:[  {value: "男", name: "男", checked: false},
              {value: "女", name: "女", checked: false}],
    currentValue: "",
    patientBirthday: ""
  },

  change_gender: function (e) {
    const items = this.data.Gender
    // console.log(items.length)
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
      // console.log(items[i].checked)
    }
    this.setData({ 
      'patientGender': e.detail.value,
      'currentValue': e.detail.value,
    }) 
    console.log(this.data.currentValue)
  },

  change_birthday(e){ 
    const birthday = new Date(e.detail.value);
    this.setData({
      'patientBirthday': birthday.getFullYear()+"年"+(birthday.getMonth()+1)+"月"+birthday.getDate()+"日"
    })
    console.log(this.data.patientBirthday)
  },

  addInfo: function(e){
    http.case_info({
      data:{ },
      success :(res) =>{
        console.log(res.data.data);
        if (!res.data.data.avatar) {
          wx.showModal({
            title: '温馨提示',
            content: '授权才可注册',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '/pages/me/me'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          let info= e.detail.value;
          console.log(info);
          
          //判断提交数据是否合理
          if(e.detail.value.patientName.length == 0){ 
            wx.showToast({
              title: '请输入姓名',
              icon: 'error',
              duration: 2000,
            })
          } 
          else if(e.detail.value.patientId.length == 0){ 
            wx.showToast({
              title: '请输入ID号',
              icon: 'error',
              duration: 2000,
            })
          } 
          else if(e.detail.value.patientGender.length == 0){ 
            wx.showToast({
              title: '请选择性别',
              icon: 'error',
              duration: 2000,
            })
          }
          else if(e.detail.value.patientBirthday.length == 0){ 
            wx.showToast({
              title: '请选择\n出生日期',
              icon: 'error',
              duration: 2000,
            })
          }else
          {
            http.edit({
              data: 
              {
                name: e.detail.value.patientName,
                realPatientId: e.detail.value.patientId,
                genderString: e.detail.value.patientGender,
                birthdayString: this.data.patientBirthday
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
    var that = this
    http.case_info({
      data: {},
      success:(res) =>{
        console.log(res.data.data.genderString)
        if(res.data.data.genderString == '男' || res.data.data.genderString == '女'){// 排除后端返回为null的情况
          var i = res.data.data.genderString == '男' ? 0 : 1;
          that.data.Gender[i].checked="true"
              that.setData({
                Gender: that.data.Gender
              })
        }
        else{ }
        // if(res.data.data.birthdayString == util.formatTime(new Date())){// 排除后端返回为null
        //   that.setData({
        //     'patientBirthday': ''
        //   })
        // }
        // else{ }
        
        that.setData({
          'patientName': res.data.data.name,
          'patientId': res.data.data.realPatientId,
          'patientGender': res.data.data.genderString,
          'currentValue': res.data.data.genderString,
          'patientBirthday': res.data.data.birthdayString,
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