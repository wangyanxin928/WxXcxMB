

const answers = [
  'Yes!',
  'No',
  'Hm...',
  'I am not sure',
  'And what about you?',
  'May be ;)',
  'Lorem ipsum dolor sit amet, consectetur',
  'What?',
  'Are you sure?',
  'Of course',
  'Need to think about it',
  'Amazing!!!'
]
let answerTimeout;
var interval = null;

// TODO 获取消息、发送消息之后需要滚动到底部
// 似乎 scroll-view 很多问题 

Page({
  data: {
    userName: '',
    messages: [],
    loading: false,
    inputValue: '',
    inputContent: {},
    lyLength: 0
  },
  onLoad(options) {
    let name = options.name || '督导记录'
    this.setData({
      userName: name
    })
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.userName
    })
    this.getMessage()
  },
  bindChange(e) {
    this.data.inputContent[e.currentTarget.id] = e.detail.value
  },
  getMessage() {
    this.setData({
      // loading: true
    })
    this.setData({
      messages: [

      ]
    })
  },
  luyin() {
    var _this = this;
    var a = 1;
    wx.showToast(
      {
        title: '正在录音',
        image: "../img/xh.png",
        duration: 60000
      });
    interval = setInterval(function () {
      a++;
      if (a >= 5) {
        wx.showToast(
          {
            title: "即将结束",
            image: "../img/1234567890/" + (15 - a).toString() + ".png"
          });
      }
    }, 1000);

    //记录录音开始时间 秒
    var startstamp = Date.parse(new Date()) / 1000;
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        //记录录音结束时间 秒
        var endstamp = Date.parse(new Date());
        endstamp = endstamp / 1000;

        //录音长度
        var lyLength = endstamp - startstamp;
        _this.setData({
          messages: [..._this.data.messages, {
            text: "",
            filePath: tempFilePath,
            from: 'sent',
            aId: endstamp,
            lyLength: lyLength
          }]
        })
      },
      fail: function (res) {
        //录音失败
        console.log("aaa");
      }
    })

    setTimeout(function () {

      clearInterval(interval);
      wx.hideToast();
      //结束录音  
      wx.stopRecord();
    }, 15000)
  },
  stopluyin() {
    clearInterval(interval);
    wx.hideToast();
    wx.stopRecord();
  },
  bofang(e) {
    var $data = e.currentTarget.dataset;
    var filePath = $data.content;
    console.log($data);
    wx.playVoice({
      filePath: filePath,
      complete: function () {
      }
    })
  },
  sendMessage() {
    this.setData({
      messages: [...this.data.messages, {
        text: this.data.inputContent.message,
        from: 'sent'
      }]
    })
    this.data.inputValue = ''
    setTimeout(() => {
      this.autoAnswer()
    }, 1000)
  },
  autoAnswer() {
    answerTimeout && clearTimeout(answerTimeout)
    answerTimeout = setTimeout(_ => {
      let message = {
        from: 'received',
        text: answers[Math.floor(Math.random() * answers.length)]
      }
      this.setData({
        messages: [...this.data.messages, message]
      })
    }, 1000)
  }
})