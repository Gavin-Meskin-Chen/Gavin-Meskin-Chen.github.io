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