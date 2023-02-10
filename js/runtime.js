// var now = new Date();
// function createtime() {
//   // 当前时间
//   now.setTime(now.getTime() + 1000);
//   var start = new Date("08/01/2022 00:00:00"); // 旅行者1号开始计算的时间
//   var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17); // 距离=秒数*速度 记住转换毫秒
//   var unit = (dis / 149600000).toFixed(6);  // 天文单位
//   var grt = new Date("2023/01/04 20:53:58");	// 网站诞生时间
//   var days = (now - grt) / 1e3 / 60 / 60 / 24,
//     dnum = Math.floor(days),
//     hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
//     hnum = Math.floor(hours);
//   1 == String(hnum).length && (hnum = "0" + hnum);
//   var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
//     mnum = Math.floor(minutes);
//   1 == String(mnum).length && (mnum = "0" + mnum);
//   var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
//     snum = Math.round(seconds);
//   1 == String(snum).length && (snum = "0" + snum);
//   let currentTimeHtml = "";
//   (currentTimeHtml =
//     hnum < 18 && hnum >= 9
//     ? `<div style="font-size:13px;font-weight:bold">参星阁历 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
//     : `<div style="font-size:13px;font-weight:bold">参星阁历 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
//     document.getElementById("workboard") &&
//     (document.getElementById("workboard").innerHTML = currentTimeHtml);
// }
// // 设置重复执行函数，周期1000ms
// setInterval(() => {
//   createtime();
// }, 1000);

var global_music_flag = 0;
var meting_load = 1;
var listener = 0;
var old_music_id = null;
var now_music_id = null;


var now = new Date();
function createtime() {
  // 当前时间
  now.setTime(now.getTime() + 1000);
  var grt = new Date("2023/01/04 20:53:58");	// 网站诞生时间
  var days = (now - grt) / 1e3 / 60 / 60 / 24,
    dnum = Math.floor(days),
    hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
    hnum = Math.floor(hours);
  1 == String(hnum).length && (hnum = "0" + hnum);
  var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
    mnum = Math.floor(minutes);
  1 == String(mnum).length && (mnum = "0" + mnum);
  var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
    snum = Math.round(seconds);
  1 == String(snum).length && (snum = "0" + snum);
  let currentTimeHtml = "";
  (currentTimeHtml =
    hnum < 18 && hnum >= 9
    ? `<div>参星阁历 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒</div>`
    : `<div>参星阁历 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒</div>`),
    document.getElementById("count-time") &&
    (document.getElementById("count-time").innerHTML = currentTimeHtml);
}
// 设置重复执行函数，周期1000ms
setInterval(() => {
  createtime();
}, 1000);

setInterval(() => {
  // 监测aplayer加载完开始注入音乐列表
  if (document.querySelector("meting-js").aplayer != undefined) meting_load = 0;
  if (meting_load == 0 && listener == 0) {
    importMusicList();
    // 添加音乐开始与暂停监听器
    var ap = document.querySelector("meting-js").aplayer;
    ap.on('play',function(){
      // 更新播放/暂停键
      document.querySelector("#music-Switch i").classList.remove("fa-play");
      document.querySelector("#music-Switch i").classList.add("fa-pause");
      document.querySelector("#console #music-ctrl-btn-center i").classList.remove("fa-play");
      document.querySelector("#console #music-ctrl-btn-center i").classList.add("fa-pause");
      // 更新列表标志  
      old_music_id = now_music_id;
      now_music_id = ap.list.index;
      var ids = document.querySelectorAll("#console-music-list .list-music-id");
      var states = document.querySelectorAll("#console-music-list .list-music-state");
      for (var i = 0; i < ids.length; i++) {
        if(parseInt(ids[i].innerHTML) == now_music_id + 1){
          if (old_music_id != null) {
            ids[old_music_id].classList.remove("hide");
            states[old_music_id].classList.remove("show");
            ids[old_music_id].parentElement.parentElement.style.backgroundColor = "";
          }
          ids[now_music_id].classList.add("hide");
          states[now_music_id].classList.add("show");
          ids[now_music_id].parentElement.parentElement.style.backgroundColor = "var(--vercel-hover-bg)";
        }
      }
      console.log("曲目开始"+ap.list.index);
    });
    ap.on('pause',function(){
      document.querySelector("#music-Switch i").classList.remove("fa-pause");
      document.querySelector("#music-Switch i").classList.add("fa-play");
      document.querySelector("#console #music-ctrl-btn-center i").classList.remove("fa-pause");
      document.querySelector("#console #music-ctrl-btn-center i").classList.add("fa-play");
    });


    // 循环播放模式
    var play_mode = document.getElementById("music-ctrl-btn-first");
    var ap_play_mode = document.querySelector(".aplayer-icon.aplayer-icon-order");
    var loop_str = '<path d="M0.622 18.334h19.54v7.55l11.052-9.412-11.052-9.413v7.549h-19.54v3.725z"></path>';
    var random_str = '<path d="M22.667 4l7 6-7 6 7 6-7 6v-4h-3.653l-3.76-3.76 2.827-2.827 2.587 2.587h2v-8h-2l-12 12h-6v-4h4.347l12-12h3.653v-4zM2.667 8h6l3.76 3.76-2.827 2.827-2.587-2.587h-4.347v-4z"></path>';
    play_mode.addEventListener("click", function(e){
      var ap_play_mode_str = document.querySelector(".aplayer-icon.aplayer-icon-order svg path").outerHTML;
      if (ap_play_mode_str == loop_str) {
        play_mode.querySelector("i").classList.remove("fa-repeat");
        play_mode.querySelector("i").classList.add("fa-shuffle");
        ap_play_mode.click();
      } else if (ap_play_mode_str == random_str) {
        play_mode.querySelector("i").classList.remove("fa-shuffle");
        play_mode.querySelector("i").classList.add("fa-repeat");
        ap_play_mode.click();
      } else alert("程序错误，请刷新！");
    });
    ap_play_mode.addEventListener("click", function(e){
      var ap_play_mode_str = ap_play_mode.querySelector("svg path").outerHTML;
      if (ap_play_mode_str == loop_str) {
        play_mode.querySelector("i").classList.remove("fa-shuffle");
        play_mode.querySelector("i").classList.add("fa-repeat");
        console.log("进入顺序播放模式");
      } else if (ap_play_mode_str == random_str) {
        play_mode.querySelector("i").classList.remove("fa-repeat");
        play_mode.querySelector("i").classList.add("fa-shuffle");
        console.log("进入随机播放模式");
      } else alert("程序错误，请刷新！");
    });




    listener = 1;
  }
  if (meting_load == 0 && global_music_flag == 0) ctrl.getMusicInfo(); //音乐进度更新
}, 500);



// function whenDOMReady(){
//   marcus.randomLink()
// }
// var marcus={
//   saveData:(e,t)=>{
//     localStorage.setItem(e,JSON.stringify({time:Date.now(),data:t}))
//   },
//   loadData:(e,t)=>{
//     let n=JSON.parse(localStorage.getItem(e));
//     if(n){
//       let e=Date.now()-n.time;
//       if(-1<e&&e<6e4*t)
//         return n.data
//     }
//     return 0
//   },
//   runtime:()=>{
//     var e=function(e){
//       return e>9?e:"0"+e
//     };
//     let t=new Date("2022/08/09 00:00:00").getTime(), n=(new Date).getTime(), a=Math.round((n-t)/1e3), r="本站已运行：";
//     a>=86400&&(r+=e(parseInt(a/86400))+" 天 ",a%=86400),
//     a>=3600&&(r+=e(parseInt(a/3600))+" 时 ",a%=3600),
//     a>=60&&(r+=e(parseInt(a/60))+" 分 ",a%=60),
//     a>=0&&(r+=e(a)+" 秒");
//     let i=document.getElementById("runtime");
//     i&&(i.innerHTML=r),
//     setTimeout(marcus.runtime,1e3)
//   },
//   randomLink:()=>{
//     let e=marcus.loadData("links",30);
//     if(e){
//       let t=document.querySelectorAll("#friend-links-in-footer .footer-item");
//       if(!t.length)
//         return;
//       for(let n=0;n<5;n++){
//         let a=parseInt(Math.random()*e.length);
//         t[n].innerText=e[a].name, t[n].href=e[a].link,e.splice(a,1)
//       }
//     } else fetch("/link.json").then(e=>e.json()).then(e=>{
//       marcus.saveData("links", e.link_list),
//       marcus.randomLink()
//     })
//   }
// };
// marcus.runtime();