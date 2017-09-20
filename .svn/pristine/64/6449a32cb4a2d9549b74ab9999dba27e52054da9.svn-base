// pages/service/file/index.js
Page({
  data: {
    // text:"这是一个页面"
    resource: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  /**
   * 下载文件
   */
  listenerButtonDownLoadFile: function () {
    var that = this;
    wx.downloadFile({
      url: 'http://example.com/somefile.pdf',
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  }
})


