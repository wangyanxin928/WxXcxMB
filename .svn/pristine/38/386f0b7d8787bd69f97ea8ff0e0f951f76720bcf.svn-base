Page({
  openToast: function () {
    wx.showToast({
      title: '签到成功',
      icon: 'success',
      duration: 3000
    });
  }
  ,scanCodeOpen:function(){
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  }
});
