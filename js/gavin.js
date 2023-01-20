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
    const irc = document.querySelector(".aplayer-lrc-hide");
    if(irc === null) {
      document.querySelector(".aplayer-lrc").classList.add("aplayer-lrc-hide");
      document.querySelector("#ircItem").classList.remove("on");
    } else {
      document.querySelector(".aplayer-lrc").classList.remove("aplayer-lrc-hide");
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

  //初始化console图标
  initConsoleState: function() {
    const irc = document.querySelector(".aplayer-lrc-hide");
    irc === null
      ? document.querySelector("#ircItem").classList.add("on")
      : document.querySelector("#ircItem").classList.remove("on");
    saveToLocal.get('aside-status') === 'hide'
      ? document.querySelector("#asideItem").classList.add("on")
      : document.querySelector("#asideItem").classList.remove("on");
  }

}


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