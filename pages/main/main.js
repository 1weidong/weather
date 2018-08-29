Page({
  data: {
    // text:"这是一个页面"
    city: '',
    today: {},
    future: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getInfo();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getInfo: function () {
    //获取用户当前位置
    var page = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        page.loadCity(latitude, longitude);
      }
    })
  },
  loadCity: function (latitude, longitude) {
    var page = this;
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=VSLywYuwwhOjXEl7OwxdiVBCaue5WyN4&location=' + latitude + ',' + longitude + '&output=json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        city = city.replace("市",'');
        page.setData({city:city})
        page.loadWeather(city);
      }
    })
  },
  loadWeather: function (city) {
    var page = this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        var future = res.data.data.forecast;
        var todayInfo = future.shift();
        var today = res.data.data;
        today.todayInfo = todayInfo;
        page.setData({today:today,future:future})
      }
    })
  }
})