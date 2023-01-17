// $(window).ready(function(){ 
// 	var userName="后端码匠";
//   document.querySelector(".aplayer-lrc").classList.add("aplayer-lrc-hide")
// 	alert(userName);
// });


// window.onload = function() {
//   document.querySelector(".aplayer-lrc").classList.add("aplayer-lrc-hide")
// }




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


// new Vue({
//   data: function () {
//       this.$notify({
//           title: "你已被发现😜",
//           message: "小伙子,扒源记住要遵循GPL协议!",
//           position: 'top-left',
//           offset: 50,
//           showClose: true,
//           type: "warning",
//           duration: 5000
//       });
//   }
// })


var cjw = {

  // 深色模式/浅色模式切换
  switchDarkMode: function() {
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
      activateDarkMode()
      saveToLocal.set('theme', 'dark', 2)
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
      // document.querySelector("#iconDarkMode").classList.remove("fa-sun")
      // document.querySelector("#iconDarkMode").classList.add("fa-moon")
    } else {
      activateLightMode()
      saveToLocal.set('theme', 'light', 2)
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
      // document.querySelector("#iconDarkMode").classList.remove("fa-moon")
      // document.querySelector("#iconDarkMode").classList.add("fa-sun")
    }
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof changeGiscusTheme === 'function' && changeGiscusTheme()
    typeof FB === 'object' && window.loadFBComment()
    typeof runMermaid === 'function' && window.runMermaid()  
  },

  //显示中控台
  showConsole: function() {
    document.querySelector("#console").classList.add("show");
    cjw.initConsoleState();
  },

  //隐藏中控台
  hideConsole: function() {
    document.querySelector("#console").classList.remove("show");
  },

  // 歌词显示
  ircShowHide: function() {
    const irc = document.querySelector(".aplayer-lrc-hide")
    if(irc === null) {
      document.querySelector(".aplayer-lrc").classList.add("aplayer-lrc-hide")
      document.querySelector("#ircItem").classList.remove("on")
    } else {
      document.querySelector(".aplayer-lrc").classList.remove("aplayer-lrc-hide")
      document.querySelector("#ircItem").classList.add("on")
    }
  },

  settingsOpen: function() {
    alert("开发中...敬请期待！")
  },

  //初始化console图标
  initConsoleState: function() {
    const irc = document.querySelector(".aplayer-lrc-hide")
    if (irc === null) {
      document.querySelector("#ircItem").classList.add("on")
    } else {
      document.querySelector("#ircItem").classList.remove("on")
    }
  },
}





// 深色模式
function switchDarkMode(){
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  // var btn1 = document.getElementById("btn1")
  if (nowMode === 'light') {
    activateDarkMode()
    saveToLocal.set('theme', 'dark', 2)
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    // btn1.style.backgroundColor = 'rgba(0,55,255,0.9)'
  } else {
    activateLightMode()
    saveToLocal.set('theme', 'light', 2)
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    // btn1.style.backgroundColor = 'rgba(255,255,255,0.3)'
  }
  // handle some cases
  typeof utterancesTheme === 'function' && utterancesTheme()
  typeof changeGiscusTheme === 'function' && changeGiscusTheme()
  typeof FB === 'object' && window.loadFBComment()
  typeof runMermaid === 'function' && window.runMermaid()
}


// 阅读模式
function switchReadMode() { // read-mode
  const $body = document.body
  $body.classList.add('read-mode')
  const newEle = document.createElement('button')
  newEle.type = 'button'
  newEle.className = 'fas fa-sign-out-alt exit-readmode'
  $body.appendChild(newEle)

  function clickFn () {
    $body.classList.remove('read-mode')
    newEle.remove()
    newEle.removeEventListener('click', clickFn)
  }
}


// 随机颜色
function RandomColor () {
    this.r = Math.floor(Math.random()*255);
    this.g = Math.floor(Math.random()*255);
    this.b = Math.floor(Math.random()*255);
    this.color = 'rgba('+ this.r +','+ this.g +','+ this.b +',0.8)';
}

function controlShowHide() {
  var ctrl = document.getElementById("controlCenter")
  if (ctrl.style.display === 'block') {
    ctrl.style.display = 'none'
  } else {
    ctrl.style.display = 'block'
  }
}

// js
// const eurkon={
//   switchThemeColor:function([e,t,n]){
//       document.documentElement.style.setProperty("--r",e),
//           document.documentElement.style.setProperty("--g",t),
//           document.documentElement.style.setProperty("--b",n),
//           document.documentElement.style.setProperty("--second",.299*e+.587*t+.114*n>=192?"#000":"#FFF"),
//           document.documentElement.style.setProperty("--cover-text",.299*e+.587*t+.114*n>=192?"#4C4948":"#EEE")
//   },
//   getMainColor:function(e="#1677B3"){
//       let t=[
//           parseInt("0x"+e.slice(1,3)),
//           parseInt("0x"+e.slice(3,5)),
//           parseInt("0x"+e.slice(5,7))
//       ];
//       if(document.getElementById("post-cover-img"))
//           try{
//               t=(new ColorThief).getColor(document.getElementById("post-cover-img"))
//           }catch(e){
//               console.log(e)
//           }return t
//   },
//   switchMainColor:function(){
//       let e=[];
//       for(let t=0;t<=20;t++)
//           for(let n=0;n<=20;n++)
//               for(let o=0;o<=20;o++)
//                   e.push(`rgb(${t},${n},${o})`),
//                       e.push(`rgb(${255-t},${255-n},${255-o})`);
//       if(document.getElementById("post-cover-img"))
//           RGBaster.colors(
//               document.getElementById("post-cover-img"),{
//                   paletteSize:30,exclude:e,
//                   success:function(e){
//                       let[t,n,o]=e.dominant.match(/\d+/g);
//                       document.documentElement.style.setProperty("--r",t),
//                           document.documentElement.style.setProperty("--g",n),
//                           document.documentElement.style.setProperty("--b",o),
//                           document.documentElement.style.setProperty("--second",.299*t+.587*n+.114*o>=192?"#000":"#FFF"),
//                           document.documentElement.style.setProperty("--cover-text",.299*t+.587*n+.114*o>=192?"#4C4948":"#EEE")
//                   }
//               }
//           );else{
//               let e="#1677B3",[t,n,o]=[parseInt("0x"+e.slice(1,3)),parseInt("0x"+e.slice(3,5)),parseInt("0x"+e.slice(5,7))];
//               document.documentElement.style.setProperty("--r",t),
//                   document.documentElement.style.setProperty("--g",n),
//                   document.documentElement.style.setProperty("--b",o),
//                   document.documentElement.style.setProperty("--second",.299*t+.587*n+.114*o>=192?"#000":"#FFF"),
//                   document.documentElement.style.setProperty("--cover-text",.299*t+.587*n+.114*o>=192?"#4C4948":"#EEE")
//           }
//   },
//   switchPageTitle:function(){
//       document.getElementById("page-title").style.display="/"===window.location.pathname||/^\/page\/[0-9]+\//.test(window.location.pathname)?"none":"flex",
//           document.querySelector("#page-title>span").innerHTML=GLOBAL_CONFIG_SITE.title
//   },
//   catalogActive:function(){
//       let e=document.getElementById("catalog-list");
//       if(e){
//           e.addEventListener("mousewheel",(
//               function(t){
//                   e.scrollLeft-=t.wheelDelta/2,
//                       t.preventDefault()
//               }
//           ),!1);
//           let t=document.getElementById(decodeURIComponent(window.location.pathname));
//           t?.classList.add("selected"),
//               e.scrollLeft=t.offsetLeft-e.offsetLeft-(e.offsetWidth-t.offsetWidth)/2
//       }
//       document.getElementById(decodeURIComponent(window.location.pathname.slice(1)))?.classList.add("selected")
//   },
//   switchCommentBarrage:function(){
//       let e=window.localStorage.getItem("commentBarrageDisplay");
//       document.getElementById("comment-barrage").style.zIndex="false"===e?"1":"-1001",
//           window.localStorage.setItem("commentBarrageDisplay","false"===e?"undefined":"false",864e5),
//           document.getElementById("menu-barrage")&&(document.querySelector("#menu-barrage>span").innerHTML="false"===e?"隐藏热评":"显示热评"),
//           document.getElementById("barrage-btn")&&("false"===e?document.getElementById("barrage-btn").classList.add("on"):document.getElementById("barrage-btn").classList.remove("on"))
//   },
//   switchRightSide:function(){
//       document.getElementById("rightside")?.classList.toggle("hidden"),
//           document.getElementById("rightside-mask")?.classList.toggle("hidden")
//   },
//   fullScreen:function(){
//       var e=document.documentElement;
//       e.requestFullscreen?e.requestFullscreen():
//           e.mozRequestFullScreen?e.mozRequestFullScreen():
//           e.webkitRequestFullScreen&&e.webkitRequestFullScreen()
//   },
//   exitFullScreen:function(){
//       document.exitFullscreen?document.exitFullscreen():
//           document.mozCancelFullScreen?document.mozCancelFullScreen():
//           document.webkitExitFullscreen&&document.webkitExitFullscreen()
//   }
// };





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