var global_music_flag = 0;
var meting_load = 1;
var listener = 0;
var old_music_id = null;
var now_music_id = null;
var newSongsheetLen = 0;
var t_load;
var now = new Date();
var year, month, week, date, dates, weekStr, monthStr;
var asideTime, asideDay, asideDayNum;
var animalYear, ganzhiYear, lunarMon, lunarDay;
const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

// cardTimes();
// asideNote();
// cardRefreshTimes();
// 刷新时钟时间
function cardRefreshTimes() {
    var cardWidgetSchedule = document.getElementById("card-widget-schedule");
    if (cardWidgetSchedule) {
        asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24;
        cardWidgetSchedule.querySelector("#pBar_year").value = asideDay;
        cardWidgetSchedule.querySelector("#p_span_year").innerHTML = (asideDay / 365 * 100).toFixed(2) + "%";
        cardWidgetSchedule.querySelector(".schedule-r0 .schedule-d1 .aside-span2").innerHTML = "还剩 " + (365 - asideDay).toFixed(0) + " 天";
        cardWidgetSchedule.querySelector("#pBar_month").value = date;
        cardWidgetSchedule.querySelector("#pBar_month").max = dates;
        cardWidgetSchedule.querySelector("#p_span_month").innerHTML = (date / dates * 100).toFixed(2) + "%";
        cardWidgetSchedule.querySelector(".schedule-r1 .schedule-d1 .aside-span2").innerHTML = "还剩 " + (dates - date) + " 天";
        cardWidgetSchedule.querySelector("#pBar_week").value = week == 0 ? 7 : week;
        cardWidgetSchedule.querySelector("#p_span_week").innerHTML = ((week == 0 ? 7 : week) / 7 * 100).toFixed(2) + "%";
        cardWidgetSchedule.querySelector(".schedule-r2 .schedule-d1 .aside-span2").innerHTML = "还剩 " + (7 - (week == 0 ? 7 : week)) + " 天";
    }
}

// 刷新页脚时间
function createtime() {
    now.setTime(now.getTime() + 1000); // 当前时间
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
    // var a_t_r = document.getElementById("aside-time-right");
    // if (a_t_r) a_t_r.innerHTML = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0') + ":" + now.getSeconds().toString().padStart(2, '0');
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
    // cardRefreshTimes();
    createtime();
}, 1000);

// 设置重复执行函数，周期500ms
setInterval(() => {
    if (document.querySelector("meting-js.global-music").aplayer != null) meting_load = 0;
    if (meting_load == 0 && listener == 0) {
        // 监测aplayer加载完开始注入音乐列表
        ctrl.importMusicList();
        // 音乐开始与暂停监听
        var ap = document.querySelector("meting-js.global-music").aplayer;
        ap.on('play', function () {
            ctrl.getMusicInfo();
            document.querySelector("#music-Switch i").classList.remove("fa-play");// 更新播放/暂停键
            document.querySelector("#music-Switch i").classList.add("fa-pause");
            document.querySelector("#music-ctrl-btn-center i").classList.remove("fa-play");
            document.querySelector("#music-ctrl-btn-center i").classList.add("fa-pause");
            old_music_id = now_music_id;// 更新列表标志
            now_music_id = ap.list.index;
            var ids = document.querySelectorAll("#console-music-list .list-music-id");
            var states = document.querySelectorAll("#console-music-list .list-music-state");
            for (var i = 0; i < ids.length; i++) {
                if (parseInt(ids[i].innerHTML) == now_music_id + 1) {
                    if (old_music_id != null) {
                        ids[old_music_id].classList.remove("hide");
                        states[old_music_id].classList.remove("show");
                        ids[old_music_id].parentElement.parentElement.classList.remove("current-play");
                    }
                    ids[now_music_id].classList.add("hide");
                    states[now_music_id].classList.add("show");
                    ids[now_music_id].parentElement.parentElement.classList.add("current-play");
                    ids[now_music_id].parentElement.parentElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        ap.on('pause', function () {
            document.querySelector("#music-Switch i").classList.remove("fa-pause");
            document.querySelector("#music-Switch i").classList.add("fa-play");
            document.querySelector("#music-ctrl-btn-center i").classList.remove("fa-pause");
            document.querySelector("#music-ctrl-btn-center i").classList.add("fa-play");
        });
        // 播放模式按钮监听（循环 / 随机）
        var play_mode = document.getElementById("music-ctrl-btn-first");
        var mode_flag;
        var mode_id;
        var ap_order_mode = document.querySelector(".aplayer-icon.aplayer-icon-order");
        var ap_loop_mode = document.querySelector(".aplayer-icon.aplayer-icon-loop");
        var order_str = '<path d="M0.622 18.334h19.54v7.55l11.052-9.412-11.052-9.413v7.549h-19.54v3.725z"></path>';
        var random_str = '<path d="M22.667 4l7 6-7 6 7 6-7 6v-4h-3.653l-3.76-3.76 2.827-2.827 2.587 2.587h2v-8h-2l-12 12h-6v-4h4.347l12-12h3.653v-4zM2.667 8h6l3.76 3.76-2.827 2.827-2.587-2.587h-4.347v-4z"></path>';
        var dis_loop_str = '<path d="M2.667 7.027l1.707-1.693 22.293 22.293-1.693 1.707-4-4h-11.64v4l-5.333-5.333 5.333-5.333v4h8.973l-8.973-8.973v0.973h-2.667v-3.64l-4-4zM22.667 17.333h2.667v5.573l-2.667-2.667v-2.907zM22.667 6.667v-4l5.333 5.333-5.333 5.333v-4h-10.907l-2.667-2.667h13.573z"></path>';
        var loop_str = '<path d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333z"></path>';
        var repeat_str = '<path d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333zM17.333 20v-8h-1.333l-2.667 1.333v1.333h2v5.333h2z"></path>';
        play_mode.addEventListener("click", function (e) {
            var ap_order_mode_str = document.querySelector(".aplayer-icon.aplayer-icon-order svg path").outerHTML;
            var ap_loop_mode_str = document.querySelector(".aplayer-icon.aplayer-icon-loop svg path").outerHTML;
            var ap_order_flag = ap_order_mode_str == order_str ? 0 : 1; // ap_order_flag: 0-顺序 1乱序
            var ap_loop_flag;
            switch (ap_loop_mode_str) { // ap_loop_flag: 0-不循环 1-循环 2-单曲循环
                case dis_loop_str: ap_loop_flag = 0; break;
                case loop_str: ap_loop_flag = 1; break;
                case repeat_str: ap_loop_flag = 2; break;
                default: ap_loop_flag = 0;
            }
            if (ap_order_flag == 0) { // mode_flag: 0-顺序 1-随机 2-单曲循环
                switch (ap_loop_flag) {
                    case 0: mode_flag = 0; mode_id = 0; break; // mode_id: 0、3、5无效，1、2、4有效
                    case 1: mode_flag = 0; mode_id = 1; break;
                    case 2: mode_flag = 2; mode_id = 2; break;
                    default: mode_flag = 0; mode_id = 1;
                }
            } else {
                switch (ap_loop_flag) {
                    case 0: mode_flag = 1; mode_id = 3; break;
                    case 1: mode_flag = 1; mode_id = 4; break;
                    case 2: mode_flag = 2; mode_id = 5; break;
                    default: mode_flag = 0; mode_id = 1;
                }
            }
            switch (mode_flag) {
                case 0: // 顺序 -> 随机
                    play_mode.querySelector("i").classList.remove("icon-loop-play");
                    play_mode.querySelector("i").classList.add("icon-random-play");
                    if (mode_id == 0) { // mode_id: 0、3、5无效，1、2、4有效
                        ap_order_mode.click(); ap_loop_mode.click(); // 0,0 -> 1,1
                    } else ap_order_mode.click(); // 0,1 -> 1,1
                    if (set_notice.checked) tools.showMessage("已切换至随机播放", "success", 2);
                    break;
                case 1: // 随机 -> 单曲循环
                    play_mode.querySelector("i").classList.remove("icon-random-play");
                    play_mode.querySelector("i").classList.add("icon-repeat-play");
                    if (mode_id == 3) { // mode_id: 0、3、5无效，1、2、4有效
                        ap_order_mode.click(); ap_loop_mode.click(); ap_loop_mode.click(); // 1,0 -> 0,2
                    } else {
                        ap_order_mode.click(); ap_loop_mode.click(); // 1,1 -> 0,2
                    }
                    if (set_notice.checked) tools.showMessage("已切换至单曲循环", "success", 2);
                    break;
                case 2: // 单曲循环 -> 顺序
                    play_mode.querySelector("i").classList.remove("icon-repeat-play");
                    play_mode.querySelector("i").classList.add("icon-loop-play");
                    if (mode_id == 5) { // mode_id: 0、3、5无效，1、2、4有效
                        ap_order_mode.click(); ap_loop_mode.click(); ap_loop_mode.click(); // 1,2 -> 0,1
                    } else {
                        ap_loop_mode.click(); ap_loop_mode.click(); // 0,2 -> 0,1
                    }
                    if (set_notice.checked) tools.showMessage("已切换至顺序播放", "success", 2);
                    break;
                default: alert("程序错误，请刷新！");
            }
        });
        // ap_order_mode.addEventListener("click", function (e) {
        //     var ap_order_mode_str = ap_order_mode.querySelector("svg path").outerHTML;
        //     if (ap_order_mode_str == order_str) {
        //         play_mode.querySelector("i").classList.remove("icon-random-play");
        //         play_mode.querySelector("i").classList.add("icon-loop-play");
        //         console.log("进入顺序播放模式");
        //     } else if (ap_order_mode_str == random_str) {
        //         play_mode.querySelector("i").classList.remove("icon-loop-play");
        //         play_mode.querySelector("i").classList.add("icon-random-play");
        //         console.log("进入随机播放模式");
        //     } else alert("程序错误，请刷新！");
        // });
        // 歌单切换监听
        ap.on("listclear", function () {
            document.getElementById("console-music-list").innerHTML = "";
        });
        ap.on("listadd", function () {
            var current_len = ap.list.audios.length;
            t_load = setInterval(() => {
                current_len = ap.list.audios.length;
                if (current_len < newSongsheetLen) {
                    // console.log("current_len: " + current_len);
                } else {
                    // console.log("开始导入")
                    ctrl.importMusicList();
                    global_music_flag = 1;
                    // console.log("导入完毕")
                    newSongsheetLen = 0;
                    clearInterval(t_load);
                    document.getElementById("console-loading-icon").classList.remove("show");
                    if (set_notice.checked) tools.showMessage("歌单导入成功！", "success", 1);
                    ctrl.consoleBackBtn();
                }
            }, 50);
        });
        listener = 1;
    };
    //音乐进度更新
    if (meting_load == 0 && global_music_flag == 0 && document.querySelector("#music-Switch i.fa-pause") != null) ctrl.refreshProgress();
}, 500);