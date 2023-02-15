var global_music_flag = 0;
var meting_load = 1;
var listener = 0;
var old_music_id = null;
var now_music_id = null;
var newSongsheetLen = 0;
var t_load;
var JaySongsheet = [
    {
        "title":"Mojito",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL001.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWr5l.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL001.lrc"
    },{
        "title":"Try",
        "author":"派伟俊/周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL002.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWy1K.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL002.lrc"
    },{
        "title":"爱在西元前",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL003.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW7pP.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL003.lrc"
    },{
        "title":"本草纲目",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL004.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWm8S.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL004.lrc"
    },{
        "title":"不能说的秘密",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL005.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW4Bi.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL005.lrc"
    },{
        "title":"彩虹",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL006.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW1k6.md.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL006.lrc"
    },{
        "title":"稻香",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL007.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWNfb.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL007.lrc"
    },{
        "title":"东风破",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL008.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWPpC.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL008.lrc"
    },{
        "title":"发如雪",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL009.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWK0B.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL009.lrc"
    },{
        "title":"告白气球",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL010.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWhDD.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL010.lrc"
    },{
        "title":"公主病",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL011.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWgHa.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL011.lrc"
    },{
        "title":"花海",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL012.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWNfb.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL012.lrc"
    },{
        "title":"黄金甲",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL013.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWFnI.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL013.lrc"
    },{
        "title":"霍元甲",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL014.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWJxN.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL014.lrc"
    },{
        "title":"简单爱",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL015.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW7pP.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL015.lrc"
    },{
        "title":"菊花台",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL016.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWm8S.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL016.lrc"
    },{
        "title":"兰亭序",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL017.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWNfb.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL017.lrc"
    },{
        "title":"龙卷风",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL018.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWxw1.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL018.lrc"
    },{
        "title":"迷迭香",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL019.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWxw1.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL019.lrc"
    },{
        "title":"牛仔很忙",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL020.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW1k6.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL020.lrc"
    },{
        "title":"蒲公英的约定",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL021.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW1k6.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL021.lrc"
    },{
        "title":"千里之外",
        "author":"周杰伦/费玉清",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL022.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWm8S.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL022.lrc"
    },{
        "title":"千山万水",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL023.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWkSG.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL023.lrc"
    },{
        "title":"七里香",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL024.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWi8F.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL024.lrc"
    },{
        "title":"青花瓷",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL025.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW1k6.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL025.lrc"
    },{
        "title":"晴天",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL026.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWPpC.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL026.lrc"
    },{
        "title":"三年二班",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL027.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWPpC.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL027.lrc"
    },{
        "title":"珊瑚海",
        "author":"周杰伦/Lara梁心颐",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL028.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWK0B.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL028.lrc"
    },{
        "title":"双截棍",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL029.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW7pP.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL029.lrc"
    },{
        "title":"算什么男人",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL030.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWZws.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL030.lrc"
    },{
        "title":"甜甜的",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL031.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dW1k6.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL031.lrc"
    },{
        "title":"听爸爸的话",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL032.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWZws.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL032.lrc"
    },{
        "title":"听妈妈的话",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL033.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWm8S.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL033.lrc"
    },{
        "title":"烟花易冷",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL034.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWRfL.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL034.lrc"
    },{
        "title":"夜的第七章",
        "author":"周杰伦/潘儿",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL035.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWm8S.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL035.lrc"
    },{
        "title":"夜曲",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL036.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWK0B.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL036.lrc"
    },{
        "title":"一口气全念对",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL037.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWZws.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL037.lrc"
    },{
        "title":"一路向北",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL038.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWK0B.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL038.lrc"
    },{
        "title":"最伟大的作品",
        "author":"周杰伦",
        "url":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/audio/ZJL039.mp3",
        "pic":"https://i.imgtg.com/2023/02/15/dWAKg.webp",
        "lrc":"https://blogdrive.gavin-chen.top/api/raw/?path=/Music/lrc/ZJL039.lrc"
    }
];

var now = new Date();
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
}, 100);
