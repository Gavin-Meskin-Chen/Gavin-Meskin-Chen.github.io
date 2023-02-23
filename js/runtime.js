var global_music_flag = 0;
var meting_load = 1;
var listener = 0;
var old_music_id = null;
var now_music_id = null;
var newSongsheetLen = 0;
var t_load;


var now = new Date();
function createtime() {
    now.setTime(now.getTime() + 1000); // 当前时间
    var grt = new Date("2023/01/04 20:53:58");	// 网站诞生时间
    var asideTime = new Date("2023/01/01 00:00:00");	// 侧边栏倒计时
    var days = (now - grt) / 1e3 / 60 / 60 / 24,
        dnum = Math.floor(days),
        hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
        hnum = Math.floor(hours);
    var asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24,
        asideDayNum = Math.floor(asideDay),
        asideHour = (now - asideTime) / 1e3 / 60 / 60 - 24 * asideDayNum,
        asideHourNum = Math.floor(asideHour);
    document.getElementById("pBar_year").value = asideDayNum;
    document.getElementById("p_span_year").innerHTML = "2023已走过: " + (asideDay/365*100).toFixed(5) + "%";

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

// 设置重复执行函数，周期100ms
setInterval(() => {
    if (document.querySelector("meting-js").aplayer != undefined) meting_load = 0;
    if (meting_load == 0 && listener == 0) {
        // 监测aplayer加载完开始注入音乐列表
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
        ap.on("listclear", function(){
            document.getElementById("console-music-list").innerHTML = "";
        });
        ap.on("listadd", function(){
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
}, 1000);
