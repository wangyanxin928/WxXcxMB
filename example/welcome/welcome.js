//index.js
//获取应用实例
var app = getApp();
var base64 = require("../images/base64");

Page({
  data: {
    motto: 'Hello ! WelCome to WxApp',
    islogin: false,
    userInfo: {
      nickName: null,
      userInfoAvatar: null,
      province: null,
      city: null,
      sex: null,
      country: null
    },
    icon: base64.icon20
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    var CuserInfo = wx.getStorageSync('CuserInfo');
    if (CuserInfo.accesstoken) {
      that.setData({ islogin: true });
    }
    console.log(CuserInfo)

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (user) {
      switch (user.gender) {
        case 0:
          user.sex = '未知';
          break;
        case 1:
          user.sex = '男';
          break;
        case 2:
          user.sex = '女';
          break;
      }
      //更新数据 
      that.setData({
        userInfo: {
          nickName: user.nickName,
          userInfoAvatar: user.avatarUrl,
          province: user.province,
          city: user.city,
          country: user.country,
          language: user.language,
          sex: user.sex
        }
      })

    })
  }
})
