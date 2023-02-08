// pjax适配
function whenDOMReady() {
  // pjax加载完成（切换页面）后需要执行的函数和代码
  console.log("pjax开启");
  musicState();
}

// 返回顶部 显示网页阅读进度
window.onscroll = percent; // 执行函数
// 页面百分比
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round((a / b) * 100), // 计算百分比
    btn = document.querySelector("#percent"); // 获取图标
  result <= 99 || (result = 99), (btn.innerHTML = result);
}
document.getElementById("page-name").innerText = document.title.split(" | 参星阁")[0];

// 首页大logo
var logo = document.createElement("img");
var site = document.getElementById("site-info");
var title = document.getElementById("site-title");
logo.style = "position:relative;left:calc(50% - 75px);width:150px;height:150px";
logo.src = "https://i.imgtg.com/2023/02/06/0Su3b.png";
site.insertBefore(logo, title);
site.style.top = "30%";

// 音乐状态检测
function musicState() {
  const music_state = document.querySelector("meting-js").aplayer.audio.paused;
  if (music_state) {
    document.querySelector("#music-Switch i").classList.remove("fa-pause");
    document.querySelector("#music-Switch i").classList.add("fa-play");
    document.querySelector("#console #music-ctrl-btn-center i").classList.remove("fa-pause");
    document.querySelector("#console #music-ctrl-btn-center i").classList.add("fa-play");
  } else {
    document.querySelector("#music-Switch i").classList.remove("fa-play");
    document.querySelector("#music-Switch i").classList.add("fa-pause");
    document.querySelector("#console #music-ctrl-btn-center i").classList.remove("fa-play");
    document.querySelector("#console #music-ctrl-btn-center i").classList.add("fa-pause");
  }
}

function secToTime(s) {
  if(isNaN(s)) s = 0;
  var min = Math.floor(s / 60);
  var sec = Math.floor(s % 60);
  var t = min.toString().padStart(2,'0') + ":" + sec.toString().padStart(2,'0');
  return t;
}

var ctrl = {

  // 深色模式开关
  switchDarkMode: function() {
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    if (nowMode === 'light') {
      activateDarkMode();
      saveToLocal.set('theme', 'dark', 2);
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      // document.querySelector("#iconDarkMode").classList.remove("fa-sun")
      // document.querySelector("#iconDarkMode").classList.add("fa-moon")
    } else {
      activateLightMode();
      saveToLocal.set('theme', 'light', 2);
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
      // document.querySelector("#iconDarkMode").classList.remove("fa-moon")
      // document.querySelector("#iconDarkMode").classList.add("fa-sun")
    }
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof changeGiscusTheme === 'function' && changeGiscusTheme();
    typeof FB === 'object' && window.loadFBComment();
    typeof runMermaid === 'function' && window.runMermaid();
  },

  //显示中控台
  showConsole: function() {
    document.querySelector("#console").classList.add("show");
    ctrl.initConsoleState();
  },

  //隐藏中控台
  hideConsole: function() {
    document.querySelector("#console").classList.remove("show");
  },

  // 歌词显示开关
  ircShowHide: function() {
    const irc = document.querySelector(".aplayer > .aplayer-lrc-hide"); //这里防止与音乐页面的控制冲突
    if(irc === null) {
      document.querySelector(".aplayer > .aplayer-lrc").classList.add("aplayer-lrc-hide");
      // document.querySelector(".aplayer-info > .aplayer-lrc").classList.add("aplayer-lrc-hide");
      document.querySelector("#ircItem").classList.remove("on");
    } else {
      document.querySelector(".aplayer > .aplayer-lrc").classList.remove("aplayer-lrc-hide");
      // document.querySelector(".aplayer-info > .aplayer-lrc").classList.remove("aplayer-lrc-hide");
      document.querySelector("#ircItem").classList.add("on");
    }
  },

  // 单栏显示开关
  hideAsideBtn: () => {
    const $htmlDom = document.documentElement.classList;
    if ($htmlDom.contains('hide-aside')){
      saveToLocal.set('aside-status', 'show', 2);
      document.querySelector("#asideItem").classList.remove("on");
    } else {
      saveToLocal.set('aside-status', 'hide', 2);
      document.querySelector("#asideItem").classList.add("on");
    }
    $htmlDom.toggle('hide-aside');
  },
  
  settingsOpen: function() {
    alert("开发中...敬请期待！");
  },

  musicSwitch: function() {
    const music_state = document.querySelector("meting-js").aplayer.audio.paused;
    if (music_state) {
      document.querySelector("#music-Switch i").classList.remove("fa-play");
      document.querySelector("#music-Switch i").classList.add("fa-pause");
      document.querySelector("#console #music-ctrl-btn-center i").classList.remove("fa-play");
      document.querySelector("#console #music-ctrl-btn-center i").classList.add("fa-pause");
    } else {
      document.querySelector("#music-Switch i").classList.remove("fa-pause");
      document.querySelector("#music-Switch i").classList.add("fa-play");
      document.querySelector("#console #music-ctrl-btn-center i").classList.remove("fa-pause");
      document.querySelector("#console #music-ctrl-btn-center i").classList.add("fa-play");
    }
    document.querySelector("meting-js").aplayer.toggle();
  },
  musicForward: function() {
    document.querySelector("meting-js").aplayer.skipForward();
  },
  musicBackward: function() {
    document.querySelector("meting-js").aplayer.skipBack();
  },

  getMusicInfo: function() {
    var music_id = document.querySelector("meting-js").aplayer.list.index; //当前曲目的id
    var music_cover = document.querySelector("meting-js").aplayer.list.audios[music_id].cover;
    var music_author = document.querySelector("meting-js").aplayer.list.audios[music_id].author;
    var music_title = document.querySelector("meting-js").aplayer.list.audios[music_id].title;
    // 歌曲信息
    document.getElementById("console-music-cover").innerHTML = "<img src='" + music_cover + "' style='width:100%;height:100%;border-radius:0.5rem;'>";
    document.getElementById("console-music-title").innerHTML = music_title;
    document.getElementById("console-music-author").innerHTML = music_author;
    // 当前时间
    var nowTime = document.querySelector("meting-js").aplayer.audio.currentTime;
    if(isNaN(nowTime)) nowTime = 0;
    var nowTimeString = secToTime(nowTime);
    // 总时间
    var allTime = document.querySelector("meting-js").aplayer.audio.duration;
    if(isNaN(allTime)) allTime = 0; //无歌曲时会返回NaN
    var allTimeString = secToTime(allTime);
    // 进度条时间
    document.getElementById("progress-low-btn").innerHTML = nowTimeString;
    document.getElementById("progress-high-btn").innerHTML = allTimeString;
    // 进度条进度
    document.querySelector("#p_bar").style.width = document.querySelector("#p_bar_bg").offsetWidth * (nowTime / allTime) + "px";

    // if (document.documentElement.clientWidth < 400) {
    //   document.querySelector("#console .console-music-ctrl-item").style.width = "90%";
    // } else {
    //   document.querySelector("#console .console-music-ctrl-item").style.width = "20rem";
    // }

  },

  //初始化console图标
  initConsoleState: function() {
    const irc = document.querySelector(".aplayer > .aplayer-lrc-hide");
    // 防止aplayer崩了，加个判断。
    const aplayer = document.querySelector(".aplayer > .aplayer-lrc");
    irc === null && aplayer !=null
      ? document.querySelector("#ircItem").classList.add("on")
      : document.querySelector("#ircItem").classList.remove("on");
    saveToLocal.get('aside-status') === 'hide'
      ? document.querySelector("#asideItem").classList.add("on")
      : document.querySelector("#asideItem").classList.remove("on");
    // 当前音量
    var nowVolume = document.querySelector("meting-js").aplayer.audio.volume;
    // 音量条进度
    document.querySelector("#v_bar").style.width = document.querySelector("#v_bar_bg").offsetWidth * nowVolume + "px";
  }

}


// 音量条监听器
var music_volumebar = document.getElementById("music-volumebar"); //扩大热区
var v_bar_bg = document.getElementById("v_bar_bg");
var v_bar = document.getElementById("v_bar");
var v_low = document.getElementById("volume-low-btn");
var v_high = document.getElementById("volume-high-btn");
var v_bar_bg_Len = v_bar_bg.offsetWidth; // 获取进度条总长Width
music_volumebar.addEventListener("mousedown", function (event) { //添加监听事件
  v_bar_bg.style.height = "0.6rem";
  // v_bar.style.height = "0.6rem";
  v_bar.style.backgroundColor = "var(--anzhiyu-reverse)";
  v_low.style.color = "var(--anzhiyu-reverse)";
  v_high.style.color = "var(--anzhiyu-reverse)";
  let x = event.pageX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
  v_bar.style.width = (0 + event.offsetX) + "px"; // 按下时重新设置进度条
  let v_bar_Len = v_bar.offsetWidth; // 获取进度条的初始Width
  v_bar_bg_Len = v_bar_bg.offsetWidth;
  let newVolume = event.offsetX / v_bar_bg_Len;
  document.querySelector("meting-js").aplayer.volume(newVolume, true); // 更改音量
  document.onmousemove = function(event) { // 拖动需要写到down里面
    let diff = x - event.pageX; // 获取移动的距离
    let v_bar_Len_New = v_bar_Len - diff; // 计算当前进度条的Width
    if(v_bar_Len_New < 0) { // 当超出进度条范围，控制
      v_bar_Len_New = 0;
    } else if(v_bar_Len_New > v_bar_bg_Len) {
      v_bar_Len_New = v_bar_bg_Len;
    }
    v_bar.style.width = v_bar_Len_New + "px"; // 更改进度条Width
    newVolume = v_bar_Len_New / v_bar_bg_Len;
    document.querySelector("meting-js").aplayer.volume(newVolume, true); // 更改音量
  }
});
// 移动端适配
music_volumebar.addEventListener("touchstart", function (event) { //添加监听事件
  v_bar_bg.style.height = "0.6rem";
  // v_bar.style.height = "0.6rem";
  v_bar.style.backgroundColor = "var(--anzhiyu-reverse)";
  v_low.style.color = "var(--anzhiyu-reverse)";
  v_high.style.color = "var(--anzhiyu-reverse)";
  let x = event.targetTouches[0].pageX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
  v_bar.style.width = (0 + event.targetTouches[0].offsetX) + "px"; // 按下时重新设置进度条
  let v_bar_Len = v_bar.offsetWidth; // 获取进度条的初始Width
  v_bar_bg_Len = v_bar_bg.offsetWidth;
  let newVolume = event.targetTouches[0].offsetX / v_bar_bg_Len;
  document.querySelector("meting-js").aplayer.volume(newVolume, true); // 更改音量
  document.ontouchmove = function(event) { // 拖动需要写到down里面
    let diff = x - event.targetTouches[0].pageX; // 获取移动的距离
    let v_bar_Len_New = v_bar_Len - diff; // 计算当前进度条的Width
    if(v_bar_Len_New < 0) { // 当超出进度条范围，控制
      v_bar_Len_New = 0;
    } else if(v_bar_Len_New > v_bar_bg_Len) {
      v_bar_Len_New = v_bar_bg_Len;
    }
    v_bar.style.width = v_bar_Len_New + "px"; // 更改进度条Width
    newVolume = v_bar_Len_New / v_bar_bg_Len;
    document.querySelector("meting-js").aplayer.volume(newVolume, true); // 更改音量
  }
});

// 进度条监听器
var music_progressbar = document.getElementById("music-progressbar"); //扩大热区
var p_bar_bg = document.getElementById("p_bar_bg");
var p_bar = document.getElementById("p_bar");
var p_low = document.getElementById("progress-low-btn");
var p_high = document.getElementById("progress-high-btn");
var p_bar_Len_New = 0;
var p_bar_bg_Len = p_bar_bg.offsetWidth; // 获取进度条总长Width
var ctrl_flag = 1;
var mousemove_flag = 1;
music_progressbar.addEventListener("mousedown", function (event) { //添加监听事件
  p_bar_bg.style.height = "0.6rem";
  // p_bar.style.height = "0.6rem";
  p_bar.style.backgroundColor = "var(--anzhiyu-reverse)";
  p_low.style.color = "var(--anzhiyu-reverse)";
  p_high.style.color = "var(--anzhiyu-reverse)";
  ctrl_flag = 0;
  global_music_flag = 1;
  let x = event.pageX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
  // p_bar.style.width = (0 + event.offsetX) + "px"; // 按下时重新设置进度条
  let p_bar_Len = p_bar.offsetWidth; // 获取进度条的初始Width
  p_bar_bg_Len = p_bar_bg.offsetWidth; // 获取进度条总长Width，不知道为什么，第一次获取的值不对，这里还得再更新一次
  document.onmousemove = function(event) { // 拖动需要写到down里面
    let diff = x - event.pageX; // 获取移动的距离
    mousemove_flag = 0;
    p_bar_Len_New = p_bar_Len - diff; // 计算当前进度条的Width
    if(p_bar_Len_New < 0) { // 当超出进度条范围，控制
      p_bar_Len_New = 0;
    } else if(p_bar_Len_New > p_bar_bg_Len) {
      p_bar_Len_New = p_bar_bg_Len;
    }
    p_bar.style.width = p_bar_Len_New + "px"; // 更改进度条Width
    let all_Time = document.querySelector("meting-js").aplayer.audio.duration;
    let current_time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
    document.getElementById("progress-low-btn").innerHTML = secToTime(current_time);
  }
});
// 移动端适配
music_progressbar.addEventListener("touchstart", function (event) { //添加监听事件
  p_bar_bg.style.height = "0.6rem";
  // p_bar.style.height = "0.6rem";
  p_bar.style.backgroundColor = "var(--anzhiyu-reverse)";
  p_low.style.color = "var(--anzhiyu-reverse)";
  p_high.style.color = "var(--anzhiyu-reverse)";
  ctrl_flag = 0;
  global_music_flag = 1;
  let x = event.targetTouches[0].pageX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
  // p_bar.style.width = (0 + event.targetTouches[0].offsetX) + "px"; // 按下时重新设置进度条
  let p_bar_Len = p_bar.offsetWidth; // 获取进度条的初始Width
  p_bar_bg_Len = p_bar_bg.offsetWidth; // 获取进度条总长Width，不知道为什么，第一次获取的值不对，这里还得再更新一次
  document.ontouchmove = function(event) { // 拖动需要写到down里面
    let diff = x - event.targetTouches[0].pageX; // 获取移动的距离
    mousemove_flag = 0;
    p_bar_Len_New = p_bar_Len - diff; // 计算当前进度条的Width
    if(p_bar_Len_New < 0) { // 当超出进度条范围，控制
      p_bar_Len_New = 0;
    } else if(p_bar_Len_New > p_bar_bg_Len) {
      p_bar_Len_New = p_bar_bg_Len;
    }
    p_bar.style.width = p_bar_Len_New + "px"; // 更改进度条Width
    let all_Time = document.querySelector("meting-js").aplayer.audio.duration;
    let current_time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
    document.getElementById("progress-low-btn").innerHTML = secToTime(current_time);
  }
});

document.onmouseup = function() { //当鼠标弹起的时候，不做任何操作
  v_bar_bg.style.height = "0.4rem";
  // v_bar.style.height = "0.4rem";
  v_bar.style.backgroundColor = "var(--font-color)";
  v_low.style.color = "var(--font-color)";
  v_high.style.color = "var(--font-color)";
  p_bar_bg.style.height = "0.4rem";
  // p_bar.style.height = "0.4rem";
  p_bar.style.backgroundColor = "var(--font-color)";
  p_low.style.color = "var(--font-color)";
  p_high.style.color = "var(--font-color)";
  if (ctrl_flag == 0 && mousemove_flag == 0) {
    let all_Time = document.querySelector("meting-js").aplayer.audio.duration;
    let new_Time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
    document.querySelector("meting-js").aplayer.seek(new_Time); //更改进度
  }
  global_music_flag = 0;
  ctrl_flag = 1;
  mousemove_flag = 1;
  document.onmousemove = null;
}

document.ontouchend = function() {
  v_bar_bg.style.height = "0.4rem";
  // v_bar.style.height = "0.4rem";
  v_bar.style.backgroundColor = "var(--font-color)";
  v_low.style.color = "var(--font-color)";
  v_high.style.color = "var(--font-color)";
  p_bar_bg.style.height = "0.4rem";
  // p_bar.style.height = "0.4rem";
  p_bar.style.backgroundColor = "var(--font-color)";
  p_low.style.color = "var(--font-color)";
  p_high.style.color = "var(--font-color)";
  if (ctrl_flag == 0 && mousemove_flag == 0) {
    let all_Time = document.querySelector("meting-js").aplayer.audio.duration;
    let new_Time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
    document.querySelector("meting-js").aplayer.seek(new_Time); //更改进度
  }
  global_music_flag = 0;
  ctrl_flag = 1;
  mousemove_flag = 1;
  document.ontouchmove = null;
}


whenDOMReady(); // 打开网站先执行一次
document.addEventListener("pjax:complete", whenDOMReady); // pjax加载完成（切换页面）后再执行一次
// whenDOMReady函数外放一些打开网站之后只需要执行一次的函数和代码，比如一些监听代码。
// 监听代码只需要执行一次即可，不需要每次加载pjax都执行，会出现一些Bug。至于为什么，我也不知道，可以自己试一下。


// ——————————————————————————————————评论表情放大预览————————————————————————————————————————————

// 如果当前页有评论就执行函数
if (document.getElementById('post-comment')) owoBig();
// 表情放大
function owoBig() {
    let flag = 1, // 设置节流阀
        owo_time = '', // 设置计时器
        m = 3; // 设置放大倍数
    // 创建盒子
    let div = document.createElement('div'),
        body = document.querySelector('body');
    // 设置ID
    div.id = 'owo-big';
    // 插入盒子
    body.appendChild(div);

    // 构造observer
    let observer = new MutationObserver(mutations => {

        for (let i = 0; i < mutations.length; i++) {
            let dom = mutations[i].addedNodes,
                owo_body = '';
            if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
            // 如果需要在评论内容中启用此功能请解除下面的注释
            // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
            else continue;
            
            // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
            if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
            // 鼠标移入
            owo_body.onmouseover = (e) => {
                    if (flag && e.target.tagName == 'IMG') {
                        flag = 0;
                        // 移入300毫秒后显示盒子
                        owo_time = setTimeout(() => {
                            let height = e.path[0].clientHeight * m, // 盒子高
                                width = e.path[0].clientWidth * m, // 盒子宽
                                left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2, // 盒子与屏幕左边距离
                                top = e.y - e.offsetY; // 盒子与屏幕顶部距离

                            if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10); // 右边缘检测，防止超出屏幕
                            if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
                            // 设置盒子样式
                            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
                            // 在盒子中插入图片
                            div.innerHTML = `<img src="${e.target.src}">`;
                        }, 300);
                    }
                };
            // 鼠标移出隐藏盒子
            owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
        }

    })
    observer.observe(document.getElementById('post-comment'), { subtree: true, childList: true }); // 监听的 元素 和 配置项
}


// ——————————————————————————————————————————————————工具——————————————————————————————————————————
//RGB颜色转化为16进制颜色
function colorHex(str) {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  var that = str;
  if (/^(rgb|RGB)/.test(that)) {
    var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = that;
    }
    return strHex;
  } else if (reg.test(that)) {
    var aNum = that.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i]);
      }
      return numHex;
    }
  } else {
    return that;
  }
}

//16进制颜色转化为RGB颜色
function colorRgb(str) {
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  var sColor = str.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return "rgb(" + sColorChange.join(",") + ")";
  } else {
    return sColor;
  }
}

// 随机颜色
function RandomColor () {
  this.r = Math.floor(Math.random()*255);
  this.g = Math.floor(Math.random()*255);
  this.b = Math.floor(Math.random()*255);
  this.color = 'rgba('+ this.r +','+ this.g +','+ this.b +',0.8)';
}