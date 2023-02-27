var global_music_flag = 0;
var meting_load = 1;
var listener = 0;
var old_music_id = null;
var now_music_id = null;
var newSongsheetLen = 0;
var t_load;
var now = new Date();


// 刷新时间
function cardRefreshTimes() {
    // 侧边栏日历卡片
    var year, month, week, date, dates;
    year = now.getFullYear();
    date = now.getDate();
    var year_flag = year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? true : false;
    switch (now.getDay()) {
        case 0: week = "周日"; break;
        case 1: week = "周一"; break;
        case 2: week = "周二"; break;
        case 3: week = "周三"; break;
        case 4: week = "周四"; break;
        case 5: week = "周五"; break;
        case 6: week = "周六"; break;
        default: console.log("异常情况");
    }
    switch (now.getMonth()) {
        case 0: month = "一月"; dates = 31; break;
        case 1: month = "二月"; dates = year_flag ? 29 : 28; break;
        case 2: month = "三月"; dates = 31; break;
        case 3: month = "四月"; dates = 30; break;
        case 4: month = "五月"; dates = 31; break;
        case 5: month = "六月"; dates = 30; break;
        case 6: month = "七月"; dates = 31; break;
        case 7: month = "八月"; dates = 31; break;
        case 8: month = "九月"; dates = 30; break;
        case 9: month = "十月"; dates = 31; break;
        case 10: month = "十一月"; dates = 30; break;
        case 11: month = "十二月"; dates = 31; break;
        default: console.log("异常情况");
    }
    var c_m = document.getElementById("calendar-month");
    var c_w = document.getElementById("calendar-week");
    var c_d = document.getElementById("calendar-date");
    if(c_m)c_m.innerHTML = month; //月份
    if(c_w)c_w.innerHTML = week; //星期
    if(c_d)c_d.innerHTML = date; //日期
    var week_first = (now.getDay() + 8 - date % 7) % 7;
    var count_days = "";
    var count_flag = false;
    var ds;
    for (let r = 0; r < 5; r++) {
        for (let d = 0; d < 7; d++) {
            ds = document.querySelector(".calendar-r" + r + " .calendar-d" + d + " a"); //日历
            if(ds){
                if (r == 0 && d == week_first) {
                    count_days = 1;
                    count_flag = true;
                }
                ds.innerHTML = count_days;
                if (count_days == date) {
                    var dd = document.querySelector("a.now");
                    if(dd)dd.classList.remove("now");
                    ds.classList.add("now");
                };
                if (count_days > dates) {
                    count_days = "";
                    count_flag = false;
                }
                if (count_flag) count_days += 1;
            }
        }
    }
    var lunar = chineseLunar.solarToLunar(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    var animalYear = chineseLunar.format(lunar, "A"), //生肖属相
        ganzhiYear = chineseLunar.format(lunar, "T").slice(0,-1), //天干地支
        lunarMon = chineseLunar.format(lunar, "M"), //月份
        lunarDay = chineseLunar.format(lunar, "d"); //日期
    var asideTime = new Date("2023/01/01 00:00:00");	// 侧边栏倒计时
    var asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24,
        asideDayNum = Math.floor(asideDay);
    var asideWeekNum = ((now.getDay() - asideDayNum % 7) >= 0) ? (Math.ceil(asideDayNum / 7)) : (Math.ceil(asideDayNum / 7) + 1);
    var c_a = document.getElementById("calendar-animal");
    var c_l = document.getElementById("calendar-lunar");
    var a_t_l = document.getElementById("aside-time-left");
    var p_y = document.getElementById("pBar_year");
    var p_s_y = document.getElementById("p_span_year");
    var a_t_r = document.getElementById("aside-time-right");
    if(c_a)c_a.innerHTML = ganzhiYear + animalYear + "年";
    if(c_l)c_l.innerHTML = lunarMon + lunarDay;
    if(a_t_l)a_t_l.innerHTML = year + "年 第" + asideWeekNum + "周";
    if(p_y)p_y.value = asideDay;
    if(p_s_y)p_s_y.innerHTML = "2023已走过: " + (asideDay / 365 * 100).toFixed(5) + "%";
    if(a_t_r)a_t_r.innerHTML = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0') + ":" + now.getSeconds().toString().padStart(2, '0');
}

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
    cardRefreshTimes();
    createtime();
}, 1000);

// 设置重复执行函数，周期500ms
setInterval(() => {
    if (document.querySelector("meting-js").aplayer != undefined) meting_load = 0;
    if (meting_load == 0 && listener == 0) {
        // 监测aplayer加载完开始注入音乐列表
        console.log("\n %cGC音频控制器 v1.3.2 参星阁出品%c https://gavin-chen.top \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
        ctrl.importMusicList();
        // 音乐开始与暂停监听
        var ap = document.querySelector("meting-js").aplayer;
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
                        ids[old_music_id].parentElement.parentElement.style.backgroundColor = "";
                    }
                    ids[now_music_id].classList.add("hide");
                    states[now_music_id].classList.add("show");
                    ids[now_music_id].parentElement.parentElement.style.backgroundColor = "var(--vercel-hover-bg)";
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
        var ap_play_mode = document.querySelector(".aplayer-icon.aplayer-icon-order");
        var loop_str = '<path d="M0.622 18.334h19.54v7.55l11.052-9.412-11.052-9.413v7.549h-19.54v3.725z"></path>';
        var random_str = '<path d="M22.667 4l7 6-7 6 7 6-7 6v-4h-3.653l-3.76-3.76 2.827-2.827 2.587 2.587h2v-8h-2l-12 12h-6v-4h4.347l12-12h3.653v-4zM2.667 8h6l3.76 3.76-2.827 2.827-2.587-2.587h-4.347v-4z"></path>';
        play_mode.addEventListener("click", function (e) {
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
        ap_play_mode.addEventListener("click", function (e) {
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
        // 歌单切换监听
        ap.on("listclear", function () {
            document.getElementById("console-music-list").innerHTML = "";
        });
        ap.on("listadd", function () {
            var current_len = ap.list.audios.length;
            t_load = setInterval(() => {
                current_len = ap.list.audios.length;
                if (current_len < newSongsheetLen) {
                    console.log("current_len: " + current_len);
                } else {
                    console.log("开始导入")
                    ctrl.importMusicList();
                    global_music_flag = 1;
                    console.log("导入完毕")
                    clearInterval(t_load);
                    document.getElementById("console-loading-icon").classList.remove("show");
                    ctrl.consoleBackBtn();
                }
            }, 50);
        });
        listener = 1;
    };
    //音乐进度更新
    if (meting_load == 0 && global_music_flag == 0) ctrl.refreshProgress();
}, 500);
